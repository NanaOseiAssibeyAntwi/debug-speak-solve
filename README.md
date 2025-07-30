# 🐞 debug-speak-solve

A development tool and educational resource for practicing **rubber‑duck‑style debugging** by speaking your problem out loud and guiding yourself to a solution. Great for solo developers or teams wanting a structured approach to thinking through code issues.

## 🚀 What is it?

This project helps you debug by combining:

- **Interactive voice prompts** (text‑to‑speech and speech‑to‑text), enabling you to verbalize your problem and reasoning.
- Structured **debug‑speak‑solve workflow**, inspired by the “rubber duck debugging” method: explain what your code should do, compare to what it does, and arrive at a fix :contentReference[oaicite:1]{index=1}.
- Support for multiple programming languages and formats.
- CLI interface and optionally browser UI for smoother experience.

## 📦 Features

- **Prompt your code problem** out loud via audio.
- **Record your spoken reasoning**, transcribe it to text, and store logs.
- **Self‑questioning prompts** to guide your debugging:  
  “What did I expect to happen?”, “What did actually happen?”, “What difference matters most?”
- Optional suggestions: link to relevant docs or StackOverflow search keywords.
- Logging and playback support for reviewing your debugging session.

## ✅ Who is this for?

- Solo developers who want to debug effectively without pairing up.
- Beginners learning to reason clearly about code behavior.
- Developers practicing algorithm design or bug hunting through structured questioning.

## 📁 Repository Structure

debug-speak-solve/
├── cli/ # Command-line interface
│ └── index.js # CLI entry point
├── lib/ # Core logic modules
│ ├── speech.ts # TTS / STT wrapper
│ ├── prompts.ts # Predefined debugging prompts
│ └── session.ts # Manages user session flow
├── examples/ # Example scenarios and transcripts
│ └── sampleSession.json
├── docs/ # Documentation and guides
│ └── workflow.md
├── package.json # Project metadata + dependencies
└── README.md # (this file)


## 🛠️ Installation & Getting Started

> Make sure you have Node.js v18+ installed.

```bash
git clone https://github.com/NanaOseiAssibeyAntwi/debug-speak-solve.git
cd debug-speak-solve
npm install
npm run dev

Sample session flow
Describe your bug aloud. Speech-to-text captures it.

Answer guided prompts verbally (or type if preferred).

Review transcript and identify key insights.

Iterate till you have a clear solution path.

🧠 How it works
You speak the issue — e.g. “My loop doesn’t terminate when input is zero.”

The system captures your words via speech recognition.

You’re guided through structured reflection:

“What should happen when input is zero?”

“What is actually happening?”

“What difference seems key?”

You arrive at the bug and formulate a fix.

A full session transcript saves to sessions/ for later review.

✨ Why use this?
Self‑explanatory debugging: speaking aloud often unlocks solutions you’d miss by reading silently.

Cognitive clarity: prompts surface hidden assumptions, edge cases, and expectations.

Reusable process: sessions can become study material, teaching resources, or pair-discussion logs.

Session started: 2025-07-30 10:00
User: “For input zero, the function returns 1 but I expect zero.”
Prompt‑1: “What do you expect when input is zero?”
Answer: “Return exactly zero.”
Prompt‑2: “What is happening instead?”
Answer: “It outputs 1 because of default case fall‑through.”
Prompt‑3: “What difference matters most?”
Answer: “The default return logic is executed even when input equals zero.”
Conclusion: “Fix the conditional to prioritize input==0 branch before default.”
Session saved to sessions/20250730‑1000.json


🎯 Roadmap
 Browser‑based UI with in‑page transcript and audio playback

 Integration with major TTS/STT providers (Google, Azure, AWS, local)

 Extend prompts for other debugging styles: performance, security, logic

 Export session as PDF or shareable link

🤝 Contribute
Contributions welcome! You can:

Suggest new prompts or session flows.

Add support for other languages or runtime environments.

Improve CLI experience or add UI.

Please open issues or pull requests on GitHub.



