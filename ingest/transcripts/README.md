# Training Video Transcripts

This folder contains transcripts from training videos that need to be reviewed and incorporated into the wiki.

**Status**: ✅ All previous transcripts have been processed and integrated into the wiki. This folder is ready for new transcripts.

## Special Handling Required

Training video transcripts require **special attention and scrutiny** during the ingest process because they:

- May contain conversational language that needs to be formalized
- Often include step-by-step instructions that should be converted to structured workflows
- May reference specific UI elements or versions that need verification
- Could contain outdated information that needs updating
- May have redundant or off-topic content that should be removed
- Often need to be split into multiple focused documents

## Ingest Process for Transcripts

### 1. Initial Review
- [ ] Read through the entire transcript
- [ ] Identify the main topics covered
- [ ] Note any version-specific or time-sensitive information
- [ ] Identify any references to tools, systems, or processes

### 2. Content Analysis
- [ ] Determine which wiki section(s) the content belongs to:
  - `overview/` - General concepts, role descriptions
  - `workflows/` - Step-by-step procedures
  - `standards/` - Conventions and best practices
  - `tools/` - Tool-specific instructions
- [ ] Identify if content should be split into multiple documents
- [ ] Note any cross-references that should be added

### 3. Content Transformation
- [ ] Convert conversational language to professional documentation
- [ ] Structure content with clear headings and sections
- [ ] Convert verbal instructions to numbered steps or bullet points
- [ ] Remove filler words, "um", "uh", false starts
- [ ] Add context that may have been visual in the video
- [ ] Verify and update any version numbers or dates mentioned
- [ ] Add screenshots or diagrams if referenced but missing

### 4. Quality Checks
- [ ] Verify technical accuracy
- [ ] Check for consistency with existing wiki content
- [ ] Ensure proper formatting (markdown, code blocks, etc.)
- [ ] Add cross-references to related documents
- [ ] Include front matter (Jekyll metadata) if creating new pages
- [ ] Add to glossary if new terms are introduced

### 5. Integration
- [ ] Move processed content to appropriate wiki section
- [ ] Update related documents if new information affects them
- [ ] Add links from index or related pages
- [ ] Archive or delete processed transcript

## Common Issues to Watch For

- **Outdated information**: Check if procedures or tools have changed
- **Version mismatches**: Verify software versions mentioned
- **Missing context**: Add explanations for visual elements from video
- **Incomplete instructions**: Fill in gaps where video may have shown something
- **Redundancy**: Remove duplicate information already in wiki
- **Informal language**: Convert to professional documentation style

## File Naming

Name transcript files descriptively:
- `YYYY-MM-DD_Topic_Description.md` (e.g., `2024-11-24_Epicor_BOM_Creation.md`)
- Include date if known
- Include topic or tool name
- Use descriptive names that indicate content

## Notes

- Transcripts are excluded from Jekyll processing (won't appear on live site)
- Keep original transcripts for reference until content is fully integrated
- Consider creating a separate "Training Materials" section if there are many training-related documents

