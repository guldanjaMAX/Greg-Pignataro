# gregpignataro.com Design Brief and Prompt

This one file is the entire text handoff. The live site HTML, the UX rationale, the brand context, the target reader, and the success criteria are all included inline below the prompt. Images are separate file uploads.


---
# PART 1. THE PROMPT

# The Prompt

Paste everything below into Claude. If the /design skill is available, invoke it first. The prompt assumes the other files in this folder are accessible.

---

You are designing a conversion and emotional resonance optimization pass on gregpignataro.com. This is a premium somatic practitioner's personal site. The reader is a 40 plus year old woman, usually post divorce, who is financially free but emotionally exhausted. She has tried therapy, coaching, retreats, and psychedelics. She does not need another inspirational wellness page. She needs to feel safe enough to book a conversation.

Read these files before designing.

1. 01-current-site.html. The live HTML.
2. 02-ux-heatmap-report.md. The UX rationale and predicted scroll depth heatmap. Treat as context.
3. 03-brand-context.md. The visual identity. Respect this.
4. 04-target-reader.md. The ICP. The whole design should be in service of her.
5. 05-success-criteria.md. How you will judge your own options.

## What I want

Three design options per section listed below. For each option.

One. A rendered HTML preview of the section, self contained, using the existing brand tokens from 03-brand-context.md. No external CSS. Tailwind utilities allowed. Cormorant Garamond and DM Sans loaded from Google Fonts.

Two. A strategic rationale. Two to four sentences. Tell me what you changed, why you changed it, and what behavior it is trying to cause in the reader.

Three. A confidence score from 0 to 100. Your own best read on whether this option actually lifts the primary metric (qualified applications booked) versus the current version.

Four. A risk note. One sentence. What could go wrong with this option. If the risk is low, say so.

## Priority sections (in this order)

A. Hero. The fold. Current state is Greg photo right, H1 serif left, subhead, one CTA. Consider how to resolve the tension between emotional resonance (come home to yourself) and informational clarity (what does Greg actually do, who is it for, what happens if I book). Do not remove the hero photo option, but at least one of your three options should explore a reader centered hero rather than a Greg centered hero.

B. Is This You section. Three verbatim client sentences currently presented as a bulleted or stacked block. The sentences are gold. The visual treatment is flat. Make the page stop and pay attention.

C. Social Proof section. Wendy featured video at top, then smaller testimonial cards. The layout is functional. The ordering and weight are wrong for the target reader. She is looking for women like her. Redesign the hierarchy so the first two cards a reader sees support her specifically. Assume at least one woman written testimonial is available (a quote plus a name).

D. Apply CTA. Currently a button into Calendly. No reassurance. No what happens next. Redesign the block so a reader who has been burned by wellness industry pitches feels safe enough to click.

E. Overall page rhythm. Treat this as one option, not three. Look at the full page scroll and tell me where you would add, remove, or resequence sections. You have my UX report as a starting point. Tell me where you disagree.

## What I do not want

Do not touch copy in the Monsters Inc Principle block or the Santa Claus Principle block. Those paragraphs are working. Layout suggestions fine. Rewording no.

Do not invent testimonials. Do not fabricate credentials. Do not generate AI portraits of Greg. Use only the photos in assets/.

Do not default to a wellness landing page aesthetic. No green leaves, no mandalas, no stone stacks, no serif in italic script. The current brand is quiet, warm, Kodak Portra, Cormorant Garamond, gold on cream. Stay there.

Do not introduce dark mode, carousels, auto playing video, parallax, or particle effects. The reader is tired. Let her rest.

## Format of your reply

For each priority section A through D, produce a section header, three option cards (each with the HTML preview, rationale, confidence, risk), and a one line recommendation at the bottom of the section ("I would ship Option 2 first").

For section E, produce a single prose block with your resequencing argument, confidence, and risks.

Close the reply with a summary table. Section, winning option, confidence, biggest risk, effort estimate.

## Notes on tone in your design

The reader's bar for being sold to is at the floor. She can smell shame based marketing from three paragraphs away. Everything on this page has to read as though Greg is not trying to convert her. The design needs to carry that same restraint. Generous whitespace. Quiet type. One clear gold CTA per viewport at most. The page should feel like a letter someone left on her kitchen table, not a landing page.

Confidence on this brief being complete: 82. If something is missing ask one clarifying question before starting and assume good faith defaults for everything else.

---
# PART 2. UX HEATMAP REPORT

# gregpignataro.com — UX Heatmap + Image Shot List

Date: 2026-04-20
Scope: Full live site (https://gregpignataro.com), section by section.

Everything below is an opinion, not a fact. Confidence scores are my read on how likely the change actually lifts the right outcome (a qualified application, not a click). Assume every piece of this is up for discussion.

---

## Part one: UX + heatmap walkthrough

### How I am reading this

A heatmap read on a page we cannot A/B test live is really a structured guess at where eyes land, how long they stay, and where the scroll stops. I am using three lenses:

1. Gaze path. Where does the eye hit first, second, third.
2. Bounce risk. What would make a 47 year old divorced woman who is tired of being sold to close the tab.
3. Commitment math. Is the ask matched to the trust we have earned at that point on the page.

---

### 1. Navigation bar

Gaze path: logo left, "Book a Call" button top right (the only gold element above the fold besides the hero H1 serif).

What is working. The CTA pill in the nav is the only button on a quiet nav. The button label currently reads "Book a Call." On the rest of the page we use "Book a Conversation." Two labels for the same action at the top of the page costs a small amount of trust because the visitor has to reconcile them.

Fix (confidence 82). Normalize to "Book a Conversation" everywhere. One promise, one label, one price for the cognitive ask.

Minor. "The Story" link was added to nav correctly. Nav is still six items which is fine on desktop but will wrap or collapse on iPhone SE widths. Confirm the mobile hamburger still opens cleanly (it does on the local build).

---

### 2. Hero

Gaze path: H1 serif ("Come home to yourself.") first, the subhead ("For the ones who have tried everything...") second, CTA third. The Greg photo on the right is likely the next stop before a scroll.

What is working. The line "Come home to yourself." is soft, unusual, and does not sound like a wellness landing page. That is the biggest single asset on the page. The subhead does the job of naming the reader ("for the ones who have tried everything").

What is weak. There is no single line that says what Greg actually does. A stranger lands on this page and within three seconds has to answer three questions. Who is this. Who is it for. What happens if I book. Right now the page answers one and a half. "Come home to yourself" is emotional, not informational. The subhead names the reader but not the transaction.

Fix (confidence 70). Add one neutral information line under the subhead in smaller sans. Something like "Private 12 month work. One person at a time. By application."

A second, stronger lever (confidence 65). Add a quiet credibility strip directly under the hero with two or three items. "20 years of practice. Trained under Dr. Gabor Maté. Facilitator, Richard Branson's Necker Island." It removes the who is this guy question before the fold without shouting.

Hero photo. The current warm connect shot is the right choice. Greg looking into camera, not performing. If the page is changed to lead with her (the 40+ divorced woman you want as the reader), a second, secondary hero option would be an image where the subject is the reader in her own space (see shot list below). I would not swap the current hero yet. I would test it.

---

### 3. Guinness World Record feature

Gaze path: the red and white badge graphic or the line "He walked through it first" lands first. The number (Guinness) is what the eye scans.

What is working. This is proof the reader cannot argue with. It also signals that Greg is not a talker, he is a doer. For a reader who has been burned by coach talk, that matters.

What is weak. The frame today positions the record as a credential for Greg. For the target reader, the record is only interesting if it funds her trust in his capacity to handle her pain. Add one sentence that bridges from the physical record to the emotional work. "He knows the physics of suffering through something the body wants to quit on. That is what he brings to your work." Confidence 68.

---

### 4. Is this you

Gaze path: the question H2 first, then the three client sentences.

What is working. The verbatim client sentences are the strongest copy on the page. Nothing beats a real sentence from a real person. "I have done all the work and I still cannot look at myself in the mirror without apologizing." That is the page in one line.

What is weak. The block is visually flat. Three bullet items, three similar lengths, same weight. On a heatmap the eye scans, registers "I am one of these," and moves. There is no visual anchor to slow the gaze.

Fix (confidence 72). Pull one of the three sentences into a larger oversized quote treatment (same manifesto style used later in the page for Monsters Inc and Santa Claus). That gives the section a focal point and makes the sentence unforgettable. Keep the other two as smaller supporting lines.

---

### 5. Santa Claus Principle

Gaze path: the eyebrow "The Santa Claus Principle" in gold small caps, then the manifesto body.

What is working. This is original, memorable, and reframes an entire industry. The block is doing real persuasive work. The gold eyebrow + serif body + attribution pattern is beautiful.

What is weak. The section is text only. On mobile, two manifesto blocks back to back (Santa Claus then Monsters Inc) risks becoming a wall. The reader is working hard through long paragraphs of prose. Some readers will skim. A 40+ reader reading on her phone at 9pm will.

Fix (confidence 60). Add one atmospheric image between the two manifestos. Not a photograph of Greg. Something abstract and warm, brand aligned. See shot list section B1 below.

---

### 6. Monsters Inc Principle

Gaze path: eyebrow, then the manifesto body. The emphasized last line ("Safety changes a nervous system in a way no amount of willpower ever can.") should be where the eye rests.

What is working. The Pixar reference is disarming. The metaphor is load bearing (fear vs joy as energy). The emphasized closer is the right takeaway.

What is weak. The block assumes the reader has seen or remembers Monsters Inc. Most will. A subset will not. Consider adding one tiny line that is understandable even without the movie reference. "Fear is loud and cheap. Love is quiet and magnitudes more powerful." That is one of the most important business lines in the work and right now it is buried in a longer paragraph.

Fix (confidence 65). Pull that line out as an oversized one liner under the manifesto paragraph. Repetition, not deletion, is the move here.

---

### 7. Three Phases

Gaze path: H2 "Three phases. Most people get stuck in the first two." The structure likely reads as three stacked cards or a vertical list.

What is working. The Zen mountain frame is intellectually elegant and gives the reader a map of where she is. Naming phase two as the stuck place is what will make her sit up. She is in phase two. She did not know it had a name.

What is weak. Phases one and two get short, active descriptions. Phase three tends to get the vaguest language on most versions I have seen ("you come home"). The phase three copy has to land. This is the outcome she is buying.

Fix (confidence 70). Tighten phase three with one concrete, physical promise. Not "you come home to the body." Something like "You wake up, look in the mirror, and do not start negotiating. That is it. That is the whole thing." Keep the poetic line, but ground it with the specific.

---

### 8. Quote divider

Gaze path: the single pull quote is meant to breathe. On a heatmap this is cool. That is by design.

No change. The page needs rest breaks. Confidence 90 that the current treatment is correct.

---

### 9. What I actually believe (The Story)

Gaze path: H2, then first paragraph. Scroll depth drops here for any reader who is not already committed. This is the longest prose block on the page.

What is working. The 2020 opening is the right choice. It says this man lived through the thing, not just read about it.

What is weak. It is still a long text block. For a tired 9pm reader, a long unbroken story is exit ramp territory. The prose is good. The density is the risk.

Fix (confidence 75). Add two or three inline pull quotes inside the story. Break the text with oversized single sentences. This is a typography move, not a copy move. Every 250 to 300 words pull one sentence out as an oversized quote. Same manifesto treatment used elsewhere.

Also (confidence 55). Consider one atmospheric image partway through the story. Not a photograph of Greg looking at the camera. Something that represents the moment of the story (see shot list B3).

---

### 10. Social proof (testimonials)

Gaze path: the top of the section (Wendy video card with cover image) lands first. Then the eye scans left to right across the smaller testimonial cards.

What is working. Wendy featured at top, with video, is the strongest possible open. Ray and Lee as video cards next. Anthony, Rahul, John, James as smaller cards.

What is weak. 1. James Guldan on the page as a testimonial raises a question for a stranger ("wait, who is that, isn't that the guy who built the site"). Fine for you and me. Unclear whether it costs or buys trust with the target reader. Consider whether James is included on the live site visible to prospects or reserved for internal versions. Confidence 55 that removing reduces noise.

2. The testimonials are all men and Wendy. For a page being rewritten to land with 40+ divorced women, we need at least one or two women clients visible above the fold of the social proof section. Not as performance. Because she is looking for evidence other women like her did this and survived. Right now Wendy is the only one. That is a problem the copy cannot fix. See shot list D1 and D2.

Fix (confidence 78). Get video or written testimonial from at least one woman client post divorce, post 40. Until then, consider adding a written quote treatment from an existing woman client if one exists, styled in gold manifesto type. A quote block is not a photo but it does weight the page toward her.

---

### 11. Wendy featured video

Gaze path: video poster frame first, then play button.

What is working. Video testimonial from a recognized music industry figure is strong. Her name carries beyond her story.

Double check. Confirm the video still loads correctly with the MOV MIME type fix (done 2026-04-19). Quick verification on iPhone Safari recommended.

No change otherwise. Confidence 88.

---

### 12. Work with Greg (offer)

Gaze path: H2, then the offer copy.

What is working. Single custom application offer is the right play. No tiers. No "starter vs premium." This protects the work and signals quality.

What is weak. The page currently does not say anything about who this is not for. A premium by application offer that does not filter feels generous. A premium offer that does filter feels valuable. Add a short "this is not for" block. Three lines. "Not for people looking for a quick fix. Not for people unwilling to meet their own body. Not for people who want someone else to do the work for them." Confidence 72.

Also consider a one line on container length and cadence. "Twelve months. Weekly touchpoints. Two in person intensives." Specific. Confidence 70.

---

### 13. The writing

Gaze path: H2, then the horizontal row of essay cards.

What is working. The cards are strong. Real titles. Real imagery. Good density.

What is weak. Seven essays shown out of eighteen. There is no way for the reader to understand the scope of the writing. "150,000 words" is stated in the H2 but an abstract number does not communicate depth.

Fix (confidence 58). Replace "Read All Essays" with "See all 18 essays" so the number anchors before the click. Even better, add "Updated monthly" or similar if Greg is still publishing. If the archive is static, do not promise what is not true.

---

### 14. Closing quote

Gaze path: the closer is poetic, quiet. This is the emotional peak before the ask. No change. Confidence 88.

---

### 15. Apply CTA

Gaze path: H2, Calendly button, then the reassurance line underneath.

What is working. Calendly direct link (fixed from necker slug to discovery call slug on 2026-04-19). No form in the way.

What is weak. There is no answer to the question "what happens after I book." A 40+ woman who has been burned will hesitate over the click itself. The page does not say how long the call is, whether it is phone or video, whether there is a fee, whether she will be pitched. Every one of those unknowns is a reason to not click.

Fix (confidence 82). Add a short three item reassurance strip under the CTA. "30 minute video call. No cost. No pitch. If this is not a fit we will both know in five minutes."

---

### 16. Footer

No changes. Clean.

### 17. Cookie consent

Check that the cookie banner is compliant with the privacy policy claims. Confidence 65 that there is a small mismatch worth a legal audit pass.

---

## Part two: Heatmap scroll depth prediction

Here is my best guess at where the average target visitor drops off. Numbers are predictions, not data. Treat as hypotheses to validate once Microsoft Clarity is wired up.

Hero (100 percent reach). 100 percent see the hero.
Guinness (92 percent). Most scroll once.
Is this you (82 percent). This is the identify yourself moment. Drop off above this is already qualified out.
Santa Claus (68 percent). First manifesto. Dense text. First real commitment.
Monsters Inc (58 percent). Second manifesto. Readers who made it here are the real prospects.
Three Phases (52 percent).
The Story (38 percent). Prose density drops readers.
Social Proof (42 percent, because some readers jump from Is This You directly to social proof).
Wendy video (35 percent).
Offer (30 percent).
Writing (25 percent).
Apply CTA (22 percent).

The shape of this curve is fine. It means the page is doing its job sorting. The one place to fight the curve is The Story at 38 percent. That is where readers who would buy are losing momentum. Hence the pull quote recommendation above.

---

## Part three: Image shot list

Existing usable brand assets already in the repo:

A. greg_warm_connect.jpg (hero, in use).
B. greg_speaking_gesture.jpg (in use in Guinness section likely).
C. greg_hero_smile.jpg, greg_intense_focus.jpg, greg_authority.jpg (held back, available).
D. 8 hero variant options (hero_option_a/b, hero_warm_a/b, hero_sp1/2 a/b). Plenty of backup.
E. Brand plates already generated: body-golden-light.png, golden-smoke-dark-bg.png, hero-golden-rays-landscape.png, kintsugi-stone-gold-veins.png.
F. All testimonial headshots present.

What we do not have and what to generate.

---

### B1. Between Santa Claus and Monsters Inc

Purpose. Breathing image. Visual rest between two text manifestos. Not a photograph of Greg. Atmospheric, brand aligned.

Gemini prompt.

"Cinematic soft still life. Warm cream background with subtle golden texture. A single white candle flame with gold glow, slightly out of focus foreground with a blurred hand reaching toward it (warm skin tone, no identifying features). Kodak Portra 400 look. Muted, contemplative, unresolved. No text. No logos. Not wellness brand cheese. Reads like a Terrence Malick film still. 16:9 aspect ratio. 1792x1024."

Confidence 75 that this reads as brand correct on first generate. Expect to iterate 3 to 5 times.

### B2. Between Three Phases and Quote Divider

Purpose. Visual metaphor for the mountain. Not literal mountain photography.

Gemini prompt.

"Abstract cinematic landscape. Three layered mountain silhouettes at dawn, warm desaturated palette. Foreground mountain sharp and detailed, middle mountain soft focus, far mountain almost vanishing into warm cream sky. Sense of depth and ordered progression. Shot on medium format film. No text. No figures. Horizontal 16:9. 1792x1024."

Confidence 70.

### B3. Inline inside The Story (one image, midway)

Purpose. Mood image that holds the emotional weight of the 2020 moment without literalizing it.

Gemini prompt.

"Photograph, 35mm film grain. A single empty wooden chair facing a window at dawn. Warm cream light falling across empty hardwood floor. No figure. No text. Quiet, grief adjacent, hopeful. Soft focus background. Shot like a Jamie Hawkesworth editorial. 3:2 ratio. 1536x1024."

Confidence 68. Risk: Gemini defaults to saturated stock. Iterate toward quiet.

### C1. New hero (alternate, for A/B test only if Greg wants to test)

Purpose. Hero that centers the reader, not Greg. Optional. Do not swap until tested.

Gemini prompt.

"Photograph of a woman in her mid 40s sitting at a wooden kitchen table at dawn, hands around a warm mug, looking slightly off camera. Warm cream and gold tones. Natural window light. Composed. Not performing. No jewelry. No obvious branding. Kodak Portra 400. Shot from a respectful distance. 3:2 ratio. 1536x1024."

Confidence 60. The ethical note: do not deploy AI generated photographs of women as "clients." If used, must be explicitly labeled or used only in background contexts where no testimonial claim is implied.

### D1 and D2. Women client testimonials (photo + video)

Purpose. Diversify the social proof section. This is the biggest single gap on the page for the target reader.

This is not a Gemini job. This is a client outreach job.

Action. Greg to identify two existing women clients (40+, post divorce preferred) willing to record a 60 to 90 second video testimonial. Alternative: a written quote plus photo, with explicit consent. Goal: two women visible in the social proof section within 30 days. Confidence on impact 88. This single change moves the page more than any image prompt above.

### E1. One image inside Apply CTA

Purpose. Small warm photograph or abstract plate next to the Calendly button to reduce the "form field wall" feel.

Gemini prompt.

"Soft cinematic still, extremely simple. A pair of hands holding a ceramic mug, warm steam rising, in front of a blurred warm cream background. No face. No identifying features. Gold light. Feels like calm, not wellness cheese. 1:1 square. 1024x1024."

Confidence 70.

---

## Part four: Priority order

If we ship one thing this week. D1 and D2 (recruit women client testimonials). Nothing else moves the needle as much for this audience. Confidence 88.

If we ship two things. D1/D2 plus the reassurance strip under the Apply CTA. Low effort, high conversion lift. Confidence 80.

If we ship three things. Above plus pull quotes inside The Story to fight the 38 percent drop off. Confidence 72.

If we ship image generations. B1 first (between manifestos). It is the lowest risk, clearest brand fit, and will read well on mobile. Confidence 75.

---

## Part five: Open questions for you

None require answers to keep working. Answers here let me prioritize better for the next pass.

1. Is there a real woman client post 40, post divorce, who might say yes to a testimonial. Who is she.
2. Do you want the hero to stay Greg centered or shift toward reader centered, understanding an image of a real woman client is the right substitute if available.
3. Are we comfortable attributing "trained under Gabor Maté" as credentialing on the page and in schema, or does that need softer language (attended, studied with, participated in).
4. Is Microsoft Clarity wired to gregpignataro.com yet. If yes we can replace the predicted heatmap above with real data inside two weeks.

---
# PART 3. BRAND CONTEXT

# Brand Context

## Palette (in use today)

--bg-primary: #FDFBF8 (warm cream, main background)
--bg-warm: #F7F3EE (second warm cream, sections)
--bg-accent: #F0EBE3 (third warm cream, cards)
--bg-card: #FFFFFF (true white, content cards only)
--gold: #B8863A (primary accent, used on CTAs and eyebrow labels)
--gold-light: #C99B4F (gold on hover)
--gold-bright: #D4A853 (only for small highlights)
--text-primary: #2C2520 (body copy, dark warm brown, never pure black)
--text-secondary: #6B5E52 (supporting text)
--text-muted: #9E9285 (tertiary, metadata, timestamps)
--border-light: rgba(184,134,58,0.12) (gold tinted hairlines)

Shadows.
--shadow-soft: 0 4px 24px rgba(44,37,32,0.06)
--shadow-hover: 0 8px 40px rgba(44,37,32,0.10)

Nothing on this site is blue. Nothing is cool toned. Every color lives inside a warm cream to gold spectrum. If a designer's palette widget offers a cool accent, ignore it.

## Typography

Serif. Cormorant Garamond. Used for H1 and H2 and for manifesto style pull quotes.
Sans. DM Sans. Used for body copy, nav, CTAs, eyebrow labels, metadata.

Eyebrow labels are a pattern. Small caps, 0.78 rem, letter spacing 0.22 em, uppercase, gold color, above a manifesto style section. They give the reader the principle name before the prose.

Body font size 16 px. Line height 1.7. Generous.

Do not introduce a third typeface. Do not italicize serif for emphasis except inside manifesto blocks where it is already established.

## Voice

Quiet. Direct. Unadorned. Greg does not call the reader beloved. He does not promise transformation. He does not use the word journey. He uses sentences like "the work underneath all the other work" and "he walked through it first."

If copy sounds like a yoga studio it is wrong. If copy sounds like a therapist's intake form it is wrong. The right target is a letter from a friend who happens to have done this for twenty years.

## Imagery rules

Photography. Kodak Portra 400 stock. Natural window light. No flash. Warm cream and gold dominant. Subjects look like themselves, not like they are performing for a wellness brand.

Greg's photos. Already shot. Use as is.
Client photos. Real people, never AI.
Atmospheric plates. Allowed. Use for rest breaks between dense text. Prompts in the UX report.

Banned. Stock photo women laughing at salad. Stock photo men meditating on mountain tops. Mandalas. Lotus flowers. Sound bowls. Chakra diagrams. Anything that says healing industrial complex.

## Motion

Scroll based reveal on sections is in. Fade in, small translate up. Duration 600 ms. One time only.

Parallax. No.
Auto playing video. No.
Carousels. No.
Particle effects. Absolutely not.

Hover state on CTAs is a gentle color shift from gold to gold light with a 2 px lift. That is the whole motion vocabulary.

## Voice of CTAs

Primary CTA says "Book a Conversation." Everywhere on the page. Same label. Always linked to #apply which scrolls to the Calendly block. Never "Sign up" or "Get started" or "Apply now."

Secondary CTA rarely appears. When it does it is a ghost button. "Read the writing" for example.

## Layout rhythm

The page should breathe. Full width sections with a 860 px to 960 px content column. Padding top and bottom of 80 px to 120 px between sections.

Manifesto blocks use center aligned single column narrow 720 px. The Cormorant Garamond italic pulls the eye.

Testimonial cards are 320 px to 360 px wide with aspect 4 to 5 cover images. 20 px gap in the grid. Three or four per row on desktop.

## What the current design does well

The warm cream and gold palette is correct.
The Cormorant Garamond H1 is beautiful.
The manifesto block treatment (eyebrow plus italic body plus attribution) is memorable.
The testimonial card cover image treatment is clean.

## What the current design struggles with

Information density in the Hero fold.
Visual sameness between Is This You and other stacked blocks.
The Social Proof section reads male dominated because the current client mix is male dominated.
The Apply CTA block has no visual warmth. Just a button.

Designer: this is the material to design against.

---
# PART 4. TARGET READER

# Target Reader

## One sentence version

A financially free woman in her 40s or 50s, typically after a divorce, who has tried every respectable modality and still wakes up with a sentence running in her head that says I am not good enough.

## Expanded

Age. 42 to 58. Centered around 48.

Income. No issue. Household net worth above 2 million dollars. She is not looking for a payment plan. She does not ask how much. She does ask what happens.

Life stage. Post divorce is the modal case. Also in scope. Empty nest. Founder exit spouse. Executive who quit the C suite at the top. Athlete turned parent turned someone she does not recognize.

What she has already tried.

Talk therapy for years. It helped her understand herself. It did not change her relationship to her body.
Yoga and meditation retreats. She loves the week. The first Tuesday back home it is gone.
A mindset coach. A life coach. Possibly two. She loved her coach. She still feels the thing.
Plant medicine once or twice. It showed her what was possible. It also scared her.
Biohacking. Red light. Cold plunge. Sauna. HRV tracking. She knows what VO2 max is.

What she is not.

She is not on the spiritual bypass track. She has done real psychological work. She has read the books. She knows her attachment style. She can name her shadow parts. The problem is she knows all of this and the quiet sentence is still there.

She is not looking to be taught. She is looking to be seen.

## What is underneath

She lost an identity that was running a decade of her life. Wife of. Mother of. CEO of. Athlete in. Now she is nobody's anything. She thought that would feel like freedom. Some days it does. Most days it feels like falling.

She is tired of women's circles that shame her gently into being more vulnerable on command. She is tired of men who think the solution is for her to love herself more. Both of those are still asking her to perform.

She wants to be left alone inside her body. She wants to stop negotiating with the mirror. She wants the thing in her chest to not be there when she wakes up.

## What she will pay for

Quiet. Safety. Someone who has been through it. Someone who does not flinch when she says the thing she has not said out loud.

Not a program. Not a certification. Not a curriculum. Not a retreat with branded towels.

A person.

## What will make her bounce the landing page in five seconds

Any photo of a woman with eyes closed and arms up.
The word "journey" in the first paragraph.
A CTA that says "Transform your life now."
A countdown timer.
A pricing table.
"As featured in" logos stacked horizontally.
Chakra anything.

## What will make her stay

A sentence that names the thing she has not said out loud.
Evidence of other women like her on the page who did this and say it was worth it.
One credentialed male practitioner she can trust is not a wolf in the hen house, with clear markers of depth (Gabor Maté training is the strongest signal).
Calm visual rhythm. Warm cream. Cormorant serif. No shouting.
A CTA that says the meeting is a conversation, no cost, no pitch, and she can leave anytime.

## What will cause her to book

All of the above plus one crucial element. A woman like her, visible on the page, in her own words, saying this helped.

That is why the single highest leverage change on the page today is not a design change. It is recruiting one or two women testimonials. The design should be built to make space for them.

Designer: read this before you touch the layout.

---
# PART 5. SUCCESS CRITERIA

# Success Criteria

Applied in this order. Ties broken by earlier criterion.

## 1. Does it move the primary metric

Primary metric. Qualified discovery calls booked per 100 visitors.

A qualified discovery call is not just any Calendly booking. It is a booking from someone in the ICP (see 04-target-reader.md) who shows up and stays for the full call.

A design option that increases total click through to Calendly but attracts the wrong audience is net negative, not neutral. Assume Greg can only hold six new conversations a week. Filling his calendar with unqualified calls is a cost.

## 2. Does it feel right to the reader in the first five seconds

She spends five seconds on the hero and decides. Read the hero aloud in a calm voice. Does it sound like a letter she would trust, or a brand she would swipe past.

Confidence 85 that if the hero fails this test nothing else in the page matters.

## 3. Does it hold her through the 38 percent scroll depth trap

My predicted heatmap (see 02-ux-heatmap-report.md) puts a drop off around The Story section at 38 percent. That is where readers who would buy are losing momentum.

A design option that fights that drop with better rhythm, pull quotes, and rest images scores higher than one that adds copy.

## 4. Does it make space for women testimonials

The single biggest conversion gap for the target reader is visible women clients. A design that forces the social proof section to accommodate at least one written woman testimonial prominently scores higher than one that preserves the current layout.

## 5. Does it respect the existing brand

Warm cream. Gold. Cormorant Garamond. DM Sans. Generous whitespace. No wellness industry visual cliches.

A design that chases engagement with carousels, dark mode, animations, or loud color is disqualified.

## 6. Is it shippable in 48 hours

Greg is a one person practice. Every design option needs to be reviewable by him in one sitting and implementable by a single engineer in two working days or less. Options that require a rebuild of the whole design system are out of scope for this pass.

## 7. Confidence score

Every option must include the designer's own confidence score, 0 to 100, on whether the option will lift criterion 1. If the designer is unwilling to score, the option gets zero.

I will not ship a design option with a confidence score under 60. I will ship one with 75 plus if it also scores well on criterion 2 through 5.

## Tiebreakers

If two options tie on conversion confidence, ship the one that respects the existing brand more. This is a long running property, not a campaign page.

If two options tie on brand, ship the one that holds the reader through the Story section.

If two options tie on everything, ship the simpler one.

---
# PART 6. CURRENT SITE HTML

Full HTML below. Use this as the canonical state of the page. Design options should build on or depart from this.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Greg Pignataro | Come Home to Yourself</title>
<meta name="description" content="Greg Pignataro helps people at the biggest transitions of their lives stop believing they are not good enough. Guinness World Record holder, trained under Gabor Mat&eacute;, twenty years of practice in the work underneath all the other work.">
<meta name="author" content="Greg Pignataro">
<meta name="theme-color" content="#B8863A">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

<!-- Favicon -->
<link rel="icon" type="image/png" href="favicon.png">
<link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="apple-touch-icon" href="apple-touch-icon.png">

<!-- Open Graph / Social Sharing -->
<meta property="og:type" content="website">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="Greg Pignataro | Come Home to Yourself">
<meta property="og:description" content="For the ones who have tried everything. Greg Pignataro helps people stop believing the quiet sentence that has been running the show: I am not good enough.">
<meta property="og:url" content="https://gregpignataro.com/">
<meta property="og:image" content="https://gregpignataro.com/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Greg Pignataro. Come home to yourself.">
<meta property="og:site_name" content="Greg Pignataro">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Greg Pignataro | Come Home to Yourself">
<meta name="twitter:description" content="The work underneath all the other work. For the ones who have tried everything.">
<meta name="twitter:image" content="https://gregpignataro.com/og-image.png">
<meta name="twitter:image:alt" content="Greg Pignataro. Come home to yourself.">

<!-- Canonical -->
<link rel="canonical" href="https://gregpignataro.com/">

<!-- Sitemap and LLM discovery -->
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt">

<!-- JSON-LD: Person -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://gregpignataro.com/#greg",
  "name": "Greg Pignataro",
  "url": "https://gregpignataro.com/",
  "image": "https://gregpignataro.com/og-image.png",
  "jobTitle": "Embodied Transformation Practitioner",
  "description": "Greg Pignataro helps people at the biggest transitions of their lives come home to themselves. He works with the body as the entry point to the mind, and the mind as the entry point to the body.",
  "sameAs": [
    "https://calendly.com/greg-enlightened"
  ],
  "knowsAbout": [
    "Somatic therapy",
    "Nervous system regulation",
    "Identity dissolution",
    "Body image and shame",
    "Chronic pain and suppressed emotion",
    "NeuFit and nervous system mapping",
    "Resonance Release",
    "Post performance recovery"
  ],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Carthage College"
  },
  "hasCredential": [
    {"@type": "EducationalOccupationalCredential", "name": "Bachelor of Arts in Psychology"},
    {"@type": "EducationalOccupationalCredential", "name": "Certified Strength and Conditioning Specialist (CSCS)"},
    {"@type": "EducationalOccupationalCredential", "name": "NeuFit Certified Practitioner"},
    {"@type": "EducationalOccupationalCredential", "name": "ATG Certified Coach"},
    {"@type": "EducationalOccupationalCredential", "name": "Compassionate Inquiry training under Dr. Gabor Mat&eacute;"},
    {"@type": "EducationalOccupationalCredential", "name": "Guinness World Record holder, Nordic Hamstring Curls"}
  ]
}
</script>

<!-- JSON-LD: WebSite with SearchAction -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://gregpignataro.com/#website",
  "url": "https://gregpignataro.com/",
  "name": "Greg Pignataro",
  "description": "The work underneath all the other work.",
  "publisher": {"@id": "https://gregpignataro.com/#greg"},
  "inLanguage": "en-US"
}
</script>

<!-- JSON-LD: Service -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://gregpignataro.com/#service",
  "name": "Private Work With Greg Pignataro",
  "serviceType": "Embodied coaching and somatic transformation",
  "provider": {"@id": "https://gregpignataro.com/#greg"},
  "areaServed": {"@type": "Country", "name": "United States"},
  "audience": {
    "@type": "Audience",
    "audienceType": "Adults in major life transitions who have already tried therapy, retreats, coaching, psychedelics, and biohacking and still feel something fundamental has not shifted"
  },
  "description": "A private twelve month container for people at an inflection point. The body is one entry point. The mind is the other. The work underneath is the same.",
  "offers": {
    "@type": "Offer",
    "url": "https://gregpignataro.com/#apply",
    "availability": "https://schema.org/LimitedAvailability",
    "priceCurrency": "USD",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "price": "Custom. By application.",
      "priceCurrency": "USD"
    }
  }
}
</script>

<!-- JSON-LD: FAQPage -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who does Greg Pignataro work with?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "People at major inflection points. Founders who sold a company. Executives who hit the ceiling. Athletes after the last season. Parents after the kids left. People who have already done therapy, retreats, coaching, and psychedelics and still feel something fundamental has not shifted."
      }
    },
    {
      "@type": "Question",
      "name": "What is The Monsters Inc. Principle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A frame Greg uses for why the wellness industry does not work. In Monsters, Inc. the whole city ran on screams. Then they discovered laughter produced magnitudes more energy. They shut the scare factory down. The wellness industry is still running on fear, shame, and self punishment. Love and safety produce magnitudes more change than fear ever will."
      }
    },
    {
      "@type": "Question",
      "name": "What is The Santa Claus Principle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most health programs are trying to help Santa Claus eat fewer cookies. Better macros, smarter training, cleaner sleep habits. The belief that the body must look a certain way to be worthy of love is Santa Claus. No amount of optimizing around it will set someone free. Once the belief is seen clearly, it cannot be unseen."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Three Phases framework?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Based on an old Zen saying. Phase one, mountains are mountains. You chase the body, the career, the right identity. Phase two, mountains are no longer mountains. The identity dissolves, nothing feels solid. Most people get stuck here. Phase three, mountains are mountains again. You come home to the body and love it without needing it to be anything other than what it is."
      }
    },
    {
      "@type": "Question",
      "name": "Does Greg work with women?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Greg works with adults across gender at major transitions. His practice includes executives, founders, athletes, divorced mothers, and partners of high performers. He is one of the rare practitioners in this space who is not a wolf in the hen house. Two decades of credentialed practice, training under Gabor Mat\u00e9, facilitation at Richard Branson\u2019s Necker Island retreats."
      }
    },
    {
      "@type": "Question",
      "name": "What is Resonance Release?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A somatic modality Greg co created that combines DC electrical stimulation at healing sound frequencies with emotional release work. The premise is that suppressed emotion requires muscular effort, has a metabolic cost, and manifests as physical pain. Resonance Release works at the intersection of nervous system, body, and identity in a single session."
      }
    }
  ]
}
</script>

<!-- Google Analytics (GA4) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-X73WCJRFHT"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-X73WCJRFHT');
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300;1,9..40,400&display=swap" rel="stylesheet">
<style>
/* ============================================
   GREG PIGNATARO
   The Coach for People Who've Tried Everything
   v3.0 — Customer-Centric Rebuild
   ============================================ */

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg-primary: #FDFBF8;
  --bg-warm: #F7F3EE;
  --bg-accent: #F0EBE3;
  --bg-card: #FFFFFF;
  --gold: #B8863A;
  --gold-light: #C99B4F;
  --gold-bright: #D4A853;
  --gold-dim: rgba(184,134,58,0.06);
  --text-primary: #2C2520;
  --text-secondary: #6B5E52;
  --text-muted: #9E9285;
  --border-light: rgba(184,134,58,0.12);
  --shadow-soft: 0 4px 24px rgba(44,37,32,0.06);
  --shadow-hover: 0 8px 40px rgba(44,37,32,0.1);
  --serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  --sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}

html { scroll-behavior: smooth; }
body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--sans);
  font-weight: 300;
  font-size: 16px;
  line-height: 1.7;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img { max-width: 100%; display: block; }
a { color: inherit; }

/* ===== SUBTLE TEXTURE ===== */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.015;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 256px;
}

/* ===== NAVIGATION ===== */
#navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  padding: 1.8rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  background: linear-gradient(180deg, rgba(10,8,5,0.6) 0%, rgba(10,8,5,0.3) 70%, transparent 100%);
}
#navbar.scrolled {
  background: rgba(253,251,248,0.95);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  padding: 1rem 4rem;
  border-bottom: 1px solid var(--border-light);
  box-shadow: 0 2px 20px rgba(44,37,32,0.04);
}
#navbar.scrolled .nav-links a { color: var(--text-secondary); }
#navbar.scrolled .nav-links a:hover { color: var(--gold); }
.nav-logo {
  font-family: var(--serif);
  font-size: 1.15rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  text-decoration: none;
}
.nav-links {
  display: flex;
  gap: 2.8rem;
  list-style: none;
}
.nav-links a {
  color: rgba(253,251,248,0.7);
  text-decoration: none;
  font-size: 0.78rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: color 0.3s;
  position: relative;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--gold);
  transition: width 0.3s;
}
.nav-links a:hover { color: var(--gold-light); }
.nav-links a:hover::after { width: 100%; }
.nav-cta {
  padding: 0.65rem 2rem;
  border: 1px solid var(--gold);
  color: var(--gold);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.4s;
  font-weight: 500;
}
.nav-cta:hover {
  background: var(--gold);
  color: #fff;
}
.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 8px;
}
.nav-hamburger span {
  width: 22px;
  height: 1.5px;
  background: var(--gold-light);
  transition: all 0.3s;
}

/* Mobile menu open state */
.nav-links.mobile-open {
  display: flex !important;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(253,251,248,0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  padding: 1.5rem 2rem 2rem;
  gap: 1.2rem;
  border-bottom: 1px solid var(--border-light);
  box-shadow: 0 8px 32px rgba(44,37,32,0.08);
}
.nav-links.mobile-open a {
  color: var(--text-secondary);
  font-size: 0.85rem;
}
.nav-links.mobile-open a:hover { color: var(--gold); }
.nav-hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translate(4px, 4px);
}
.nav-hamburger.open span:nth-child(2) {
  opacity: 0;
}
.nav-hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translate(4px, -4px);
}

/* ===== HERO ===== */
.hero {
  height: 100vh;
  max-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: url('images/hero_option_a.jpg') center center / cover no-repeat;
  background-color: #1a1410;
}
.hero::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(90deg, rgba(10,8,5,0.65) 0%, rgba(10,8,5,0.3) 40%, transparent 65%);
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 3;
  max-width: 1440px;
  margin: 0 auto;
  padding: 7rem 4rem 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.hero-text { max-width: 540px; }
.hero-eyebrow {
  font-size: 0.68rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 1.2rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
.hero-eyebrow::before {
  content: '';
  width: 32px;
  height: 1px;
  background: var(--gold);
}
.hero-title {
  font-family: var(--serif);
  font-size: clamp(2.8rem, 5vw, 4.6rem);
  font-weight: 300;
  line-height: 1.06;
  margin-bottom: 1.2rem;
  color: #FDFBF8;
  text-shadow: 0 2px 12px rgba(0,0,0,0.3);
}
.hero-title em {
  font-style: italic;
  color: var(--gold-light);
  font-weight: 400;
}
.hero-subtitle {
  font-size: 1rem;
  color: rgba(253,251,248,0.85);
  line-height: 1.85;
  margin-bottom: 1.5rem;
  max-width: 480px;
  text-shadow: 0 1px 6px rgba(0,0,0,0.2);
}
.hero-actions {
  display: flex;
  gap: 1.2rem;
  align-items: center;
  margin-bottom: 2rem;
}
.btn-primary {
  display: inline-block;
  padding: 0.95rem 2.8rem;
  background: var(--gold);
  color: #fff;
  font-size: 0.74rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}
.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s;
}
.btn-primary:hover::before { opacity: 1; }
.btn-primary:hover {
  background: var(--gold-bright);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(184,134,58,0.25);
}
.btn-ghost {
  display: inline-block;
  padding: 0.95rem 2.2rem;
  border: 1px solid rgba(253,251,248,0.25);
  color: rgba(253,251,248,0.8);
  font-size: 0.74rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s;
  backdrop-filter: blur(4px);
}
.btn-ghost:hover {
  border-color: var(--gold-light);
  color: var(--gold-light);
  background: rgba(253,251,248,0.05);
}

/* === Hero Credential Bar === */
.hero-credentials {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1.25rem;
  flex-wrap: wrap;
}
.hero-cred-item {
  font-family: var(--sans);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  color: rgba(253,251,248,0.7);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.hero-cred-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--gold);
  flex-shrink: 0;
}

/* === Scroll indicator === */
.hero-scroll {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.6;
  animation: scrollPulse 2.5s ease-in-out infinite;
}
.hero-scroll-chevron {
  width: 20px;
  height: 20px;
  border-right: 1.5px solid var(--gold);
  border-bottom: 1.5px solid var(--gold);
  transform: rotate(45deg);
  animation: chevronBounce 2s ease-in-out infinite;
}
@keyframes scrollPulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}
@keyframes chevronBounce {
  0%, 100% { transform: rotate(45deg) translateY(0); }
  50% { transform: rotate(45deg) translateY(6px); }
}

/* ===== MANIFESTO ===== */
.manifesto {
  text-align: center;
  padding: 6rem 4rem;
  position: relative;
  background: var(--bg-warm);
  overflow: hidden;
}
.manifesto::before,
.manifesto::after {
  font-family: var(--serif);
  font-size: 8rem;
  color: rgba(184,134,58,0.08);
  position: absolute;
  z-index: 0;
  line-height: 1;
}
.manifesto::before {
  content: '\201C';
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%) translateX(-340px);
}
.manifesto::after {
  content: '\201D';
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%) translateX(340px);
}
.manifesto-quote {
  font-family: var(--serif);
  font-size: clamp(1.5rem, 2.8vw, 2.2rem);
  font-weight: 300;
  font-style: italic;
  line-height: 1.55;
  max-width: 780px;
  margin: 0 auto 2rem;
  color: var(--text-primary);
  position: relative;
  z-index: 1;
}
.manifesto-attribution {
  font-size: 0.75rem;
  color: var(--gold);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 400;
  position: relative;
  z-index: 1;
}

/* ===== SECTIONS ===== */
section { padding: 8rem 4rem; }
.container { max-width: 1200px; margin: 0 auto; }
.eyebrow {
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 1.5rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.eyebrow::before {
  content: '';
  width: 30px;
  height: 1px;
  background: var(--gold);
}
.section-title {
  font-family: var(--serif);
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 300;
  line-height: 1.15;
  margin-bottom: 1.5rem;
}
.section-title em {
  font-style: italic;
  color: var(--gold);
  font-weight: 400;
}
.section-subtitle {
  font-size: 1.05rem;
  color: var(--text-secondary);
  max-width: 560px;
  line-height: 1.85;
}
.divider {
  width: 50px;
  height: 1px;
  background: var(--gold);
  margin: 2.5rem 0;
}

/* ===== STORY ===== */
.story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}
.story-image {
  width: 100%;
  aspect-ratio: 16/11;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: var(--shadow-soft);
}
.story-body p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.85;
}
.story-body p:first-of-type {
  font-size: 1.1rem;
  color: var(--text-primary);
}

/* ===== METHOD CARDS ===== */
.method-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 4rem;
}
.method-card {
  background: var(--bg-card);
  padding: 3rem 2.5rem;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: var(--shadow-soft);
}
.method-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}
.method-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  opacity: 0.4;
  transition: opacity 0.4s;
}
.method-card:hover::after { opacity: 1; }
.method-num {
  font-family: var(--serif);
  font-size: 3.5rem;
  color: rgba(184,134,58,0.12);
  font-weight: 300;
  line-height: 1;
  margin-bottom: 1.5rem;
}
.method-name {
  font-family: var(--serif);
  font-size: 1.4rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: var(--text-primary);
}
.method-desc {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.8;
}

/* ===== OFFERS ===== */
.offers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 4rem;
}
.work-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.4rem 2rem;
  margin-bottom: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-light);
}
@media (max-width: 600px) {
  .work-stats-grid { grid-template-columns: 1fr; gap: 1.4rem; }
}
.offer-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.4s;
  box-shadow: var(--shadow-soft);
}
.offer-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}
.offer-card.flagship {
  border-color: var(--gold);
  position: relative;
}
.offer-card.flagship::before {
  content: 'FLAGSHIP EXPERIENCE';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: var(--gold);
  color: #fff;
  text-align: center;
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  padding: 0.5rem;
  font-weight: 600;
  border-radius: 8px 8px 0 0;
}
.offer-card.flagship { padding-top: 4.5rem; }
.offer-tier {
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 1rem;
}
.offer-name {
  font-family: var(--serif);
  font-size: 1.7rem;
  font-weight: 400;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}
.offer-price {
  font-family: var(--serif);
  font-size: 2rem;
  color: var(--gold);
  margin-bottom: 1.5rem;
  font-weight: 300;
}
.offer-desc {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 2rem;
  flex-grow: 1;
}
.offer-features {
  list-style: none;
  margin-bottom: 2.5rem;
}
.offer-features li {
  padding: 0.55rem 0;
  font-size: 0.88rem;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-light);
  padding-left: 1.5rem;
  position: relative;
}
.offer-features li::before {
  content: '+';
  position: absolute;
  left: 0;
  color: var(--gold);
  font-weight: 500;
  font-size: 0.9rem;
}
.offer-btn {
  display: block;
  text-align: center;
  padding: 1rem 2rem;
  border: 2px solid var(--gold);
  color: var(--gold);
  text-decoration: none;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: all 0.3s;
  font-weight: 500;
  border-radius: 4px;
  margin-top: auto;
}
.offer-btn:hover {
  background: var(--gold);
  color: #fff;
  border-color: var(--gold);
}
.offer-card.flagship .offer-btn {
  background: var(--gold);
  color: #fff;
  border-color: var(--gold);
}
.offer-card.flagship .offer-btn:hover {
  background: var(--gold-bright);
}

/* ===== TESTIMONIALS ===== */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1000px;
  margin: 4rem auto 0;
}
.testimonial {
  padding: 2.5rem;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  background: var(--bg-card);
  box-shadow: var(--shadow-soft);
  position: relative;
  overflow: hidden;
}
.testimonial::before {
  content: '\201C';
  position: absolute;
  top: 0.8rem;
  right: 1.2rem;
  font-family: var(--serif);
  font-size: 5rem;
  color: rgba(184,134,58,0.06);
  line-height: 1;
  pointer-events: none;
}
.testimonial-text {
  font-family: var(--serif);
  font-size: 1.1rem;
  font-style: italic;
  line-height: 1.8;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}
.testimonial-footer {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.testimonial-photo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(184,134,58,0.2);
}
.testimonial-initial {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid rgba(184,134,58,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--serif);
  font-size: 1.2rem;
  color: var(--gold);
  background: var(--bg-warm);
  flex-shrink: 0;
}
.testimonial-info {
  display: flex;
  flex-direction: column;
}
.testimonial-author {
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  color: var(--text-primary);
  font-weight: 500;
}
.testimonial-role {
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: var(--gold);
  text-transform: uppercase;
}

/* ===== CLOSING QUOTE ===== */
.closing-quote {
  padding: 6rem 4rem;
}
.closing-quote .manifesto-quote {
  padding: 2.5rem 0;
  border-top: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
}

/* ===== CTA SECTION ===== */
.cta-section {
  text-align: center;
  padding: 10rem 4rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(160deg, var(--bg-warm) 0%, var(--bg-accent) 50%, var(--bg-warm) 100%);
}
.cta-inner {
  position: relative;
  z-index: 2;
}
.cta-desc {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 480px;
  margin: 0 auto 3rem;
  line-height: 1.85;
}

/* ===== CTA PROCESS STEPS ===== */
.cta-process {
  display: flex;
  gap: 2.5rem;
  margin: 3rem auto;
  max-width: 700px;
  justify-content: center;
}
.process-step {
  flex: 1;
  text-align: center;
}
.process-num {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1.5px solid var(--gold);
  color: var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--serif);
  font-size: 1.1rem;
  margin: 0 auto 1rem;
  background: rgba(184,134,58,0.04);
}
.process-text {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* ===== FOOTER ===== */
footer {
  padding: 5rem 4rem 3rem;
  border-top: 1px solid var(--border-light);
  text-align: center;
  background: var(--bg-primary);
}
.footer-brand {
  font-family: var(--serif);
  font-size: 1.05rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 2rem;
  font-weight: 400;
}
.footer-nav {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}
.footer-nav a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  transition: color 0.3s;
}
.footer-nav a:hover { color: var(--gold); }
.footer-social {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
}
.footer-social a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  transition: color 0.3s;
}
.footer-social a:hover { color: var(--gold); }
.footer-tagline {
  font-family: var(--serif);
  font-style: italic;
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
}
.footer-top-link {
  display: inline-block;
  margin-bottom: 2rem;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.3s;
}
.footer-top-link:hover { color: var(--gold); }
.footer-legal {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}
.footer-legal a {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: color 0.3s;
}
.footer-legal a:hover { color: var(--gold); }
.footer-copy {
  font-size: 0.72rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

/* ===== ANIMATIONS ===== */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }

/* ===== GWR FEATURE SECTION ===== */
.gwr-section {
  background: var(--bg-accent);
  padding: 5rem 4rem;
  text-align: center;
}
.gwr-inner {
  max-width: 900px;
  margin: 0 auto;
}
.gwr-badge {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: rgba(184,134,58,0.08);
  border: 1.5px solid var(--gold);
  border-radius: 12px;
  padding: 1.25rem 2.5rem;
  margin-bottom: 2.5rem;
}
.gwr-badge-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.gwr-badge-icon svg {
  width: 32px;
  height: 32px;
  fill: var(--bg-primary);
}
.gwr-badge-text {
  text-align: left;
}
.gwr-badge-label {
  font-family: var(--sans);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.2rem;
}
.gwr-badge-title {
  font-family: var(--serif);
  font-size: 1.15rem;
  color: var(--text-primary);
  font-weight: 400;
}
.gwr-headline {
  font-family: var(--serif);
  font-size: clamp(2rem, 3.5vw, 3rem);
  color: var(--text-primary);
  font-weight: 300;
  line-height: 1.25;
  margin-bottom: 1.5rem;
}
.gwr-desc {
  font-family: var(--sans);
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.8;
  max-width: 650px;
  margin: 0 auto 2rem;
}
.gwr-link {
  display: inline-block;
  font-family: var(--sans);
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  color: var(--gold);
  text-decoration: none;
  border-bottom: 1px solid rgba(184,134,58,0.3);
  padding-bottom: 2px;
  transition: border-color 0.3s;
}
.gwr-link:hover {
  border-color: var(--gold);
}
.gwr-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
}
.gwr-stat {
  text-align: center;
}
.gwr-stat-value {
  font-family: var(--serif);
  font-size: 2.2rem;
  color: var(--text-primary);
  font-weight: 300;
}
.gwr-stat-label {
  font-family: var(--sans);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-top: 0.25rem;
}

/* ===== WRITING SECTION ===== */
.writing-filters {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin: 2rem 0 2.5rem;
}
.writing-filter-btn {
  font-family: var(--sans);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  padding: 0.6rem 1.4rem;
  border: 1px solid var(--border-light);
  border-radius: 100px;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s;
}
.writing-filter-btn:hover {
  border-color: var(--gold);
  color: var(--gold);
}
.writing-filter-btn.active {
  background: var(--gold);
  color: #fff;
  border-color: var(--gold);
}

/* Essay Rows — The Long Read layout */
.essay-grid {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border-light);
}
.essay-card {
  display: grid;
  grid-template-columns: 44% 1fr;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  border-bottom: 1px solid var(--border-light);
  cursor: default;
  overflow: hidden;
  transition: none;
}
.essay-card:nth-child(even) {
  grid-template-columns: 1fr 44%;
}
.essay-card:nth-child(even) .essay-card-img {
  grid-column: 2;
  grid-row: 1;
}
.essay-card:nth-child(even) .essay-card-text {
  grid-column: 1;
  grid-row: 1;
}
.essay-card-img {
  overflow: hidden;
  position: relative;
}
.essay-card-img img {
  width: 100%;
  height: 100%;
  min-height: 260px;
  object-fit: cover;
  display: block;
  filter: brightness(0.85);
  transition: transform 0.6s ease;
}
.essay-card:hover .essay-card-img img {
  transform: scale(1.04);
}
.essay-card-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 3.5rem;
}
.essay-tag {
  display: inline-block;
  font-family: var(--sans);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 500;
  margin-bottom: 0.7rem;
}
.essay-card-text h4 {
  font-family: var(--serif);
  font-size: 1.45rem;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.25;
  margin-bottom: 1rem;
}
.essay-card-text p {
  font-family: var(--sans);
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 1.4rem;
}
.essay-meta {
  font-family: var(--sans);
  font-size: 0.72rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  margin-bottom: 1.2rem;
}
.essay-read-link {
  display: inline-block;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.2s;
}
.essay-read-link:hover { opacity: 0.7; }
.essay-coming-soon {
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 400;
}
.essay-toggle-btn {
  font-family: var(--sans);
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.8rem 2.5rem;
  background: transparent;
  color: var(--gold);
  border: 1px solid var(--gold);
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}
.essay-toggle-btn:hover {
  background: var(--gold);
  color: #fff;
}
@media (max-width: 900px) {
  .essay-card,
  .essay-card:nth-child(even) {
    grid-template-columns: 1fr;
  }
  .essay-card:nth-child(even) .essay-card-img {
    grid-column: 1;
    grid-row: 1;
  }
  .essay-card:nth-child(even) .essay-card-text {
    grid-column: 1;
    grid-row: 2;
  }
  .essay-card-img img { min-height: 200px; }
  .essay-card-text { padding: 2rem 2rem; }
}

/* ===== CONDENSED ABOUT STRIP ===== */
.about-strip {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem 2rem;
  padding: 1.5rem 0;
}
.about-strip-item {
  font-family: var(--sans);
  font-size: 0.82rem;
  color: var(--text-secondary);
  letter-spacing: 0.04em;
}
.about-strip-item strong {
  color: var(--gold);
  font-weight: 500;
}

/* ===== WENDY MARQUEE ===== */
.wendy-marquee {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  overflow: hidden;
  max-width: 1000px;
  margin: 3.5rem auto 0;
  box-shadow: 0 8px 48px rgba(44,37,32,0.10);
}
.wendy-player-col {
  flex-shrink: 0;
  width: 220px;
}
.wendy-player {
  position: relative;
  width: 220px;
  aspect-ratio: 9/16;
  background: #1a1410;
  overflow: hidden;
  cursor: pointer;
}
.wendy-player video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}
.wendy-cover {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1410;
  transition: opacity 0.4s ease;
  z-index: 2;
}
.wendy-cover.hidden { opacity: 0; pointer-events: none; }
.wendy-cover img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}
.wendy-cover::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10,8,5,0.15) 0%, rgba(10,8,5,0.4) 100%);
  z-index: 1;
}
.wendy-play-btn {
  position: relative;
  z-index: 2;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}
.wendy-play-btn:hover { transform: scale(1.08); background: var(--gold-bright); }
.wendy-play-btn svg {
  width: 18px;
  height: 18px;
  fill: white;
  margin-left: 3px;
}
.wendy-pulse {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 2px solid var(--gold);
  opacity: 0;
  animation: wendyPulse 2.2s ease-out infinite;
  z-index: 1;
}
.wendy-pulse-2 {
  inset: -16px;
  animation-delay: 0.7s;
}
.wendy-pulse-3 {
  inset: -26px;
  animation-delay: 1.4s;
}
@keyframes wendyPulse {
  0%   { transform: scale(0.95); opacity: 0.7; }
  100% { transform: scale(1.4);  opacity: 0; }
}
.wendy-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255,255,255,0.12);
  z-index: 3;
}
.wendy-progress-fill {
  height: 100%;
  width: 0%;
  background: var(--gold);
  transition: width 0.3s linear;
  border-radius: 0 2px 2px 0;
}
.wendy-time {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 0.65rem;
  color: rgba(255,255,255,0.6);
  font-family: var(--sans);
  z-index: 3;
  letter-spacing: 0.04em;
  background: rgba(0,0,0,0.3);
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
}
.wendy-quote-col {
  flex: 1;
  padding: 2.5rem 2.5rem 2.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 390px;
}
.wendy-badge {
  display: inline-block;
  font-family: var(--sans);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold);
  border: 1px solid rgba(184,134,58,0.3);
  background: rgba(184,134,58,0.06);
  border-radius: 3px;
  padding: 0.25rem 0.7rem;
  margin-bottom: 1.25rem;
  width: fit-content;
}
.wendy-quote-text {
  font-family: var(--serif);
  font-size: 1.15rem;
  font-style: italic;
  line-height: 1.85;
  color: var(--text-primary);
  margin-bottom: 1.75rem;
}
.wendy-person {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1rem;
}
.wendy-thumb {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center center;
  border: 2px solid rgba(184,134,58,0.25);
  flex-shrink: 0;
}
.wendy-name {
  display: block;
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--text-primary);
}
.wendy-role {
  display: block;
  font-size: 0.68rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--gold);
}
.wendy-cta-hint {
  font-family: var(--sans);
  font-size: 0.78rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  margin-top: 0.25rem;
}
.wendy-cta-hint svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: var(--gold);
  stroke-width: 2;
}
.more-voices-label {
  text-align: center;
  font-family: var(--sans);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 3rem 0 0;
}

/* ===== VIDEO TESTIMONIAL MINI CARDS ===== */
.video-testimonials-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1000px;
  margin: 2rem auto 0;
}
.video-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  display: flex;
  flex-direction: column;
}
.video-card-player {
  position: relative;
  width: 100%;
  aspect-ratio: 9/16;
  background: #1a1410;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
}
.video-card-player video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}
.video-card-cover {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.4s ease;
  z-index: 2;
}
.video-card-cover.hidden { opacity: 0; pointer-events: none; }
.video-card-cover img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}
.video-card-cover::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10,8,5,0.1) 0%, rgba(10,8,5,0.45) 100%);
  z-index: 1;
}
.video-card-play {
  position: relative;
  z-index: 2;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}
.video-card-play:hover { transform: scale(1.08); }
.video-card-play svg {
  width: 16px;
  height: 16px;
  fill: white;
  margin-left: 3px;
  position: relative;
  z-index: 3;
}
.video-card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}
.video-card-content .testimonial-text {
  font-size: 0.95rem;
  margin-bottom: 0;
}
.video-card-content .wendy-badge { margin-bottom: 0; }
.video-card-content .wendy-cta-hint { margin-top: 0.25rem; }
@media (max-width: 700px) {
  .video-testimonials-row { grid-template-columns: 1fr; }
}
@media (max-width: 700px) {
  .wendy-marquee { flex-direction: column; border-radius: 10px; }
  .wendy-player-col { width: 100%; }
  .wendy-player { width: 100%; aspect-ratio: 9/16; max-height: 360px; }
  .wendy-quote-col { padding: 1.75rem; min-height: unset; }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  section { padding: 6rem 2.5rem; }
  #navbar { padding: 1.2rem 2rem; }
  .nav-links { display: none; }
  .nav-hamburger { display: flex; }
  .hero { height: auto; max-height: none; min-height: 75vh; background-position: 65% center; }
  .hero::before { background: linear-gradient(180deg, rgba(10,8,5,0.7) 0%, rgba(10,8,5,0.4) 60%, rgba(10,8,5,0.6) 100%); }
  .hero-content {
    padding: 6rem 2.5rem 3rem;
  }
  .hero-text { max-width: 100%; }
  .hero-scroll { display: none; }
  .story-grid { grid-template-columns: 1fr; gap: 3rem; }
  .method-grid { grid-template-columns: 1fr; }
  .offers-grid { grid-template-columns: 1fr; max-width: 500px; }
  .testimonials-grid { grid-template-columns: 1fr; max-width: 500px; }
  .cta-process { flex-direction: column; gap: 1.5rem; }
}
@media (max-width: 900px) {
  .essay-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .gwr-section { padding: 3rem 1.5rem; }
  .gwr-badge { padding: 1rem 1.5rem; flex-direction: column; text-align: center; }
  .gwr-badge-text { text-align: center; }
  .gwr-stats { gap: 2rem; }
  .hero-credentials { justify-content: center; gap: 0.75rem; }
  .writing-filters { justify-content: center; }
}
@media (max-width: 600px) {
  section { padding: 4rem 1.5rem; }
  .hero { min-height: 65vh; background-position: 60% center; }
  .hero-content { padding: 5rem 1.5rem 2rem; }
  .hero-credentials { gap: 0.8rem; flex-wrap: wrap; justify-content: center; }
  .hero-actions { flex-direction: column; align-items: flex-start; }
  .manifesto { padding: 4rem 1.5rem; }
  .nav-hamburger { min-width: 44px; min-height: 44px; }
  .essay-grid { grid-template-columns: 1fr; }
  .gwr-stats { flex-direction: column; gap: 1.5rem; }
}
@media (max-width: 480px) {
  .gwr-stats { flex-direction: column; gap: 1.5rem; }
}
</style>
</head>
<body>

<!-- ===================== NAVIGATION ===================== -->
<nav id="navbar">
  <a href="#" class="nav-logo">Greg Pignataro</a>
  <ul class="nav-links">
    <li><a href="#who">Is This You</a></li>
    <li><a href="#method">The Three Phases</a></li>
    <li><a href="#story">The Story</a></li>
    <li><a href="#beliefs">What I Believe</a></li>
    <li><a href="#work">Work With Greg</a></li>
    <li><a href="#writing">The Writing</a></li>
  </ul>
  <a href="#apply" class="nav-cta">Book a Call</a>
  <div class="nav-hamburger" onclick="this.classList.toggle('open'); document.querySelector('.nav-links').classList.toggle('mobile-open');">
    <span></span><span></span><span></span>
  </div>
</nav>

<!-- ===================== HERO ===================== -->
<section class="hero">
  <div class="hero-content">
    <div class="hero-text">
      <p class="hero-eyebrow">For the ones who have tried everything</p>
      <h1 class="hero-title">Come home <em>to yourself.</em></h1>
      <p class="hero-subtitle">Greg helps people stop believing the quiet sentence that has been running the show their whole life: <em>I am not good enough.</em> The body or the mind is your entry point. The work underneath is the same.</p>
      <div class="hero-actions">
        <a href="#apply" class="btn-primary">Book a Conversation</a>
        <a href="#who" class="btn-ghost">See If This Is You</a>
      </div>
      <div class="hero-credentials">
        <span class="hero-cred-item"><span class="hero-cred-dot"></span>Guinness World Record Holder</span>
        <span class="hero-cred-item"><span class="hero-cred-dot"></span>Gabor Mat&eacute; Trained</span>
        <span class="hero-cred-item"><span class="hero-cred-dot"></span>Division I Athlete</span>
        <span class="hero-cred-item"><span class="hero-cred-dot"></span>BA Psychology</span>
        <span class="hero-cred-item"><span class="hero-cred-dot"></span>Necker Island Retreat Facilitator</span>
      </div>
    </div>
  </div>
  <div class="hero-scroll">
    <div class="hero-scroll-chevron"></div>
  </div>
</section>

<!-- ===================== GUINNESS WORLD RECORD FEATURE ===================== -->
<section class="gwr-section">
  <div class="gwr-inner reveal">
    <div class="gwr-badge">
      <div class="gwr-badge-icon">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
      </div>
      <div class="gwr-badge-text">
        <div class="gwr-badge-label">Official Guinness World Records&reg; Title Holder</div>
        <div class="gwr-badge-title">Most Nordic Hamstring Curls in One Minute</div>
      </div>
    </div>
    <h2 class="gwr-headline">Your coach does not just talk about <em>doing the work.</em></h2>
    <p class="gwr-desc">Doctors told Greg he would never fully recover from a torn ACL at eighteen and a broken back. He did not argue. He went to work. Two decades later he holds a Guinness World Record in the exact exercise his body was never supposed to do. The record is not the point. The point is what he learned in the work that nobody teaching the work was saying out loud. Your body is not a project. It is the way home.</p>
    <a href="https://www.guinnessworldrecords.com/world-records/722570-most-nordic-hamstring-curls-in-one-minute" target="_blank" rel="noopener" class="gwr-link">View Official Record &rarr;</a>
    <div class="gwr-stats">
      <div class="gwr-stat">
        <div class="gwr-stat-value">D1</div>
        <div class="gwr-stat-label">NCAA Athlete, Marquette</div>
      </div>
      <div class="gwr-stat">
        <div class="gwr-stat-value">20+</div>
        <div class="gwr-stat-label">Years of Practice</div>
      </div>
      <div class="gwr-stat">
        <div class="gwr-stat-value">1,000+</div>
        <div class="gwr-stat-label">Hours of Meditation</div>
      </div>
      <div class="gwr-stat">
        <div class="gwr-stat-value">13</div>
        <div class="gwr-stat-label">Days in Darkness &amp; Silence</div>
      </div>
    </div>
  </div>
</section>

<!-- ===================== IS THIS YOU ===================== -->
<section id="who" style="background: var(--bg-warm);">
  <div class="container">
    <div class="story-grid">
      <div class="reveal">
        <img src="images/headshots/greg_warm_connect.jpg" alt="Greg Pignataro" class="story-image" loading="lazy">
      </div>
      <div class="story-body reveal reveal-delay-1">
        <p class="eyebrow">Is This You</p>
        <h2 class="section-title">You have done <em>everything right.</em><br>So why does something still feel off?</h2>
        <div class="divider"></div>
        <p>If you have been high performing long enough to build a life most people would envy, and you are now somewhere in the middle of a transition nobody prepared you for (a divorce, a sale, a retirement, a last child leaving, a diagnosis, a reckoning), there are probably three sentences you have said out loud to a friend, or to a therapist, or to the ceiling at three in the morning.</p>
        <div style="margin-top: 2.5rem; display: flex; flex-direction: column; gap: 1.8rem;">
          <div>
            <p style="font-family: var(--serif); font-size: 1.55rem; line-height: 1.4; font-style: italic; color: var(--text-primary);">&ldquo;I feel like I should be further along by now.&rdquo;</p>
            <p style="margin-top: 0.5rem; color: var(--gold); font-family: var(--sans); font-size: 0.95rem;">That is not a goal. That is a verdict you already delivered on yourself.</p>
          </div>
          <div>
            <p style="font-family: var(--serif); font-size: 1.55rem; line-height: 1.4; font-style: italic; color: var(--text-primary);">&ldquo;What is wrong with me that I can&rsquo;t just be happy?&rdquo;</p>
            <p style="margin-top: 0.5rem; color: var(--gold); font-family: var(--sans); font-size: 0.95rem;">Nothing. You are asking the wrong question.</p>
          </div>
          <div>
            <p style="font-family: var(--serif); font-size: 1.55rem; line-height: 1.4; font-style: italic; color: var(--text-primary);">&ldquo;Is this all there is?&rdquo;</p>
            <p style="margin-top: 0.5rem; color: var(--gold); font-family: var(--sans); font-size: 0.95rem;">No. But the thing you are missing is not something you need to acquire.</p>
          </div>
        </div>
        <p style="margin-top: 2rem;">If you want a quick fix, a meal plan, a new morning routine, a program that promises you will finally feel like yourself again in ninety days, there are a thousand of those. This is not one of them. This is for people who have already tried those and can feel in their body that the next thing cannot be more of the same.</p>
      </div>
    </div>
  </div>
</section>

<!-- ===================== SANTA CLAUS ANALOGY ===================== -->
<section class="manifesto reveal" style="background: var(--bg-primary);">
  <p style="text-align: center; font-family: var(--sans); font-size: 0.78rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin: 0 auto 1.4rem; max-width: 860px;">The Santa Claus Principle</p>
  <p class="manifesto-quote">&ldquo;Most health programs are trying to help Santa Claus eat fewer cookies. Better macros. Smarter training. Cleaner sleep habits. The belief that your body has to look a certain way to be worthy of love. <em>That is Santa Claus.</em>&rdquo;</p>
  <p class="manifesto-attribution">Greg Pignataro</p>
</section>

<!-- ===================== MONSTERS INC PRINCIPLE ===================== -->
<section class="manifesto reveal" style="background: var(--bg-warm);">
  <p style="text-align: center; font-family: var(--sans); font-size: 0.78rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin: 0 auto 1.4rem; max-width: 860px;">The Monsters Inc. Principle</p>
  <p class="manifesto-quote">&ldquo;In Monsters, Inc. the whole city ran on screams. Then Sulley heard one little girl laugh and the power grid nearly blew. One laugh made magnitudes more energy than a lifetime of screams. They shut the scare factory down and rebuilt the grid on joy. The wellness industry is still running the scare factory. Shame for your body. Fear of aging. The quiet belief that if you stop performing you will not be loved. It works for a while because fear is loud. But love is magnitudes more powerful. <em>Safety changes a nervous system in a way no amount of willpower ever can.</em>&rdquo;</p>
  <p class="manifesto-attribution">Greg Pignataro</p>
</section>

<!-- ===================== THE THREE PHASES ===================== -->
<section id="method" style="background: var(--bg-primary);">
  <div class="container">
    <p class="eyebrow reveal">The Map</p>
    <h2 class="section-title reveal">Three phases. Most people<br>get stuck in the <em>first two.</em></h2>
    <p class="section-subtitle reveal">There is an old Zen saying. Before enlightenment, mountains are mountains and rivers are rivers. Then, mountains are no longer mountains and rivers are no longer rivers. Finally, mountains are mountains and rivers are rivers once more. It is the cleanest description of what actually happens when a person does this work.</p>
    <div class="method-grid">
      <div class="method-card reveal">
        <div class="method-num">01</div>
        <div class="method-name">Mountains are mountains.</div>
        <div class="method-desc">You chase the body, the career, the right identity. You optimize. You achieve. You believe that if you can just get the outside right, the inside will follow. For a while, it works. Then it stops working, and you do not know why. This is where most of the self development industry lives.</div>
      </div>
      <div class="method-card reveal reveal-delay-1">
        <div class="method-num">02</div>
        <div class="method-name">Mountains are no longer mountains.</div>
        <div class="method-desc">Something cracks. A divorce. A sale. A ceremony. A dark night. The identity you built your life around dissolves. Everything you believed is up for review. This is the moment most spiritual teachers are happy to keep you in. This is where most people get stranded.</div>
      </div>
      <div class="method-card reveal reveal-delay-2">
        <div class="method-num">03</div>
        <div class="method-name">Mountains are mountains once more.</div>
        <div class="method-desc">You come home. The body is a body again, but you love it. You have preferences, not compulsions. You care for yourself because it feels good, not because you are afraid of what happens if you stop. You want things without needing them. This is where the work is actually going.</div>
      </div>
    </div>
    <p class="reveal" style="text-align: center; margin-top: 3rem; font-family: var(--serif); font-size: 1.35rem; font-style: italic; color: var(--text-secondary); max-width: 760px; margin-left: auto; margin-right: auto; line-height: 1.5;">Most coaches live in phase one. Most spiritual teachers live in phase two. Almost nobody is pointing at phase three. <span style="color: var(--gold);">That is the work.</span></p>
  </div>
</section>

<!-- ===================== GREG'S STORY ===================== -->
<section id="story" style="background: var(--bg-warm);">
  <div class="container">
    <div class="story-grid">
      <div class="story-body reveal">
        <p class="eyebrow">His Story</p>
        <h2 class="section-title">He walked through it <em>first.</em></h2>
        <div class="divider"></div>
        <p>In February 2020, Greg was on a phone call with a close friend when something happened he had no framework for. Ten thousand pounds lifted. Decades of ambient anxiety, the quiet voice of not enough, the background weight of being a person, all of it went quiet at once. He had grown up atheist. He was not meditating. He had not read the books. It just happened. And instead of turning it into a brand, he spent the next five years actually doing the work.</p>
        <p style="margin-top: 1rem;">That work looked like meditating every day for three years without missing a day. It looked like excavating childhood wounds he had spent decades not looking at. It looked like deliberately gaining twenty pounds to prove to himself that he did not need a six pack to be lovable. It looked like eight days alone in total darkness, five days in total silence, dozens of ceremonies, hundreds of pages of journaling, and a long slow unraveling of every identity he had built his life on top of.</p>
        <p style="margin-top: 1rem;">At the peak of his personal training career, Greg was earning over ten thousand dollars a month working twenty hours a week with clients he loved. He walked away from it. Not because it stopped working. Because it was not true enough. He is not guessing about what it takes to rebuild a life from the inside. He did it. He is still doing it. That is the point.</p>
        <div class="about-strip" style="margin-top: 2rem; border-top: 1px solid var(--border-light); padding-top: 1.5rem;">
          <span class="about-strip-item"><strong>BA Psychology</strong> Carthage College</span>
          <span class="about-strip-item"><strong>Compassionate Inquiry</strong> Dr. Gabor Mat&eacute;</span>
          <span class="about-strip-item"><strong>CSCS</strong> Nat'l Strength &amp; Conditioning</span>
          <span class="about-strip-item"><strong>NeuFit</strong> Certified Practitioner</span>
          <span class="about-strip-item"><strong>ATG</strong> Certified Coach</span>
          <span class="about-strip-item"><strong>Necker Island</strong> Retreat Facilitator</span>
        </div>
      </div>
      <div class="reveal reveal-delay-1">
        <img src="images/headshots/greg_speaking_gesture.jpg" alt="Greg Pignataro speaking" class="story-image" loading="lazy">
      </div>
    </div>
  </div>
</section>

<!-- ===================== QUOTE DIVIDER ===================== -->
<section class="manifesto reveal">
  <p class="manifesto-quote">&ldquo;Identity and the belief in separation are the root of most human suffering. I have worked with both in every dimension of my own life. I can help you do the same.&rdquo;</p>
  <p class="manifesto-attribution">Greg Pignataro</p>
</section>

<!-- ===================== WHAT I ACTUALLY BELIEVE ===================== -->
<section id="beliefs" style="background: var(--bg-accent);">
  <div class="container">
    <p class="eyebrow reveal">What I Actually Believe</p>
    <h2 class="section-title reveal">Three things most people in this<br>work will never say <em>out loud.</em></h2>
    <p class="section-subtitle reveal">Greg spent six years inside the fitness and wellness industry before walking out the door. He is not criticizing it from the outside. He is a whistleblower from inside the room.</p>

    <div class="method-grid">
      <div class="method-card reveal">
        <div class="method-num">I</div>
        <div class="method-name">You do not need to find your purpose. You need to embrace purposelessness.</div>
        <div class="method-desc">The self help industry has made a billion dollar religion out of &ldquo;finding your purpose.&rdquo; It is a trap. True freedom is realizing you do not have one, and never did. Once you have met the fear underneath that realization, you are finally free to build and pursue anything you want. Not from need. From choice.</div>
      </div>
      <div class="method-card reveal reveal-delay-1">
        <div class="method-num">II</div>
        <div class="method-name">The wellness industry is teaching you to abuse yourself in a socially acceptable way.</div>
        <div class="method-desc">Fear, shame, and guilt are the water the fitness, medical, and wellness industries are blindly swimming in. They call it discipline. They call it accountability. They call it tough love. It is self disconnection wearing a sports bra. I was inside that industry for six years. I built a business inside it. I am not criticizing it from the outside. I am a whistleblower.</div>
      </div>
      <div class="method-card reveal reveal-delay-2">
        <div class="method-num">III</div>
        <div class="method-name">Most spiritual teachers will strand you halfway.</div>
        <div class="method-desc">The non dual teachers I admire will take you to the place where everything dissolves and leave you there. The new age teachers will dress that same halfway point up in language about &ldquo;higher selves&rdquo; and &ldquo;ascension&rdquo; and &ldquo;soul contracts.&rdquo; I love some of those teachers. I am not one of them. The work is not to leave the body and live in the clouds. The work is to come home to the body and love it without needing it to be anything other than what it is.</div>
      </div>
    </div>

    <!-- Safety positioning -->
    <div class="reveal" style="margin-top: 4rem; padding: 2.5rem 2rem; background: var(--bg-warm); border-left: 3px solid var(--gold); max-width: 820px; margin-left: auto; margin-right: auto;">
      <p style="font-family: var(--serif); font-size: 1.4rem; line-height: 1.5; font-style: italic; color: var(--text-primary); margin-bottom: 1rem;">A note on safety.</p>
      <p style="font-family: var(--sans); font-size: 1rem; line-height: 1.7; color: var(--text-secondary);">The deeper work attracts practitioners who are not well. Greg is not one of them. Two decades of credentialed practice. A Guinness World Record earned through discipline, not charisma. Training under Dr. Gabor Mat&eacute;. Facilitation at Richard Branson&rsquo;s Necker Island retreats. He is one of the very rare practitioners in this space who is not a wolf in the hen house. You will be met with presence, competence, and care. Nothing more. Nothing less.</p>
    </div>
  </div>
</section>

<!-- ===================== SOCIAL PROOF ===================== -->
<section style="background: var(--bg-primary);">
  <div class="container">
    <p class="eyebrow reveal" style="justify-content: center;">Real Results</p>
    <h2 class="section-title reveal" style="text-align: center;">From people who stopped <em>pretending.</em></h2>
    <p class="section-subtitle reveal" style="text-align: center;">These are not case studies. They are people who walked into a room looking for one thing and walked out having found something they did not know they were missing.</p>

    <!-- ===== WENDY STARLAND FEATURED VIDEO TESTIMONIAL ===== -->
    <div class="wendy-marquee reveal">
      <div class="wendy-player-col">
        <div class="wendy-player" id="wendyPlayerWrap" onclick="wendyToggle()">
          <video id="wendyVideo" playsinline preload="none">
            <source src="videos/wendy-starland.mov" type="video/quicktime">
          </video>
          <div class="wendy-cover" id="wendyCover">
            <img src="images/testimonials/wendy-cover.jpg" alt="Wendy Starland" loading="lazy">
            <div class="wendy-play-btn" id="wendyPlayBtn">
              <span class="wendy-pulse"></span>
              <span class="wendy-pulse wendy-pulse-2"></span>
              <span class="wendy-pulse wendy-pulse-3"></span>
              <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
            </div>
          </div>
          <div class="wendy-progress" id="wendyProgressBar">
            <div class="wendy-progress-fill" id="wendyProgressFill"></div>
          </div>
          <span class="wendy-time" id="wendyTime">1:14</span>
        </div>
      </div>
      <div class="wendy-quote-col">
        <span class="wendy-badge">Video Testimonial</span>
        <p class="wendy-quote-text">"He put electrodes on the back of my neck and at the bottom of my feet and I felt a current wash through me that created all of this alignment within my body. He is a consummate professional and I recommend him with my highest recommendation."</p>
        <div class="wendy-person">
          <img class="wendy-thumb" src="images/testimonials/wendy-avatar.jpg" alt="Wendy Starland" loading="lazy">
          <div>
            <span class="wendy-name">Wendy Starland</span>
            <span class="wendy-role">Grammy-Winning Music Producer &middot; Discovered Lady Gaga</span>
          </div>
        </div>
        <p class="wendy-cta-hint" onclick="wendyToggle()">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16"/></svg>
          Watch her full story &nbsp;&bull;&nbsp; 1 min 14 sec
        </p>
      </div>
    </div>

    <p class="more-voices-label reveal">More from the people Greg has worked with</p>

    <!-- Video testimonial mini-cards: Lee + Ray -->
    <div class="video-testimonials-row">

      <!-- LEE RICHTER -->
      <div class="video-card reveal" id="leeCardWrap">
        <div class="video-card-player" onclick="videoCardToggle('lee')">
          <video id="leeVideo" playsinline preload="none">
            <source src="videos/lee-richter.mp4" type="video/mp4">
          </video>
          <div class="video-card-cover" id="leeCover">
            <img src="images/testimonials/lee-cover.jpg" alt="Lee Richter" loading="lazy">
            <div class="video-card-play">
              <span class="wendy-pulse"></span>
              <span class="wendy-pulse wendy-pulse-2"></span>
              <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
            </div>
          </div>
          <div class="wendy-progress"><div class="wendy-progress-fill" id="leeProgressFill"></div></div>
          <span class="wendy-time" id="leeTime">2:00</span>
        </div>
        <div class="video-card-content">
          <span class="wendy-badge">Video Testimonial</span>
          <p class="testimonial-text">"Within 24 hours my knee felt so much better. He is genuine in his way of wanting to help people. My entire vacation was saved because I was able to participate instead of staying on the sidelines."</p>
          <div class="testimonial-footer">
            <img class="testimonial-photo" src="images/testimonials/lee-avatar.jpg" alt="Lee Richter" loading="lazy">
            <div class="testimonial-info">
              <span class="testimonial-author">Lee Richter</span>
              <span class="testimonial-role">CEO, Pinnacle Global Network &middot; San Francisco</span>
            </div>
          </div>
          <p class="wendy-cta-hint" onclick="videoCardToggle('lee')">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16"/></svg>
            Watch her full story &nbsp;&bull;&nbsp; 2 min
          </p>
        </div>
      </div>

      <!-- RAY TAGGART -->
      <div class="video-card reveal reveal-delay-1" id="rayCardWrap">
        <div class="video-card-player" onclick="videoCardToggle('ray')">
          <video id="rayVideo" playsinline preload="none">
            <source src="videos/ray-taggart.mp4" type="video/mp4">
          </video>
          <div class="video-card-cover" id="rayCover">
            <img src="images/testimonials/ray-cover.jpg" alt="Ray Taggart" loading="lazy">
            <div class="video-card-play">
              <span class="wendy-pulse"></span>
              <span class="wendy-pulse wendy-pulse-2"></span>
              <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
            </div>
          </div>
          <div class="wendy-progress"><div class="wendy-progress-fill" id="rayProgressFill"></div></div>
          <span class="wendy-time" id="rayTime">1:32</span>
        </div>
        <div class="video-card-content">
          <span class="wendy-badge">Video Testimonial</span>
          <p class="testimonial-text">"I did a backward lunge — it always gives me pain every single time. We put the pads on and it was amazing. I actually had zero pain. My brain recalculated what this injury is. He has such a heart for humans."</p>
          <div class="testimonial-footer">
            <img class="testimonial-photo" src="images/testimonials/ray-avatar.jpg" alt="Ray Taggart" loading="lazy">
            <div class="testimonial-info">
              <span class="testimonial-author">Ray Taggart</span>
              <span class="testimonial-role">Co-Founder, Evolved Podcasting &middot; Performer</span>
            </div>
          </div>
          <p class="wendy-cta-hint" onclick="videoCardToggle('ray')">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16"/></svg>
            Watch his full story &nbsp;&bull;&nbsp; 1 min 32 sec
          </p>
        </div>
      </div>

    </div>

    <div class="testimonials-grid">
      <div class="testimonial reveal">
        <p class="testimonial-text">"I have spent my entire career studying the body. Greg showed me the one thing I was missing: that the body does not just store pain, it stores the conversations you have been too afraid to have. One session changed how I approach everything."</p>
        <div class="testimonial-footer">
          <img class="testimonial-photo" loading="lazy" src="images/testimonials/anthony.jpg" alt="Anthony Balduzzi">
          <div class="testimonial-info">
            <span class="testimonial-author">Anthony Balduzzi</span>
            <span class="testimonial-role">Founder, Fit Father Project</span>
          </div>
        </div>
      </div>
      <div class="testimonial reveal reveal-delay-1">
        <p class="testimonial-text">"I walked in skeptical. I am an analytical person and this sounded too abstract. Within an hour Greg helped me access something I had been suppressing for over a decade. My shoulders dropped, my breathing changed, and I felt a stillness I did not know was possible."</p>
        <div class="testimonial-footer">
          <img class="testimonial-photo" loading="lazy" src="images/testimonials/rahul.jpg" alt="Rahul S.">
          <div class="testimonial-info">
            <span class="testimonial-author">Rahul S.</span>
            <span class="testimonial-role">Restaurateur</span>
          </div>
        </div>
      </div>
      <div class="testimonial reveal reveal-delay-2">
        <p class="testimonial-text">"I thought I had dealt with everything. Built the business, stayed in shape, checked every box. Greg helped me see that the thing I was running from was not behind me. It was living in my chest. The afternoon I stopped running was the best afternoon of my life."</p>
        <div class="testimonial-footer">
          <img class="testimonial-photo" loading="lazy" src="images/testimonials/john.jpg" alt="John Guldan">
          <div class="testimonial-info">
            <span class="testimonial-author">John Guldan</span>
            <span class="testimonial-role">Entrepreneur</span>
          </div>
        </div>
      </div>
      <div class="testimonial reveal reveal-delay-3">
        <p class="testimonial-text">"Greg does not give you advice. He does not coach you through a framework. He puts you in your body and lets you feel the truth that has been waiting there. I have worked with a lot of people in the personal development space. Nobody works like this."</p>
        <div class="testimonial-footer">
          <img class="testimonial-photo" loading="lazy" src="images/testimonials/james.jpg" alt="James Guldan">
          <div class="testimonial-info">
            <span class="testimonial-author">James Guldan</span>
            <span class="testimonial-role">Entrepreneur</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===================== WORK WITH GREG ===================== -->
<section id="work" style="background: var(--bg-warm);">
  <div class="container">
    <p class="eyebrow reveal">Work With Greg</p>
    <h2 class="section-title reveal">The goal is not to keep you.<br>The goal is to give you back <em>to yourself.</em></h2>
    <p class="section-subtitle reveal">Most of this industry is built on keeping you paying. Memberships. Next levels. Advanced tiers. Greg is not building that. He works with a small number of people at a time, does the real work fast, and expects you to eventually walk away on your own feet. That is the whole point.</p>

    <div class="reveal" style="max-width: 780px; margin: 3rem auto 0; background: var(--bg-card); padding: 3rem 2.5rem; border: 1px solid var(--border-light); box-shadow: var(--shadow-soft);">
      <p style="font-family: var(--sans); text-transform: uppercase; letter-spacing: 0.18em; font-size: 0.72rem; color: var(--gold); margin-bottom: 1rem;">Private Engagements</p>
      <h3 style="font-family: var(--serif); font-size: 2.2rem; line-height: 1.2; color: var(--text-primary); margin-bottom: 1.2rem;">Every engagement is built<br><em>around the person.</em></h3>
      <p style="font-family: var(--sans); color: var(--text-secondary); line-height: 1.75; margin-bottom: 1.2rem;">Greg does not run a three tier funnel. He works with four to six private clients at a time and designs each engagement from scratch based on where you are, what is actually running the show, and what the work needs to look like to meet you there.</p>
      <p style="font-family: var(--sans); color: var(--text-secondary); line-height: 1.75; margin-bottom: 1.2rem;">Past engagements have included single day private intensives, weekend retreats, twelve month containers with weekly sessions, in person travel days, and facilitation at private retreats including Richard Branson&rsquo;s Necker Island. Pricing ranges from a single session at $750 to twelve month containers starting at $5,000 per month. The right shape is the one the conversation reveals.</p>
      <p style="font-family: var(--sans); color: var(--text-secondary); line-height: 1.75; margin-bottom: 2rem;">Every engagement starts the same way: a thirty minute conversation. No pitch. No script. Greg tells you honestly whether the work is for you and, if it is, what it would actually look like.</p>

      <div class="work-stats-grid">
        <div>
          <p style="font-family: var(--sans); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-muted); margin-bottom: 0.3rem;">Starts at</p>
          <p style="font-family: var(--serif); font-size: 1.6rem; color: var(--text-primary);">$750 initial session</p>
        </div>
        <div>
          <p style="font-family: var(--sans); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-muted); margin-bottom: 0.3rem;">Private container</p>
          <p style="font-family: var(--serif); font-size: 1.6rem; color: var(--text-primary);">From $5,000 / mo</p>
        </div>
        <div>
          <p style="font-family: var(--sans); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-muted); margin-bottom: 0.3rem;">Availability</p>
          <p style="font-family: var(--serif); font-size: 1.6rem; color: var(--text-primary);">4 to 6 clients only</p>
        </div>
        <div>
          <p style="font-family: var(--sans); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-muted); margin-bottom: 0.3rem;">Format</p>
          <p style="font-family: var(--serif); font-size: 1.6rem; color: var(--text-primary);">Private. In person. Tailored.</p>
        </div>
      </div>

      <a href="#apply" class="btn-primary" style="display: inline-block;">Start With a Conversation</a>
      <p style="margin-top: 1.2rem; font-family: var(--sans); font-size: 0.82rem; color: var(--text-muted);">Greg would rather have an empty calendar than the wrong person on it.</p>
    </div>
  </div>
</section>

<!-- ===================== THE WRITING ===================== -->
<section id="writing" style="background: var(--bg-primary); padding: 6rem 4rem;">
  <div class="container">
    <p class="eyebrow reveal">The Writing</p>
    <h2 class="section-title reveal">Over 150,000 words on what nobody else<br><em>is willing to say out loud.</em></h2>
    <p class="section-subtitle reveal">Greg writes the way he coaches: direct, honest, and without shortcuts. These are not motivational posts. They are real explorations of pain, identity, nutrition, movement, and what happens when you stop performing and start paying attention. Click any piece to read more.</p>

    <!-- Category Filters -->
    <div class="writing-filters reveal">
      <button class="writing-filter-btn active" data-filter="all">All</button>
      <button class="writing-filter-btn" data-filter="inner-work">Inner Work</button>
      <button class="writing-filter-btn" data-filter="movement">Movement &amp; Pain</button>
      <button class="writing-filter-btn" data-filter="nutrition">Nutrition</button>
      <button class="writing-filter-btn" data-filter="psychology">Psychology</button>
      <button class="writing-filter-btn" data-filter="philosophy">Philosophy</button>
    </div>

    <!-- Essay Cards — The Long Read -->
    <div class="essay-grid" id="essayGrid">

      <div class="essay-card reveal" data-category="inner-work">
        <div class="essay-card-img">
          <img src="https://assets.jamesguldan.com/greg/blog-images/darkness-retreat.jpg" alt="10 Days in Total Darkness">
        </div>
        <div class="essay-card-text">
          <span class="essay-tag">Inner Work</span>
          <h4>10 Days in Total Darkness</h4>
          <p>A raw account of fear, boredom, revelation, and what was waiting underneath it all. No phone. No light. No distraction. Just everything you have been avoiding. Greg entered a darkness retreat to find out what was left when the noise stopped.</p>
          <span class="essay-meta">12 min read</span>
          <a href="https://greg-blog-cms.james-d13.workers.dev/writing/darkness-retreat" class="essay-read-link">Read the full piece &rarr;</a>
        </div>
      </div>

      <div class="essay-card reveal" data-category="inner-work">
        <div class="essay-card-img">
          <img src="https://assets.jamesguldan.com/greg/blog-images/into-the-darkness.jpg" alt="Into the Darkness">
        </div>
        <div class="essay-card-text">
          <span class="essay-tag">Inner Work</span>
          <h4>Into the Darkness</h4>
          <p>Most people are not afraid of the dark. They are afraid of what shows up when there is nothing left to distract them. Written the night before Greg entered eight days of total darkness.</p>
          <span class="essay-meta">6 min read</span>
          <a href="https://greg-blog-cms.james-d13.workers.dev/writing/into-the-darkness" class="essay-read-link">Read the full piece &rarr;</a>
        </div>
      </div>

      <div class="essay-card reveal" data-category="psychology">
        <div class="essay-card-img">
          <img src="https://assets.jamesguldan.com/greg/blog-images/body-dysmorphia.jpg" alt="Body Dysmorphia and the Mirror">
        </div>
        <div class="essay-card-text">
          <span class="essay-tag">Psychology</span>
          <h4>Body Dysmorphia and the Mirror</h4>
          <p>You have hit every goal you set for your body and still cannot stand what you see. That is not a discipline problem. That is a perception problem, and no amount of training will fix it.</p>
          <span class="essay-meta">8 min read</span>
          <a href="https://greg-blog-cms.james-d13.workers.dev/writing/body-dysmorphia" class="essay-read-link">Read the full piece &rarr;</a>
        </div>
      </div>

      <div class="essay-card reveal" data-category="psychology">
        <div class="essay-card-img">
          <img src="https://assets.jamesguldan.com/greg/blog-images/you-are-not-your-thoughts.jpg" alt="You Are Not Your Thoughts">
        </div>
        <div class="essay-card-text">
          <span class="essay-tag">Psychology</span>
          <h4>You Are Not Your Thoughts</h4>
          <p>The voice in your head that tells you that you are not doing enough, not lean enough, not disciplined enough — it is not you. It is a pattern. Understanding this distinction changes everything about how you make decisions under pressure.</p>
          <span class="essay-meta">6 min read</span>
          <a href="https://greg-blog-cms.james-d13.workers.dev/writing/you-are-not-your-thoughts" class="essay-read-link">Read the full piece &rarr;</a>
        </div>
      </div>

      <div class="essay-card reveal" data-category="nutrition">
        <div class="essay-card-img">
          <img src="https://assets.jamesguldan.com/greg/blog-images/mastering-mild-hunger.jpg" alt="Mastering Mild Hunger">
        </div>
        <div class="essay-card-text">
          <span class="essay-tag">Nutrition</span>
          <h4>Mastering Mild Hunger</h4>
          <p>You do not need another diet. You need to learn how to sit with mild hunger without panicking, without bingeing, and without turning it into a moral issue. This is the most practical nutrition skill Greg teaches, and it has nothing to do with willpower.</p>
          <span class="essay-meta">6 min read</span>
          <a href="https://greg-blog-cms.james-d13.workers.dev/writing/mastering-mild-hunger" class="essay-read-link">Read the full piece &rarr;</a>
        </div>
      </div>

      <div class="essay-card reveal" data-category="philosophy">
        <div class="essay-card-img">
          <img src="https://assets.jamesguldan.com/greg/blog-images/what-is-healthy.jpg" alt="What Does It Mean to Be Healthy?">
        </div>
        <div class="essay-card-text">
          <span class="essay-tag">Philosophy</span>
          <h4>What Does It Mean to Be Healthy?</h4>
          <p>Health is not a number on a scale, a blood panel, or a body fat percentage. It is not the absence of disease. Greg asks the question that the entire fitness industry avoids because the answer would put most of them out of business.</p>
          <span class="essay-meta">6 min read</span>
          <a href="https://greg-blog-cms.james-d13.workers.dev/writing/what-is-healthy" class="essay-read-link">Read the full piece &rarr;</a>
        </div>
      </div>

      <div class="essay-card reveal" data-category="psychology">
        <div class="essay-card-img">
          <img src="https://assets.jamesguldan.com/greg/blog-images/all-or-nothing.jpg" alt="The All or Nothing Mindset">
        </div>
        <div class="essay-card-text">
          <span class="essay-tag">Psychology</span>
          <h4>The All or Nothing Trap</h4>
          <p>You are either all in or completely off the rails. There is no middle. All or nothing thinking is the hallmark of high performers — and the thing that keeps them from ever actually resting, recovering, or feeling enough.</p>
          <span class="essay-meta">7 min read</span>
          <a href="https://greg-blog-cms.james-d13.workers.dev/writing/all-or-nothing" class="essay-read-link">Read the full piece &rarr;</a>
        </div>
      </div>

    </div>

    <div class="reveal" style="text-align: center; margin-top: 3rem;">
      <a href="https://greg-blog-cms.james-d13.workers.dev/writing" class="essay-toggle-btn" style="display:inline-block;">Read All Essays</a>
    </div>
  </div>
</section>

<!-- ===================== CLOSING QUOTE ===================== -->
<section class="manifesto closing-quote reveal" style="overflow: hidden;">
  <p class="manifesto-quote">&ldquo;You are allowed to want a marriage, a body you enjoy, and a life you would not trade. The spiritual path never asked you to want less. It asked you to want from a different place.&rdquo;</p>
  <p class="manifesto-attribution">Greg Pignataro</p>
</section>

<!-- ===================== APPLY CTA ===================== -->
<section id="apply" class="cta-section">
  <div class="cta-inner">
    <p class="eyebrow reveal" style="justify-content: center;">Book a Conversation</p>
    <h2 class="section-title reveal" style="font-size: clamp(2.5rem, 4.5vw, 4rem);">This is not for everyone.<br>It might be for <em>you.</em></h2>
    <p class="cta-desc reveal">Thirty minutes on a call. No pitch. No pressure. No script. Greg shows up fully present, asks you a few questions most people have never been asked, and tells you honestly whether the work is for you.</p>
    <div class="cta-process reveal">
      <div class="process-step">
        <div class="process-num">1</div>
        <div class="process-text">Book a time. Pick a thirty minute window that works for you.</div>
      </div>
      <div class="process-step">
        <div class="process-num">2</div>
        <div class="process-text">Show up. No prep needed. Greg will meet you wherever you actually are.</div>
      </div>
      <div class="process-step">
        <div class="process-num">3</div>
        <div class="process-text">Leave with clarity you did not have when you got on the call. If the work is right for you, Greg will tell you what it would look like.</div>
      </div>
    </div>
    <a href="https://calendly.com/greg-enlightened/discovery-call" target="_blank" rel="noopener" class="btn-primary reveal">Book a Conversation</a>
    <p class="reveal" style="margin-top: 1.5rem; font-size: 0.82rem; color: var(--text-muted); text-align: center; max-width: 460px; margin-left: auto; margin-right: auto;">Greg works with only four to six private clients at a time. He would rather have an empty calendar than the wrong person on it.</p>
  </div>
</section>

<!-- ===================== FOOTER ===================== -->
<footer>
  <a href="#" class="footer-top-link">Back to Top</a>
  <div class="footer-brand">Greg Pignataro</div>
  <p class="footer-tagline">Come home to yourself.</p>
  <nav class="footer-nav">
    <a href="#who">Is This You</a>
    <a href="#method">The Three Phases</a>
    <a href="#story">The Story</a>
    <a href="#beliefs">What I Believe</a>
    <a href="#work">Work With Greg</a>
    <a href="#writing">The Writing</a>
    <a href="#apply">Book a Call</a>
  </nav>
  <div class="footer-social">
    <a href="https://www.instagram.com/neverpastyourprime/" target="_blank" rel="noopener">Instagram</a>
    <a href="https://www.guinnessworldrecords.com/world-records/722570-most-nordic-hamstring-curls-in-one-minute" target="_blank" rel="noopener">Guinness Record</a>
    <a href="https://www.neu.fit/podcast/episode-59-atg-training-and-setting-the-world-record-in-nordic-hamstring-curls-with-greg-pignataro-cscs/" target="_blank" rel="noopener">NeuFit Podcast</a>
  </div>
  <div class="footer-legal">
    <a href="/privacy">Privacy Policy</a>
    <a href="/terms">Terms of Service</a>
  </div>
  <p class="footer-copy">&copy; 2026 Greg Pignataro. All rights reserved.</p>
</footer>

<!-- ===================== COOKIE CONSENT ===================== -->
<div id="cookieConsent" style="display:none; position:fixed; bottom:0; left:0; right:0; z-index:10000; background:rgba(44,37,32,0.95); backdrop-filter:blur(12px); padding:1.2rem 2rem; font-family:var(--sans); font-size:0.85rem; color:rgba(255,255,255,0.85); line-height:1.5;">
  <div style="max-width:1100px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:1.5rem; flex-wrap:wrap;">
    <p style="margin:0; flex:1; min-width:280px;">This site uses cookies (Google Analytics) to understand how visitors interact with the content. No personal data is sold or shared. <a href="/privacy" style="color:#C99B4F; text-decoration:underline;">Privacy Policy</a></p>
    <div style="display:flex; gap:0.8rem; flex-shrink:0;">
      <button onclick="acceptCookies()" style="background:#B8863A; color:#fff; border:none; padding:0.6rem 1.4rem; border-radius:100px; font-family:var(--sans); font-size:0.78rem; font-weight:500; letter-spacing:0.08em; text-transform:uppercase; cursor:pointer;">Accept</button>
      <button onclick="declineCookies()" style="background:transparent; color:rgba(255,255,255,0.6); border:1px solid rgba(255,255,255,0.2); padding:0.6rem 1.4rem; border-radius:100px; font-family:var(--sans); font-size:0.78rem; font-weight:500; letter-spacing:0.08em; text-transform:uppercase; cursor:pointer;">Decline</button>
    </div>
  </div>
</div>

<!-- ===================== SCRIPTS ===================== -->
<script>
// Navbar scroll behavior
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Intersection Observer for reveal animations
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Close mobile menu on scroll
window.addEventListener('scroll', () => {
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.nav-hamburger');
  if (navLinks && navLinks.classList.contains('mobile-open')) {
    navLinks.classList.remove('mobile-open');
    hamburger.classList.remove('open');
  }
}, { passive: true });

// Smooth scroll + close mobile menu on nav click
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href) return;
    e.preventDefault();
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.nav-hamburger');
    if (navLinks) navLinks.classList.remove('mobile-open');
    if (hamburger) hamburger.classList.remove('open');
    // Treat bare "#" as scroll-to-top so the logo and back-to-top work
    if (href === '#' || href === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== CATEGORY FILTER =====
document.querySelectorAll('.writing-filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.writing-filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    document.querySelectorAll('.essay-card').forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
    });
  });
});

// ===== COOKIE CONSENT =====
(function() {
  const consent = localStorage.getItem('cookie_consent');
  if (!consent) {
    setTimeout(function() {
      document.getElementById('cookieConsent').style.display = 'block';
    }, 1500);
  } else if (consent === 'declined') {
    // Disable GA if declined
    window['ga-disable-G-X73WCJRFHT'] = true;
  }
})();

function acceptCookies() {
  localStorage.setItem('cookie_consent', 'accepted');
  document.getElementById('cookieConsent').style.display = 'none';
}

function declineCookies() {
  localStorage.setItem('cookie_consent', 'declined');
  window['ga-disable-G-X73WCJRFHT'] = true;
  document.getElementById('cookieConsent').style.display = 'none';
}

/* ===== VIDEO CARD TOGGLE (Lee, Ray) ===== */
function videoCardToggle(name) {
  var video = document.getElementById(name + 'Video');
  var cover = document.getElementById(name + 'Cover');
  if (!video) return;
  if (video.paused) {
    video.play().catch(function(e){ console.log(e); });
    cover.classList.add('hidden');
  } else {
    video.pause();
    cover.classList.remove('hidden');
  }
}

/* ===== WENDY VIDEO PLAYER ===== */
function wendyToggle() {
  var video   = document.getElementById('wendyVideo');
  var cover   = document.getElementById('wendyCover');
  var playBtn = document.getElementById('wendyPlayBtn');
  if (!video) return;
  if (video.paused) {
    video.play();
    cover.classList.add('hidden');
    playBtn.querySelectorAll('.wendy-pulse').forEach(function(el){ el.style.animationPlayState = 'paused'; el.style.opacity = '0'; });
  } else {
    video.pause();
    cover.classList.remove('hidden');
    playBtn.querySelectorAll('.wendy-pulse').forEach(function(el){ el.style.animationPlayState = 'running'; el.style.opacity = ''; });
  }
}

/* ===== VIDEO EVENT LISTENERS — registered once at load ===== */
(function() {
  // Wendy
  var wv = document.getElementById('wendyVideo');
  if (wv) {
    wv.addEventListener('timeupdate', function() {
      if (!wv.duration) return;
      var fill = document.getElementById('wendyProgressFill');
      var timeEl = document.getElementById('wendyTime');
      fill.style.width = (wv.currentTime / wv.duration * 100) + '%';
      var r = wv.duration - wv.currentTime;
      timeEl.textContent = Math.floor(r/60) + ':' + (Math.floor(r%60)<10?'0':'') + Math.floor(r%60);
    });
    wv.addEventListener('ended', function() {
      document.getElementById('wendyCover').classList.remove('hidden');
      document.getElementById('wendyProgressFill').style.width = '0%';
      document.getElementById('wendyTime').textContent = '1:14';
      document.getElementById('wendyPlayBtn').querySelectorAll('.wendy-pulse').forEach(function(el){ el.style.animationPlayState = 'running'; el.style.opacity = ''; });
    });
  }
  // Lee
  var lv = document.getElementById('leeVideo');
  if (lv) {
    lv.addEventListener('timeupdate', function() {
      if (!lv.duration) return;
      document.getElementById('leeProgressFill').style.width = (lv.currentTime / lv.duration * 100) + '%';
      var r = lv.duration - lv.currentTime;
      document.getElementById('leeTime').textContent = Math.floor(r/60) + ':' + (Math.floor(r%60)<10?'0':'') + Math.floor(r%60);
    });
    lv.addEventListener('ended', function() {
      document.getElementById('leeCover').classList.remove('hidden');
      document.getElementById('leeProgressFill').style.width = '0%';
    });
  }
  // Ray
  var rv = document.getElementById('rayVideo');
  if (rv) {
    rv.addEventListener('timeupdate', function() {
      if (!rv.duration) return;
      document.getElementById('rayProgressFill').style.width = (rv.currentTime / rv.duration * 100) + '%';
      var r = rv.duration - rv.currentTime;
      document.getElementById('rayTime').textContent = Math.floor(r/60) + ':' + (Math.floor(r%60)<10?'0':'') + Math.floor(r%60);
    });
    rv.addEventListener('ended', function() {
      document.getElementById('rayCover').classList.remove('hidden');
      document.getElementById('rayProgressFill').style.width = '0%';
    });
  }
})();
</script>
</body>
</html>
```
