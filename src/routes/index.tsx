import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import casaImg from "@/assets/casa.jpg";
import eventosImg from "@/assets/eventos.jpg";
import aventurasImg from "@/assets/aventuras.jpg";
import alianzasImg from "@/assets/alianzas.jpg";
import logoAsset from "@/assets/logo.png.asset.json";

const WHATSAPP_NUMBER = "584243312563";
const WHATSAPP_MSG =
  "¡Hola Ocumare Turismo! Quiero más información para reservar mi experiencia en la playa.";

const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ocumare Turismo Pro C.A — Vive la mejor experiencia playera en Ocumare" },
      {
        name: "description",
        content:
          "Casa vacacional de playa para 16 personas, bodas a la orilla del mar, aventuras en La Ciénaga y alianzas de hospedaje. Tu viaje a Ocumare en un solo lugar.",
      },
      { property: "og:title", content: "Ocumare Turismo Pro C.A — Vive la mejor experiencia playera en Ocumare" },
      {
        property: "og:description",
        content:
          "Casa vacacional, eventos, aventuras en La Ciénaga y alianzas de hospedaje en Ocumare. Reserva por WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  {
    img: casaImg,
    title: "Casa Vacacional de Playa",
    desc: "Hospedaje exclusivo totalmente equipado con capacidad para hasta 16 personas. Tu hogar frente al mar, con todas las comodidades para una estadía inolvidable.",
    tag: "Hospedaje",
  },
  {
    img: eventosImg,
    title: "Organización de Eventos",
    desc: "Bodas soñadas a la orilla del mar y fiestas en general. Convertimos tu celebración en un momento mágico con el océano de escenario.",
    tag: "Eventos",
  },
  {
    img: aventurasImg,
    title: "Aventuras a La Ciénaga",
    desc: "Traslados en lancha, paseos en Banana, kayak y snorkeling. Aventura y naturaleza en las aguas turquesa de La Ciénaga.",
    tag: "Aventura",
  },
  {
    img: alianzasImg,
    title: "Alianzas de Hospedaje",
    desc: "Red de contactos con posadas, hoteles y casas vacacionales. Te guiamos según tu presupuesto para que elijas el lugar ideal.",
    tag: "Aliados",
  },
];

const trust = [
  {
    icon: "🌊",
    title: "Experiencia local",
    desc: "Conocemos Ocumare y La Ciénaga como nadie. Te llevamos a los mejores rincones de la costa.",
  },
  {
    icon: "🤝",
    title: "Atención personalizada",
    desc: "Te acompañamos antes, durante y después de tu viaje. Trato cercano y humano en cada detalle.",
  },
  {
    icon: "📍",
    title: "Todo en un solo lugar",
    desc: "Hospedaje, eventos y aventuras coordinados por un mismo equipo. Tú solo relájate y disfruta.",
  },
  {
    icon: "🏝️",
    title: "Pasión por el caribe",
    desc: "Cada experiencia está pensada para que vivas el verdadero espíritu tropical de Ocumare.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 glass-card">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#inicio" className="flex min-w-0 items-center gap-3">
            <img
              src={logoAsset.url}
              alt="Ocumare Turismo Pro"
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-accent/60"
            />
            <span className="hidden font-display text-lg font-extrabold tracking-tight text-primary sm:inline sm:text-xl">
              Ocumare Turismo
            </span>
          </a>
          <div className="hidden items-center gap-6 font-body text-sm font-medium text-foreground/80 md:flex">
            <a href="#servicios" className="transition-colors hover:text-primary">Servicios</a>
            <a href="#confianza" className="transition-colors hover:text-primary">Por qué elegirnos</a>
            <a href="#contacto" className="transition-colors hover:text-primary">Contacto</a>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-gradient-to-r from-[#25D366] to-[#1ebe5d] px-4 py-2 text-sm font-bold text-white shadow-md shadow-[#25D366]/30 transition-transform hover:scale-105"
          >
            WhatsApp
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="inicio" className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Combi playera frente al mar turquesa de Ocumare al atardecer"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-32 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
            🌴 Ocumare · Venezuela
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-6xl md:text-7xl">
            Descansa, celebra y vive{" "}
            <span className="text-gradient-gold">Ocumare</span> a tu medida.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-white/90 drop-shadow sm:text-xl">
            Casa playera, bodas a la orilla del mar, aventuras en La Ciénaga y
            hospedaje a tu medida. Tu viaje tropical empieza aquí.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full bg-gradient-to-r from-[#25D366] to-[#1ebe5d] px-8 py-4 text-base font-bold text-white shadow-xl shadow-[#25D366]/40 transition-transform hover:scale-105 sm:w-auto"
            >
              💬 Reservar por WhatsApp
            </a>
            <a
              href="#servicios"
              className="w-full rounded-full bg-white/15 px-8 py-4 text-base font-bold text-white ring-2 ring-white/50 backdrop-blur-md transition-colors hover:bg-white/25 sm:w-auto"
            >
              Nuestros Servicios
            </a>
          </div>
        </div>
        <a
          href="#servicios"
          aria-label="Ir a servicios"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/80 transition-colors hover:text-white"
        >
          <span className="block animate-bounce text-2xl">↓</span>
        </a>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-accent">
              Nuestros Servicios
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-5xl">
              Todo para tu viaje a Ocumare
            </h2>
            <p className="mt-4 font-body text-foreground/70 sm:text-lg">
              Cuatro experiencias pensadas para que disfrutes el caribe sin
              preocuparte por nada.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {services.map((s) => (
              <article
                key={s.title}
                className="group overflow-hidden rounded-3xl bg-card shadow-lg ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-accent/50"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground shadow">
                    {s.tag}
                  </span>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-3 font-body text-foreground/70">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-ocean px-8 py-4 text-base font-bold text-white shadow-xl shadow-primary/30 transition-transform hover:scale-105"
            >
              Consultar disponibilidad
            </a>
          </div>
        </div>
      </section>

      {/* CONFIANZA */}
      <section id="confianza" className="relative overflow-hidden py-20 sm:py-28">
        <div className="gradient-tropical absolute inset-0 opacity-95" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-gold">
              Por qué elegirnos
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-5xl">
              Confianza que se siente
            </h2>
            <p className="mt-4 font-body text-white/85 sm:text-lg">
              No es solo un viaje, es una experiencia cuidada de principio a fin.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t) => (
              <div
                key={t.title}
                className="rounded-3xl bg-white/15 p-6 text-center ring-1 ring-white/25 backdrop-blur-md transition-transform hover:-translate-y-1"
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/20 text-3xl">
                  {t.icon}
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-white">
                  {t.title}
                </h3>
                <p className="mt-2 font-body text-sm text-white/85">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-[2rem] bg-card shadow-2xl ring-1 ring-border">
            <div className="grid md:grid-cols-2">
              <div className="gradient-tropical p-8 text-white sm:p-12">
                <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
                  Hablemos de tu viaje
                </h2>
                <p className="mt-4 font-body text-white/85">
                  Escríbenos por WhatsApp y te respondemos al instante. Te
                  ayudamos a armar tu experiencia ideal en Ocumare.
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-5 text-lg font-bold text-white shadow-xl shadow-black/20 transition-transform hover:scale-[1.02]"
                >
                  💬 Reservar por WhatsApp
                </a>
                <p className="mt-4 text-center text-sm text-white/70">
                  Respuesta rápida en horario comercial
                </p>
              </div>
              <div className="p-8 sm:p-12">
                <h3 className="font-display text-xl font-bold text-foreground">
                  Datos de contacto
                </h3>
                <ul className="mt-6 space-y-4 font-body text-foreground/80">
                  <li className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                      📍
                    </span>
                    <span>Ocumare de la Costa, Venezuela</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                      📱
                    </span>
                    <a href={waLink} className="hover:text-primary">
                      WhatsApp directo
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                      🌐
                    </span>
                    <span>Síguenos en redes sociales</span>
                  </li>
                </ul>

                <div className="mt-8 flex gap-3">
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
                  >
                    IG
                  </a>
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="grid h-11 w-11 place-items-center rounded-full bg-ocean text-white transition-transform hover:scale-110"
                  >
                    FB
                  </a>
                  <a
                    href="#"
                    aria-label="TikTok"
                    className="grid h-11 w-11 place-items-center rounded-full bg-foreground text-background transition-transform hover:scale-110"
                  >
                    TT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-3">
              <img
                src={logoAsset.url}
                alt="Ocumare Turismo Pro"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white/40"
              />
              <div>
                <p className="font-display text-lg font-bold">Ocumare Turismo pro C.A</p>
                <p className="text-sm text-primary-foreground/70">RIF: J-501525862</p>
              </div>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-primary-foreground/80">
              <a href="#servicios" className="hover:text-white">Servicios</a>
              <a href="#confianza" className="hover:text-white">Por qué elegirnos</a>
              <a href="#contacto" className="hover:text-white">Contacto</a>
            </nav>
          </div>
          <div className="mt-8 border-t border-white/15 pt-6 text-center text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Ocumare Turismo pro C.A · RIF: J-501525862 · Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOATING */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Reservar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-2xl shadow-[#25D366]/40 transition-transform hover:scale-110"
      >
        💬
      </a>
    </div>
  );
}
