import { describe, expect, test } from "bun:test";
import { convertirABolivares, precioBoda } from "../src/components/ReservaOnline";

describe("Reservas con tasa oficial del euro ingresada", () => {
  test("multiplica el precio publicado por la tasa del euro", () => {
    expect(convertirABolivares(precioBoda("basico", false), 125.5)).toBe(37650);
  });

  test("redondea el monto en bolívares a dos decimales", () => {
    expect(convertirABolivares(7, 125.555)).toBe(878.89);
  });

  test("sin tasa ingresada no calcula un monto en bolívares", () => {
    expect(convertirABolivares(300, 0)).toBe(0);
  });
});