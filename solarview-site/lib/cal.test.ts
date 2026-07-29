import assert from "node:assert/strict";
import { getCalLink } from "./cal";

const original = process.env.NEXT_PUBLIC_CAL_LINK;

function withEnv(value: string | undefined, fn: () => void) {
  if (value === undefined) delete process.env.NEXT_PUBLIC_CAL_LINK;
  else process.env.NEXT_PUBLIC_CAL_LINK = value;
  try {
    fn();
  } finally {
    if (original === undefined) delete process.env.NEXT_PUBLIC_CAL_LINK;
    else process.env.NEXT_PUBLIC_CAL_LINK = original;
  }
}

withEnv(undefined, () => assert.equal(getCalLink(), null));
withEnv("", () => assert.equal(getCalLink(), null));
withEnv("  ", () => assert.equal(getCalLink(), null));
withEnv("not-a-link", () => assert.equal(getCalLink(), null));
withEnv("radianz/discovery", () => assert.equal(getCalLink(), "radianz/discovery"));
withEnv("  radianz/discovery  ", () => assert.equal(getCalLink(), "radianz/discovery"));

console.log("cal.test.ts: ok");
