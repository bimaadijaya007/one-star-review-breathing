import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Breathing: runs itself perfectly until you think about it, then suddenly it's manual and you're doing it wrong.";

// Self-check: one line, non-blank, within the 160-character limit.
if (LINE.length < 1 || LINE.length > 160) {
  throw new Error(`entry line must be 1-160 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry line must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Round-trip check: the file must hold exactly the line.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) {
  throw new Error("round-trip check failed: entry.txt does not match the line");
}

console.log("entry written: /output/entry.txt");
