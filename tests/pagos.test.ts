import { describe, expect, test } from "bun:test";
import { PAGOS } from "../src/components/ReservaOnline";

describe("Datos de pago publicados", () => {
  test("PayPal muestra el correo real del cliente", () => {
    const paypal = PAGOS.find((p) => p.name === "PayPal");
    expect(paypal?.lines).toContain("Correo: cienagaocumare1984@gmail.com");
  });

  test("Binance Pay muestra el ID real del cliente", () => {
    const binance = PAGOS.find((p) => p.name === "Binance Pay");
    expect(binance?.lines).toContain("ID: 864833311");
  });

  test("la transferencia muestra la cuenta Banesco real", () => {
    const transferencia = PAGOS.find((p) => p.name === "Transferencia (Bs)");
    expect(transferencia?.lines).toContain("Cuenta: 0134-0147-12-1471052494");
  });

  test("Zelle sigue pendiente hasta que el cliente envíe su usuario", () => {
    const zelle = PAGOS.find((p) => p.name === "Zelle");
    expect(zelle?.lines).toContain("Usuario: por confirmar");
  });
});
