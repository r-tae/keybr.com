import { test } from "node:test";
import { Color } from "@keybr/color";
import { assert } from "chai";
import { UrlAsset } from "./asset.ts";
import { CustomTheme } from "./custom-theme.ts";
import { readTheme, storeTheme } from "./theme-io.ts";

test("store", async () => {
  // Arrange.

  const storage = new FakeStorage([
    ["keybr.theme[--accent]", "rgb(255,255,255)"],
  ]);

  const theme = new CustomTheme()
    .set("--primary", Color.parse("#ffffff"))
    .set("--secondary", Color.parse("#000000"))
    .set("--background-image", new UrlAsset("/assets/image.svg"));

  // Act.

  const { error } = await storeTheme(theme, storage);

  // Assert.

  assert.strictEqual(error, null);
  assert.deepStrictEqual(
    [...storage],
    [
      ["keybr.theme[--primary]", "rgb(255,255,255)"],
      ["keybr.theme[--secondary]", "rgb(0,0,0)"],
      ["keybr.theme[--background-image]", "/assets/image.svg"],
    ],
  );
});

test("read", async () => {
  // Arrange.

  const storage = new FakeStorage([
    ["keybr.theme[--primary]", "rgb(255,255,255)"],
    ["keybr.theme[--secondary]", "rgb(0,0,0)"],
    ["keybr.theme[--background-image]", "/assets/image.svg"],
  ]);

  // Act.

  const { theme, error } = await readTheme(storage);

  // Assert.

  assert.strictEqual(error, null);
  assert.deepStrictEqual(theme.get("--primary"), Color.parse("#ffffff"));
  assert.deepStrictEqual(theme.get("--secondary"), Color.parse("#000000"));
  assert.deepStrictEqual(
    theme.get("--background-image"),
    new UrlAsset("/assets/image.svg"),
  );
});

test("read and ignore invalid data", async () => {
  // Arrange.

  const storage = new FakeStorage([
    ["keybr.theme[--primary]", "omg"],
    ["keybr.theme[--secondary]", "omg"],
    ["keybr.theme[--background-image]", "data:omg"],
  ]);

  // Act.

  const { theme, error } = await readTheme(storage);

  // Assert.

  assert.deepStrictEqual([...storage], []);
  assert.deepStrictEqual([...theme], []);
  assert.strictEqual(error?.errors.length, 3);
});

class FakeStorage implements Storage, Iterable<[string, string]> {
  readonly #data: Map<string, string>;

  constructor(items: Iterable<[string, string]> = []) {
    this.#data = new Map(items);
  }

  [Symbol.iterator](): IterableIterator<[string, string]> {
    return this.#data.entries();
  }

  key(index: number): string | null {
    throw new TypeError();
  }

  get length(): number {
    throw new TypeError();
  }

  clear(): void {
    this.#data.clear();
  }

  getItem(key: string): string | null {
    return this.#data.get(key) ?? null;
  }

  removeItem(key: string): void {
    this.#data.delete(key);
  }

  setItem(key: string, value: string): void {
    this.#data.set(key, value);
  }
}
