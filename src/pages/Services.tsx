import { Container } from "@/components/ui/Container";
import { CatalogView } from "@/components/CatalogView";
import { WhatsappIcon } from "@/components/ui/icons";
import { buttonClasses } from "@/components/ui/buttonClasses";
import { catalog, categories } from "@/data/catalog";
import { store } from "@/data/store";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const paperItems = catalog.filter(
  (product) => product.category === "papelaria",
);

const paperFilters = categories.filter(
  (category) => category.id === "papelaria",
);

export default function Services() {
  useDocumentTitle(
    "Papelaria & Serviços",
    "Material escolar, impressão, encadernação e muito mais na Papelaria Long River.",
  );

  const whatsappLink = buildWhatsAppLink(
    store.whatsapp,
    "Olá! Gostaria de um orçamento de impressão/serviço de papelaria.",
  );

  return (
    <Container className="py-12">
      <header className="mb-8 flex flex-col gap-2">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-paper-600">
          Papelaria Long River
        </span>
        <h1 className="text-4xl font-extrabold text-ink-900">
          Papelaria &amp; Serviços
        </h1>
        <p className="max-w-2xl text-ink-500">
          Material escolar, escritório, impressão e encadernação — tudo em um
          só lugar.
        </p>
      </header>

      <div className="mb-8 flex flex-col items-start justify-between gap-4 rounded-3xl border border-paper-100 bg-paper-50 p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-bold text-ink-900">
            Precisa imprimir ou encadernar?
          </h2>
          <p className="mt-1 text-sm text-ink-500">
            Envie o arquivo pelo WhatsApp que a gente prepara tudo pra você.
          </p>
        </div>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className={buttonClasses({
            variant: "whatsapp",
            className: "shrink-0",
          })}
        >
          <WhatsappIcon className="h-4 w-4" />
          Enviar arquivo
        </a>
      </div>

      <CatalogView products={paperItems} categories={paperFilters} />
    </Container>
  );
}
