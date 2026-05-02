# Viral DNA Extractor — 3-Level Dissection

## Input
A transcript from a viral YouTube video (provided in `outputs/<run_id>/transcript.txt`).

## Process

Analyze the transcript in THREE levels of depth:

### Level 1 — CONTENT (What)
- Topic and subject matter
- Key facts, claims, narrative events
- Format (documentary, essay, story, explainer)
- Length and pacing

### Level 2 — STRUCTURE (How)
Identify the storytelling mechanics:
- **Hook**: How do the first 30 seconds grab attention? What pattern? (question, shocking stat, "you" placement, scene-setting)
- **Arc**: What is the narrative shape? (chronological, problem→revelation, mystery→answer, escalating tension)
- **Retention loops**: What phrases/techniques keep viewers watching? ("but that's not the worst part", "what happened next changed everything")
- **Chapter beats**: How is the content segmented? What's the rhythm of section transitions?
- **Pacing**: How many words per section? Where does it speed up/slow down?
- **Payoff**: Where is the emotional climax? How far into the video?
- **CTA pattern**: How does it end? (call to action, cliffhanger, reflection)

### Level 3 — PSYCHOLOGY (Why)
Identify EVERY psychological trigger that makes this video compelling:
- **Cognitive curiosity gap** — "I need to know the answer"
- **Scale awe** — making the viewer feel small/amazed
- **Loss framing** — "this is gone forever" urgency
- **Identity connection** — "this is about YOU/your ancestors/your world"
- **Status knowledge** — "most people don't know this" exclusivity
- **Temporal fascination** — deep time, historical wonder
- **Sensory immersion** — vivid descriptions that make you FEEL it
- **Fear/danger** — survival instinct activation
- **Justice/injustice** — moral outrage or satisfaction
- **Surprise/revelation** — "everything you thought was wrong"

For each trigger found, note WHERE in the transcript it appears and HOW it's deployed.

## Output

### Step 1: Save Analysis
Save the full 3-level analysis to `outputs/<run_id>/viral_dna.json`:

```json
{
  "source_url": "...",
  "level_1_content": {
    "topic": "...",
    "format": "...",
    "key_facts": ["..."]
  },
  "level_2_structure": {
    "hook_pattern": "...",
    "hook_template": "...",
    "arc_type": "...",
    "retention_phrases": ["..."],
    "chapter_beats": ["..."],
    "pacing_words_per_section": [...],
    "payoff_location_percent": 85,
    "cta_pattern": "..."
  },
  "level_3_psychology": {
    "triggers": [
      {"name": "curiosity_gap", "strength": "high", "deployment": "..."},
      {"name": "scale_awe", "strength": "medium", "deployment": "..."}
    ]
  }
}
```

### Step 2: Generate 5 New Topics
Using Level 3 triggers as the REQUIREMENT CHECKLIST, generate 5 completely different topics that activate the SAME psychological triggers.

For each suggestion, show:
- Title (viral-optimized, under 70 chars)
- One-line description
- Which Level 3 triggers it activates (score each ✓/✗)
- Why this topic would invoke the same viewer response

Present to the user and wait for them to pick one (or ask for more).

### Step 3: After User Picks
Save the chosen topic and begin Stage 2 (Script Writing) using:
- Level 2 structure as the BLUEPRINT (same hook pattern, same arc, same pacing)
- Level 3 psychology as the GUIDE (hit same emotional beats)
