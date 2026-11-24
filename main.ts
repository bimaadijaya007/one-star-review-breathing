import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Breathing: runs itself perfectly until you think about it, then suddenly it's manual and you're doing it wrong.";
const MAX_CHARS = 160;

// Self-check: one line, non-blank, within the character limit, no stray
// whitespace at either end, and a full stop at the end.
if (LINE.length < 1 || LINE.length > MAX_CHARS) {
  throw new Error(
    `entry line must be 1-${MAX_CHARS} characters, got ${LINE.length}`,
  );
}
if (LINE.trim() !== LINE || LINE.includes("\n")) {
  throw new Error(
    "entry line must be a single line with no leading or trailing whitespace",
  );
}
if (!LINE.endsWith(".")) {
  throw new Error("entry line must end with a full stop");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Round-trip check: the file must hold exactly the line.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) {
  throw new Error("round-trip check failed: entry.txt does not match the line");
}

console.log(`entry written: /output/entry.txt (${LINE.length} characters)`);
