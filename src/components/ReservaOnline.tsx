import { useMemo, useState } from "react";

const WHATSAPP_NUMBER = "584243312563";

// Tasa BCV del día (Bs por USD). Actualizar según el BCV.
const TASA_BCV_DEFAULT = 0;

// Datos de pago (por confirmar con el cliente)
const PAGOS = [
  { name: "Pago Móvil (Bs)", lines: ["Banco: por confirmar", "Teléfono: por confirmar", "RIF: J-501525862"] },
  { name: "PayPal", lines: ["Correo: por confirmar"] },
  { name: "Zelle", lines: ["Usuario: por confirmar"] },
  { name: "Binance Pay", lines: ["Usuario / ID: por confirmar"] },
];

type Servicio = "casa" | "lancha" | "kayak" | "boda" | "evento";
const SERVICIOS: { id: Servicio; label: string }[] = [
  { id: "casa", label: "Casa vacacional" },
  { id: "lancha", label: "Lancha a La Ciénaga" },
  { id: "kayak", label: "Kayak (30 min)" },
  { id: "boda", label: "Bodas" },
  { id: "evento", label: "Otros eventos" },
];

const CASA = {
  baja: { cashea: [200, 350], contado: [150, 250] },
  alta: { cashea: [250, 450], contado: [200, 350] },
} as const;

function precioCasa(noches: number, tabla: readonly [number, number] | readonly number[]) {
  if (noches <= 0) return 0;
  return Math.floor(noches / 2) * tabla[1] + (noches % 2) * tabla[0];
}

export function ReservaOnline() {
  const [servicio, setServicio] = useState<Servicio>("casa");
  const [cashea, setCashea] = useState(false);
  const [temporada, setTemporada] = useState<"baja" | "alta">("baja");
  const [entrada, setEntrada] = useState("");
  const [salida, setSalida] = useState("");
  const [personas, setPersonas] = useState(2);
  const [paquete, setPaquete] = useState<"basico" | "full">("basico");
  const [tasa, setTasa] = useState(TASA_BCV_DEFAULT);
  const [nombre, setNombre] = useState("");
  const [metodo, setMetodo] = useState(PAGOS[0].name);
  const [referencia, setReferencia] = useState("");
  const [archivo, setArchivo] = useState<string>("");

  const noches = useMemo(() => {
    if (!entrada || !salida) return 0;
    const d = (new Date(salida).getTime() - new Date(entrada).getTime()) / 86400000;
    return d > 0 ? Math.round(d) : 0;
  }, [entrada, salida]);

  const total = useMemo(() => {
    const p = Math.max(1, personas);
    switch (servicio) {
      case "casa":
        return precioCasa(noches, CASA[temporada][cashea ? "cashea" : "contado"]);
      case "lancha":
        return p * (cashea ? 12 : 10);
      case "kayak":
        return p * (cashea ? 7 : 5);
      case "boda":
        return paquete === "basico" ? (cashea ? 350 : 300) : cashea ? 450 : 400;
      default:
        return 0;
    }
  }, [servicio, noches, temporada, cashea, personas, paquete]);

  const esCasa = servicio === "casa";
  const valido = nombre.trim().length > 1 && (esCasa ? noches > 0 : !!entrada) && personas >= 1;

  const enviar = () => {
    const s = SERVICIOS.find((x) => x.id === servicio)!.label;
    const msg = [
      "¡Hola Ocumare Turismo Pro! Quiero confirmar mi reserva:",
      `• Nombre: ${nombre.trim().slice(0, 80)}`,
      `• Servicio: ${s}${servicio === "boda" ? ` (paquete ${paquete})` : ""}`,
      esCasa ? `• Temporada: ${temporada}` : "",
      `• Fecha${esCasa ? " de entrada" : ""}: ${entrada}`,
      esCasa ? `• Fecha de salida: ${salida} (${noches} noche${noches === 1 ? "" : "s"})` : "",
      `• Personas: ${personas}`,
      `• Modalidad: ${cashea ? "Con Cashea" : "De contado"}`,
      servicio === "evento" ? "• Total: a cotizar" : `• Total: $${total}${tasa > 0 ? ` (Bs ${(total * tasa).toFixed(2)})` : ""}`,
      `• Método de pago: ${metodo}`,
      referencia ? `• Referencia: ${referencia.trim().slice(0, 60)}` : "",
      archivo ? `• Comprobante: ${archivo} (lo adjunto en este chat)` : "",
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  const input = "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  const label = "mb-1 block text-sm font-semibold text-foreground/80";
  const chip = (on: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${on ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/70 hover:bg-secondary/40"}`;

  return (
    <section id="reservas" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-brand text-2xl text-accent">Reserva Online</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-5xl">Arma tu experiencia y conoce el total</h2>
          <p className="mt-4 text-muted-foreground">Elige el servicio, las fechas y las personas. El precio se calcula al instante.</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6 rounded-3xl border bg-card p-6 shadow-lg sm:p-8">
            <div>
              <span className={label}>Servicio</span>
              <div className="flex flex-wrap gap-2">
                {SERVICIOS.map((s) => (
                  <button key={s.id} type="button" onClick={() => setServicio(s.id)} className={chip(servicio === s.id)}>{s.label}</button>
                ))}
              </div>
            </div>

            {servicio !== "evento" && (
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setCashea(false)} className={chip(!cashea)}>De contado</button>
                <button type="button" onClick={() => setCashea(true)} className={chip(cashea)}>Con Cashea</button>
              </div>
            )}

            {esCasa && (
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setTemporada("baja")} className={chip(temporada === "baja")}>Temporada baja</button>
                <button type="button" onClick={() => setTemporada("alta")} className={chip(temporada === "alta")}>Temporada alta</button>
              </div>
            )}

            {servicio === "boda" && (
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setPaquete("basico")} className={chip(paquete === "basico")}>Paquete básico</button>
                <button type="button" onClick={() => setPaquete("full")} className={chip(paquete === "full")}>Paquete full</button>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block">
                <span className={label}>{esCasa ? "Fecha de entrada" : "Fecha"}</span>
                <input type="date" value={entrada} onChange={(e) => setEntrada(e.target.value)} className={input} />
              </label>
              {esCasa && (
                <label className="block">
                  <span className={label}>Fecha de salida</span>
                  <input type="date" value={salida} min={entrada} onChange={(e) => setSalida(e.target.value)} className={input} />
                </label>
              )}
              <label className="block">
                <span className={label}>Personas</span>
                <input type="number" min={1} max={esCasa ? 16 : 200} value={personas}
                  onChange={(e) => setPersonas(Math.max(1, Math.min(esCasa ? 16 : 200, Number(e.target.value) || 1)))} className={input} />
              </label>
            </div>

            <label className="block">
              <span className={label}>Tu nombre</span>
              <input value={nombre} maxLength={80} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre y apellido" className={input} />
            </label>

            <div className="rounded-2xl bg-muted/60 p-4 text-sm text-muted-foreground">
              {esCasa && <>Casa: 1 noche ${CASA[temporada][cashea ? "cashea" : "contado"][0]} · 2 noches ${CASA[temporada][cashea ? "cashea" : "contado"][1]} (hasta 16 personas).</>}
              {servicio === "lancha" && <>Lancha a La Ciénaga: ${cashea ? 12 : 10} por persona.</>}
              {servicio === "kayak" && <>Kayak 30 minutos: ${cashea ? 7 : 5} por persona.</>}
              {servicio === "boda" && <>Básico $300 contado / $350 Cashea · Full $400 contado / $450 Cashea.</>}
              {servicio === "evento" && <>El precio depende del tipo de evento. Envíanos tu solicitud y te cotizamos.</>}
            </div>
          </div>

          <div className="space-y-6">
            <div className="gradient-tropical rounded-3xl p-6 text-primary-foreground shadow-xl sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide opacity-80">Total estimado</p>
              {servicio === "evento" ? (
                <p className="mt-2 text-4xl font-bold">A cotizar</p>
              ) : (
                <>
                  <p className="mt-2 font-display text-5xl font-bold">${total}</p>
                  {esCasa && <p className="mt-1 text-sm opacity-90">{noches} noche{noches === 1 ? "" : "s"}</p>}
                  <p className="mt-3 text-lg font-semibold">{tasa > 0 ? `Bs ${(total * tasa).toLocaleString("es-VE", { minimumFractionDigits: 2 })}` : "Bs: indica la tasa del día"}</p>
                  <label className="mt-3 flex items-center gap-2 text-sm">
                    Tasa BCV (Bs/$)
                    <input type="number" min={0} step="0.01" value={tasa || ""} onChange={(e) => setTasa(Math.max(0, Number(e.target.value) || 0))}
                      className="w-28 rounded-lg bg-background/90 px-2 py-1 text-foreground" />
                  </label>
                </>
              )}
            </div>

            <div className="rounded-3xl border bg-card p-6 shadow-lg">
              <h3 className="text-lg font-bold">Formas de pago</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {PAGOS.map((p) => (
                  <button key={p.name} type="button" onClick={() => setMetodo(p.name)}
                    className={`rounded-2xl border p-3 text-left text-sm transition-colors ${metodo === p.name ? "border-primary bg-primary/10" : "hover:border-accent"}`}>
                    <p className="font-bold text-primary">{p.name}</p>
                    {p.lines.map((l) => <p key={l} className="text-muted-foreground">{l}</p>)}
                  </button>
                ))}
              </div>
              <label className="mt-4 block">
                <span className={label}>Número de referencia</span>
                <input value={referencia} maxLength={60} onChange={(e) => setReferencia(e.target.value)} placeholder="Ej: 001234567" className={input} />
              </label>
              <label className="mt-3 block">
                <span className={label}>Comprobante (imagen o PDF)</span>
                <input type="file" accept="image/*,application/pdf" onChange={(e) => setArchivo(e.target.files?.[0]?.name ?? "")}
                  className="block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:font-semibold" />
                {archivo && <span className="mt-1 block text-xs text-muted-foreground">Adjunta este archivo en el chat de WhatsApp al enviar.</span>}
              </label>
              <button type="button" disabled={!valido} onClick={enviar}
                className="mt-5 w-full rounded-full bg-gradient-to-r from-[#25D366] to-[#1ebe5d] px-6 py-3 font-bold text-white shadow-lg transition-transform enabled:hover:scale-[1.02] disabled:opacity-50">
                Confirmar reserva por WhatsApp
              </button>
              {!valido && <p className="mt-2 text-center text-xs text-muted-foreground">Completa nombre y fechas para continuar.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
