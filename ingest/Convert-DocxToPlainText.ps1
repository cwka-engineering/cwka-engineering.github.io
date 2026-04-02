<#
.SYNOPSIS
  Extracts plain text from .docx files (OOXML) without Microsoft Word.

.DESCRIPTION
  Reads word/document.xml inside each .docx (ZIP) and concatenates w:t runs.
  Paragraph breaks are inferred from w:p elements.

.PARAMETER Path
  Folder to scan for *.docx, or a single .docx file. Defaults to the script's directory.

.PARAMETER OutputDirectory
  If set, writes .txt files here (created if missing). Otherwise writes next to each .docx.
  When multiple .docx share the same file name in different folders, outputs to -OutputDirectory can overwrite each other unless you use unique names or separate runs.

.PARAMETER NoRecurse
  When Path is a directory, only that folder is scanned (no subfolders). By default, subfolders are included.

.EXAMPLE
  .\Convert-DocxToPlainText.ps1

.EXAMPLE
  .\Convert-DocxToPlainText.ps1 -Path . -OutputDirectory .\plaintext

.EXAMPLE
  .\Convert-DocxToPlainText.ps1 -Path .\transcripts -NoRecurse
#>
[CmdletBinding()]
param(
    [Parameter(Position = 0)]
    [string] $Path,

    [string] $OutputDirectory,

    [switch] $NoRecurse
)

Set-StrictMode -Version Latest

if ([string]::IsNullOrWhiteSpace($Path)) {
    $Path = if (-not [string]::IsNullOrWhiteSpace($PSScriptRoot)) {
        $PSScriptRoot
    } else {
        Split-Path -Parent $MyInvocation.MyCommand.Path
    }
}
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.IO.Compression.FileSystem

$wNs = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'

function Get-DocxPlainText {
    param([Parameter(Mandatory)][string] $DocxPath)

    $zip = [System.IO.Compression.ZipFile]::OpenRead($DocxPath)
    try {
        $entry = $zip.GetEntry('word/document.xml')
        if (-not $entry) {
            throw "Missing word/document.xml in: $DocxPath"
        }
        $sr = New-Object System.IO.StreamReader($entry.Open())
        try {
            [xml] $xml = $sr.ReadToEnd()
        } finally {
            $sr.Dispose()
        }
    } finally {
        $zip.Dispose()
    }

    $sb = New-Object System.Text.StringBuilder
    $paras = $xml.GetElementsByTagName('p', $wNs)
    foreach ($p in $paras) {
        $runs = $p.GetElementsByTagName('t', $wNs)
        if ($runs.Count -eq 0) { continue }
        $line = New-Object System.Text.StringBuilder
        foreach ($t in $runs) {
            if ($t.InnerText) {
                [void] $line.Append($t.InnerText)
            }
        }
        if ($line.Length -gt 0) {
            if ($sb.Length -gt 0) { [void] $sb.AppendLine() }
            [void] $sb.Append($line.ToString())
        }
    }
    return $sb.ToString()
}

$items = @()
if (Test-Path -LiteralPath $Path -PathType Leaf) {
    if ([System.IO.Path]::GetExtension($Path) -ne '.docx') {
        throw "File is not .docx: $Path"
    }
    $items = @(Get-Item -LiteralPath $Path)
} else {
    if (-not (Test-Path -LiteralPath $Path -PathType Container)) {
        throw "Path not found: $Path"
    }
    $gciParams = @{
        Path          = $Path
        Filter        = '*.docx'
        File          = $true
        ErrorAction   = 'SilentlyContinue'
    }
    if (-not $NoRecurse) {
        $gciParams['Recurse'] = $true
    }
    $items = @(Get-ChildItem @gciParams)
}

if ($items.Count -eq 0) {
    Write-Warning "No .docx files found under: $Path"
    exit 0
}

if ($OutputDirectory) {
    $null = New-Item -ItemType Directory -Force -Path $OutputDirectory
}

foreach ($f in $items) {
    $outPath = if ($OutputDirectory) {
        Join-Path $OutputDirectory (($f.BaseName) + '.txt')
    } else {
        Join-Path $f.DirectoryName (($f.BaseName) + '.txt')
    }

    Write-Host "Writing: $outPath"
    $text = Get-DocxPlainText -DocxPath $f.FullName
    [System.IO.File]::WriteAllText($outPath, $text, [System.Text.UTF8Encoding]::new($false))
}

Write-Host "Done ($($items.Count) file(s))."
