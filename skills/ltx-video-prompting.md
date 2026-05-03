# LTX 2.3 Video Prompting Reference

Use this reference when writing LTX 2.3 text-to-video prompts for the Video B-Roll mode. Every scene prompt MUST use precise camera language from this guide — never vague terms like "cinematic" or "epic."

## Prompt Structure

Every LTX prompt follows this template:

```
[Shot]: Medium close-up, slight low angle
[Camera]: Slow dolly-in
[Subject]: A weathered fisherman in his 60s, salt-and-pepper beard,
           dark wool sweater, calloused hands gripping a rope
[Action]: He pulls the rope hand-over-hand, muscles straining,
          then pauses and looks out to sea
[Setting]: Wooden dock at dawn, calm grey ocean, distant fog bank,
           seagulls wheeling overhead
[Lighting]: Soft overcast with warm break in clouds on the horizon,
            gentle rim light from the rising sun
[Style]: Documentary cinematography, 35mm film grain,
         muted earth tones with a cold blue-grey palette
[Audio]: Rope creaking, water lapping, distant gull cries, wind
```

Write it as a single flowing paragraph for LTX — the bracketed structure is for your planning only.

---

## Camera Shot Types

| Shot | When to Use |
|------|------------|
| Wide / establishing shot | Open a scene, show location context |
| Full / long shot | Subject head-to-toe with environment |
| Medium shot | Waist up, balances detail with context |
| Medium close-up | Chest up, conversational intimacy |
| Close-up | Face or key object, emphasize emotion |
| Extreme close-up | Isolated detail (eye, drop, texture) |
| Over-the-shoulder | Conversation framing, connection |
| Point-of-view (POV) | Viewer becomes the character |
| Bird's-eye / top-down | Map-like overview, omniscient feel |
| Worm's-eye view | Looking straight up, emphasize height |
| Dutch / canted angle | Tilted horizon, unease or tension |
| Low-angle | Subject appears powerful, dominant |
| High-angle | Subject appears small, vulnerable |

---

## Camera Movements

Models confuse translation, rotation, and lens-only changes. Use the CORRECT primitive:

### Translation (camera physically moves)
| Primitive | Example |
|-----------|---------|
| Dolly in/out | "dolly forward toward subject" |
| Truck left/right | "truck left along the corridor" |
| Pedestal up/down | "pedestal up to reveal the skyline" |

### Rotation (camera pivots in place)
| Primitive | Example |
|-----------|---------|
| Pan left/right | "pan right across the room" |
| Tilt up/down | "tilt up to reveal the tower" |
| Roll CW/CCW | "slow roll clockwise" |

### Lens-only (no camera move)
| Primitive | Example |
|-----------|---------|
| Zoom in/out | "zoom in on the face" |
| Rack focus | "rack focus from FG hand to BG face" |
| Pull focus | "gradual pull focus to background" |
| Focus tracking | "focus tracks the moving car" |

### Hybrid / signature
| Primitive | Example |
|-----------|---------|
| Dolly zoom (vertigo) | Only at moments of revelation |
| Arc/orbit | "orbit around the subject" |
| Crane | "crane up from ground level" |
| Whip pan | "whip pan to the explosion" |
| Tracking/follow | "tracking shot following the runner" |
| Handheld | "handheld, slight shake" |

### CRITICAL RULES
- **dolly ≠ zoom** — dolly is camera translation; zoom is focal-length change
- **pan ≠ truck** — pan rotates, truck translates laterally
- **Static shot is STRICT** — zero movement, zero focus change, zero zoom. If any occur, pick the right movement primitive instead

---

## Camera Height (relative to ground)

| Primitive | Example |
|-----------|---------|
| Aerial-level | "drone-altitude wide of the city" |
| Overhead-level | "rooftop height looking across the street" |
| Eye-level | "framed at eye level" |
| Hip-level | "hip-height tracking shot" |
| Ground-level | "low to the ground, ankle height" |
| Water-level | "skimming the water surface" |
| Underwater | "submerged below the surface" |

---

## Camera Angle (relative to subject)

| Primitive | Definition |
|-----------|-----------|
| Bird's-eye | Strict top-down. NOT the same as aerial |
| High angle | Looking down on subject |
| Level angle | Camera and subject at same height |
| Low angle | Looking up at subject |
| Worm's-eye | Looking straight up |
| Dutch angle (fixed) | Tilted horizon held steady |
| Dutch angle (rolling) | Horizon tilt changes during shot |

**bird's-eye = strict top-down. aerial = altitude.** A drone shot at 45° looking down is a high angle from aerial height, NOT bird's-eye.

---

## Lighting Vocabulary

| Term | Effect |
|------|--------|
| Natural light | Soft, realistic (morning sun, overcast, moonlight) |
| Golden hour | Warm sunlight, long shadows, romantic |
| High-key | Bright, even, cheerful — comedy, lifestyle |
| Low-key | Dark, high contrast — thriller, drama |
| Rembrandt | Triangle of light on cheek, classic portrait |
| Film noir | Deep shadows, stark highlights |
| Volumetric | Visible light rays through atmosphere (fog, dust) |
| Backlighting | Light behind subject, silhouette effect |
| Side lighting | Strong directional, dramatic shadows |
| Practical lights | In-frame sources (lamps, candles, neon signs) |
| Rim / edge light | Highlights subject outline, separates from background |

**Direction modifiers:** key light, fill light, bounce, rim, spill, negative fill
**Color temperature:** warm (tungsten, amber), cool (daylight, blue), mixed

---

## Lens & Optical Effects

| Effect | Result |
|--------|--------|
| Wide-angle lens (24-35mm) | Broader view, exaggerated perspective |
| Telephoto (85mm+) | Compressed perspective, subject isolation |
| Anamorphic | Stretched aspect, signature lens flares |
| Lens flare | Streaks from bright light hitting lens |
| Fisheye | Extreme curvature, edges bent strongly outward |
| Barrel distortion | Mild distortion, straight lines bow slightly outward |

**Fisheye ≠ barrel** — they are separate effects, not interchangeable.

---

## Focus / Depth of Field

| Primitive | Definition |
|-----------|-----------|
| Deep focus | Everything sharp, FG to BG |
| Shallow DoF | Subject sharp, background bokeh |
| Extremely shallow DoF | Razor-thin focal plane |
| Rack focus | Shifts focus between two subjects mid-shot |
| Pull focus | Gradual focus shift (slower than rack) |
| Focus tracking | Focus follows a moving subject |

When DoF changes during a shot, label start AND end focal plane (FG/MG/BG/out-of-focus).

---

## Subject Transitions

| Primitive | When |
|-----------|------|
| Subject revealing | A new subject enters frame (by subject movement OR camera movement) |
| Subject disappearing | A subject exits frame |
| Subject switching | Focus shifts from one subject to another (often via rack focus or camera move) |
| Complex alternating | Subjects alternate focus multiple times |

Always name the cause: "by subject movement" or "by camera movement."

---

## Identity Anchoring (Character Consistency)

Models LOSE character identity across cuts unless you re-state it. In EVERY shot of a multi-shot sequence, repeat the same 3-6 disambiguating visual attributes verbatim.

**Pronouns and "the same character" DO NOT WORK.**

Example:
> "Aang — bald, blue arrow tattoo on forehead, orange-and-yellow robes — plants his staff. … Aang — bald, blue arrow tattoo on forehead, orange-and-yellow robes — turns to camera."

---

## Temporal Effects

| Primitive | Definition |
|-----------|-----------|
| Time-lapse | Events significantly faster than real time |
| Fast-motion | Slightly faster than real (1x-3x) |
| Slow-motion | Slower than real |
| Stop-motion | Frame-by-frame discrete movements |
| Speed-ramp | Mix of fast and slow within the same shot |
| Time-reversed | Plays in reverse |
| Freeze-frame | Dramatic pause |

---

## Style & Aesthetic References

### Cinematic Styles
Film noir, period drama, thriller, modern romance, documentary, arthouse, experimental film, epic space opera, fantasy, horror, 1970s romantic drama, 90s documentary-style

### Film Stock / Grade
Kodak warm grade, Fuji cool tones, 16mm black-and-white, 35mm photochemical contrast, vintage grain overlay, halation on speculars, teal-and-orange color grade

---

## What to AVOID

| Don't | Why | Do Instead |
|-------|-----|-----------|
| "Beautiful scene" | Too vague | "Wet cobblestone street, warm streetlamp glow reflecting in puddles" |
| "Person moves quickly" | No visible action | "Woman sprints three steps and vaults over the railing" |
| "Cinematic look" | Every model tries this | "anamorphic lens, shallow DOF, golden hour lighting" |
| "Sad character" | Internal states aren't visible | "Tears on cheek, shoulders slumped, staring at empty chair" |
| "Epic" | Not a visual constraint | "Low-angle, 24mm wide, sun directly behind subject, lens flare" |
| Readable text / logos | Models can't render text | Avoid signs with text |
| Multiple characters talking | Breaks sync | One speaker per clip, or reaction shots |
| Conflicting lighting | "Bright noon" + "dark shadows" | Pick one lighting setup |

---

## Prompt Iteration Strategy

1. Start simple — subject + action + setting
2. Add one element at a time — camera, then lighting, then style
3. If a shot misfires — strip back, freeze camera, simplify action
4. For consistency across clips — repeat the same style/lighting/grade description (= style_suffix)
5. For character consistency — repeat 3-6 visual attributes verbatim in every prompt
