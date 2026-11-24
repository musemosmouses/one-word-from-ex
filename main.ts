// One Word From Your Ex — one word, the word an ex would use to describe you.
// The word is "Almost": he was almost the one, almost grown up, almost ready.
// An adverb doing the job of a confession — a whole almost-relationship in
// a single word. It stings because it is true, not because it is mean: the
// entrant knows exactly what "almost" cost, and every reader has lived it.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "Almost";

// Exactly one word: the kit gate accepts UTF-8 text of 1 to 24 characters,
// not only white space, so the checks below mirror it exactly, plus the
// single-word rule (no spaces, one token) and a no-punctuation guard, so the
// file can never carry a phrase by accident. Deterministic by construction:
// no network, no clock, no randomness — the same word lands in entry.txt
// on every run.
const charCount = [...ENTRY].length;
if (charCount < 1 || charCount > 24) {
  throw new Error(`entry must be 1-24 characters, got ${charCount}`);
}
if (ENTRY.trim().split(/\s+/).length !== 1 || /[^\p{L}]/u.test(ENTRY)) {
  throw new Error(`entry must be exactly one word, got ${JSON.stringify(ENTRY)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, ENTRY, "utf8");
console.log(`wrote one-word entry to ${entryPath} (${charCount} characters)`);
