import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), sourcePath = join(here, "line.txt");
const destDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
const destPath = join(destDir, "entry.txt");

function loadJoke(path: string): string {
  const raw: string = readFileSync(path, "utf-8");
  const joke: string = raw.replace(/\r\n?/g, "\n").replace(/\n$/, "");
  if (joke.length < 1 || joke.length > 199) {
    throw new Error(`line must be 1-199 characters, got ${joke.length}`);
  }
  if (joke.includes("\n") || joke.trim().length === 0) {
    throw new Error("line must be a single non-blank line");
  }
  return joke;
}

const joke: string = loadJoke(sourcePath);
mkdirSync(destDir, { recursive: true });
writeFileSync(destPath, joke, "utf-8");
console.log(joke);
