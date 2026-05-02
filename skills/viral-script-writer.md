# Viral Script Writer

## Input
Either:
- A topic/idea (Mode A: direct idea)
- A topic + viral DNA analysis (Mode B: from YouTube dissection)

Also receives:
- `duration_minutes` — target video length (5/10/15/20)

## Pacing
- **2.5 words per second**
- 5 min = 750 words
- 10 min = 1500 words
- 15 min = 2250 words
- 20 min = 3000 words

## Script Rules

1. **First-person narrator voice** — authoritative, intimate, like telling a story to one person
2. **No headings or section markers** — pure narration text, paragraph breaks only
3. **Hook in first 2 sentences** — a number, a question, or a scene that stops the scroll
4. **Retention loops every 60-90 seconds** — "But that's not what made this extraordinary." / "What happened next, no one expected."
5. **Vary sentence length** — short punchy sentences (5-8 words) after long descriptive ones (20-25 words)
6. **Concrete details** — names, dates, places, numbers. Never vague.
7. **Emotional escalation** — each section should raise the stakes
8. **Payoff at 80-85%** — the biggest revelation/climax happens near the end, not at the end
9. **Reflective close** — final 15% is reflection, meaning, and a thought that stays with the viewer

## If Mode B (Viral DNA available)
- Use the `hook_template` from Level 2 as the opening pattern
- Follow the `arc_type` structure
- Insert `retention_phrases` (adapted, not copied) at the same intervals
- Ensure EVERY Level 3 psychological trigger is deployed at least once
- Match the `pacing_words_per_section` distribution

## Output
Save narration text to `outputs/<run_id>/script.md`

The script must be:
- Pure narration (no stage directions, no [brackets], no headings)
- Exactly within ±10% of target word count
- Readable aloud in one continuous flow
