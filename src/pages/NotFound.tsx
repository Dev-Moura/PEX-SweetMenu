import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/buttonClasses";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Página não encontrada");

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
      <span className="font-display text-7xl font-extrabold text-brand-600">
        404
      </span>
      <h1 className="text-3xl font-extrabold text-ink-900">
        Página não encontrada
      </h1>
      <p className="max-w-md text-ink-500">
        A página que você procura pode ter saído do forno. Volte ao início ou
        confira o cardápio.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/" className={buttonClasses()}>
          Voltar ao início
        </Link>
        <Link to="/menu" className={buttonClasses({ variant: "outline" })}>
          Ver cardápio
        </Link>
      </div>
    </Container>
  );
}
