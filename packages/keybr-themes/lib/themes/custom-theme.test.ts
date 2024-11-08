import { test } from "node:test";
import { Color } from "@keybr/color";
import { assert } from "chai";
import { DataUrlAsset } from "./asset.ts";
import { CustomTheme } from "./custom-theme.ts";

test("theme", () => {
  const white = Color.parse("#ffffff");
  const black = Color.parse("#000000");
  const asset = new DataUrlAsset(
    new Blob(['<svg xmlns="http://www.w3.org/2000/svg"/>'], {
      type: "image/svg+xml",
    }),
  );

  const a = new CustomTheme();
  const b = a.set("--primary", white);
  const c = b.set("--primary", black).set("--background-image", asset);

  assert.isTrue(a !== b);
  assert.isTrue(b !== c);
  assert.isTrue(a !== c);

  assert.deepStrictEqual([...a], []);
  assert.deepStrictEqual(
    [...b],
    [
      ["--primary", white], //
    ],
  );
  assert.deepStrictEqual(
    [...c],
    [
      ["--primary", black], //
      ["--background-image", asset],
    ],
  );

  assert.strictEqual(a.getColor("--primary"), null);
  assert.strictEqual(b.getColor("--primary"), white);
  assert.strictEqual(c.getColor("--primary"), black);
  assert.strictEqual(c.getImage("--background-image"), asset);
});
