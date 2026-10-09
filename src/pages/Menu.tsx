import { Container } from "@/components/ui/Container";
import { CatalogView } from "@/components/CatalogView";
import { catalog, categories } from "@/data/catalog";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const foodCategories = ["doces", "bolos", "salgados"];

const foodItems = catalog.filter((product) =>
  foodCategories.includes(product.category),
);

const foodFilters = categories.filter((category) =>
  foodCategories.includes(category.id),
);

export default function Menu() {
  useDocumentTitle(
    "Cardápio",
    "Doces artesanais, bolos caseiros e salgados fresquinhos da Long River. Peça pelo WhatsApp.",
  );

  return (
    <Container className="py-12">
      <header className="mb-8 flex flex-col gap-2">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
          Nossa vitrine
        </span>
        <h1 className="text-4xl font-extrabold text-ink-900">
          Cardápio de Doces &amp; Salgados
        </h1>
        <p className="max-w-2xl text-ink-500">
          Tudo preparado na hora. Adicione os itens ao carrinho e finalize o
          pedido pelo WhatsApp.
        </p>
      </header>

      <CatalogView products={foodItems} categories={foodFilters} />
    </Container>
  );
}
