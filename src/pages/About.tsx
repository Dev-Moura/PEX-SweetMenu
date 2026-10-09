import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClasses } from "@/components/ui/buttonClasses";
import {
  ClockIcon,
  MapPinIcon,
  SparkleIcon,
  WhatsappIcon,
} from "@/components/ui/icons";
import { store } from "@/data/store";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const values = [
  {
    emoji: "🤝",
    title: "Atendimento de bairro",
    text: "Conhecemos nossos clientes pelo nome e caprichamos em cada pedido.",
  },
  {
    emoji: "🌱",
    title: "Ingredientes selecionados",
    text: "Escolhemos matéria-prima de qualidade para um sabor de casa.",
  },
  {
    emoji: "⚡",
    title: "Rapidez no balcão",
    text: "Impressão, encadernação e cópias resolvidas na hora.",
  },
];

export default function About() {
  useDocumentTitle(
    "Sobre",
    "Conheça a história da Doceria & Papelaria Long River, um pedacinho do bairro há mais de 10 anos.",
  );

  const whatsappLink = buildWhatsAppLink(
    store.whatsapp,
    "Olá! Gostaria de conhecer melhor a Long River.",
  );

  return (
    <Container className="py-12">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
            <SparkleIcon className="h-4 w-4 text-accent-500" />
            Nossa história
          </span>
          <h1 className="text-4xl font-extrabold text-ink-900 sm:text-5xl">
            Mais que uma loja, um cantinho do bairro
          </h1>
          <p className="text-lg text-ink-500">
            A {store.shortName} nasceu da vontade de unir duas paixões: a
            confeitaria artesanal e a papelaria de esquina. Há mais de 10 anos
            servimos doces feitos na hora e ajudamos estudantes, escritórios e
            famílias com material e serviços.
          </p>
          <p className="text-ink-500">{store.description}</p>

          <div className="flex flex-wrap gap-3">
            <Link to="/menu" className={buttonClasses()}>
              Ver cardápio
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className={buttonClasses({ variant: "outline" })}
            >
              <WhatsappIcon className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {["🍰", "📚", "🍫", "✏️"].map((emoji, index) => (
            <div
              key={index}
              className={`flex aspect-square items-center justify-center rounded-3xl text-6xl shadow-soft ${
                index % 2 === 0
                  ? "bg-brand-100 translate-y-3"
                  : "bg-paper-100 -translate-y-3"
              }`}
              aria-hidden
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>

      <section className="mt-20">
        <SectionHeading
          align="center"
          eyebrow="Nossos valores"
          title="O que nos move todos os dias"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="flex flex-col gap-3 rounded-3xl border border-ink-100 bg-white p-6 text-center shadow-soft"
            >
              <span className="text-4xl" aria-hidden>
                {value.emoji}
              </span>
              <h3 className="font-bold text-ink-900">{value.title}</h3>
              <p className="text-sm text-ink-500">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-6 rounded-3xl bg-brand-600 p-8 text-white sm:grid-cols-2 sm:p-12">
        <div className="flex flex-col gap-3">
          <MapPinIcon className="h-8 w-8 text-brand-100" />
          <h2 className="text-2xl font-bold">Onde nos encontrar</h2>
          <p className="text-brand-100">
            {store.address}
            <br />
            {store.city}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <ClockIcon className="h-8 w-8 text-brand-100" />
          <h2 className="text-2xl font-bold">Horários</h2>
          <ul className="flex flex-col gap-1 text-brand-100">
            {store.hours.map((hour) => (
              <li key={hour.label}>
                <span className="font-semibold text-white">{hour.label}:</span>{" "}
                {hour.value}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Container>
  );
}
