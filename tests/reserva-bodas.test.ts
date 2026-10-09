import { describe, expect, test } from "bun:test";
import { precioBoda } from "../src/components/ReservaOnline";

describe("Tarifas de bodas", () => {
  test("básico con Cashea cuesta 350 dólares", () => expect(precioBoda("basico", true)).toBe(350));
  test("básico de contado cuesta 300 dólares", () => expect(precioBoda("basico", false)).toBe(300));
  test("full con Cashea cuesta 450 dólares", () => expect(precioBoda("full", true)).toBe(450));
  test("full de contado cuesta 400 dólares", () => expect(precioBoda("full", false)).toBe(400));
});