# Ingest Folder

This folder is a staging area for new documents that need to be reviewed and incorporated into the wiki.

**Status**: ✅ All previous content has been processed and integrated into the wiki. This folder is ready for new documents.

## Purpose

Place new documentation files here when:
- You receive new documentation that needs to be added to the wiki
- You want to review content before adding it to the main wiki structure
- You're preparing content for organization and formatting

## Process

1. **Add documents** - Place new `.md`, `.txt`, or other documentation files here
2. **Review** - Examine the content to determine:
   - Which section it belongs in (overview, workflows, standards, tools)
   - What formatting improvements are needed
   - Whether it should be split into multiple documents
   - What cross-references should be added
3. **Organize** - Move processed documents to the appropriate location:
   - `overview/` - Role descriptions, project overviews, glossary
   - `workflows/` - Step-by-step procedures
   - `standards/` - Conventions and standards
   - `tools/` - Tool and system documentation
4. **Clean up** - Remove processed documents from this folder

## Subfolders

### `transcripts/`
Training video transcripts that require **special attention and scrutiny** during ingest. See [`transcripts/README.md`](transcripts/README.md) for detailed processing guidelines.

## Integration Record

- **`INTEGRATION_COMPLETE.md`**: Historical record of all integrations completed from this folder. Documents what was integrated, where it went, and includes statistics.

## Notes

- This folder (and all subfolders) are excluded from Jekyll processing (won't appear on the live site)
- Documents here are tracked in git for version control
- Keep this folder organized - use subfolders for different document types
- After processing documents, remove them from this folder to keep it clean

