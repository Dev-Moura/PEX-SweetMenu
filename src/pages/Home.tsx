import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { buttonClasses } from "@/components/ui/buttonClasses";
import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  SparkleIcon,
  WhatsappIcon,
} from "@/components/ui/icons";
import { featuredProducts } from "@/data/catalog";
import { store } from "@/data/store";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const highlights = [
  {
    emoji: "🧑‍🍳",
    title: "Feito na hora",
    text: "Doces e salgados preparados fresquinhos todos os dias.",
  },
  {
    emoji: "🛵",
    title: "Entrega no bairro",
    text: "Combine a entrega rapidinho pelo WhatsApp.",
  },
  {
    emoji: "✏️",
    title: "Papelaria completa",
    text: "Material escolar, impressão e encadernação em um só lugar.",
  },
];

export default function Home() {
  useDocumentTitle(
    undefined,
    "Doceria & Papelaria Long River: doces artesanais, bolos, salgados e papelaria completa. Peça pelo WhatsApp.",
  );

  const whatsappLink = buildWhatsAppLink(
    store.whatsapp,
    "Olá! Vi o site da Long River e gostaria de fazer um pedido.",
  );

  return (
    <>
      <section className="relative overflow-hidden bg-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream/80 to-cream" />
        <Container className="relative grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-soft">
              <SparkleIcon className="h-4 w-4 text-accent-500" />
              {store.tagline}
            </span>

            <h1 className="text-4xl font-extrabold leading-[1.1] text-ink-900 sm:text-5xl">
              Um pedacinho de doçura
              <span className="block text-brand-600">no seu dia a dia</span>
            </h1>

            <p className="max-w-lg text-lg text-ink-500">
              {store.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/menu" className={buttonClasses({ size: "lg" })}>
                Ver cardápio
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link
                to="/servicos"
                className={buttonClasses({ variant: "outline", size: "lg" })}
              >
                Papelaria &amp; serviços
              </Link>
            </div>

            <dl className="mt-2 flex gap-8">
              <div>
                <dt className="text-2xl font-extrabold text-brand-600">+10</dt>
                <dd className="text-sm text-ink-500">anos de bairro</dd>
              </div>
              <div>
                <dt className="text-2xl font-extrabold text-brand-600">
                  +40
                </dt>
                <dd className="text-sm text-ink-500">itens no cardápio</dd>
              </div>
              <div>
                <dt className="text-2xl font-extrabold text-brand-600">4,9</dt>
                <dd className="text-sm text-ink-500">avaliação dos clientes</dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="grid grid-cols-2 gap-4">
              {[
                { emoji: "🍰", className: "bg-brand-100" },
                { emoji: "🍫", className: "bg-accent-100" },
                { emoji: "📒", className: "bg-paper-100" },
                { emoji: "🧁", className: "bg-brand-100" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex aspect-square items-center justify-center rounded-3xl text-6xl shadow-soft ${item.className} ${
                    index % 2 === 0 ? "translate-y-3" : "-translate-y-3"
                  }`}
                  aria-hidden
                >
                  {item.emoji}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-3xl border border-ink-100 bg-white p-6 shadow-soft"
            >
              <span className="text-3xl" aria-hidden>
                {item.emoji}
              </span>
              <div>
                <h3 className="font-bold text-ink-900">{item.title}</h3>
                <p className="mt-1 text-sm text-ink-500">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container className="py-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Favoritos da casa"
            title="Destaques do cardápio"
            description="Uma seleção do que sai mais da nossa vitrine."
          />
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Ver tudo <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>

      <Container className="py-14">
        <div className="grid items-center gap-10 rounded-3xl bg-ink-900 p-8 text-white sm:p-12 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Passe na loja ou peça de casa
            </h2>
            <p className="text-ink-300">
              Estamos pertinho de você. Faça seu pedido pelo WhatsApp ou venha
              tomar um café com a gente.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className={buttonClasses({
                variant: "whatsapp",
                size: "lg",
                className: "self-start",
              })}
            >
              <WhatsappIcon />
              Chamar no WhatsApp
            </a>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 h-6 w-6 shrink-0 text-accent-400" />
              <div>
                <p className="font-semibold">{store.address}</p>
                <p className="text-sm text-ink-300">{store.city}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ClockIcon className="mt-0.5 h-6 w-6 shrink-0 text-accent-400" />
              <div className="flex flex-col gap-1">
                {store.hours.map((hour) => (
                  <p key={hour.label} className="text-sm text-ink-300">
                    <span className="font-semibold text-white">
                      {hour.label}:
                    </span>{" "}
                    {hour.value}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
