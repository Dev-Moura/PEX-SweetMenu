import { Component, type ErrorInfo, type ReactNode } from "react";
import { buttonClasses } from "./ui/buttonClasses";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Erro não tratado na aplicação:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
          <span className="text-5xl" aria-hidden>
            🍰
          </span>
          <h1 className="text-2xl font-bold text-ink-900">
            Algo deu errado por aqui
          </h1>
          <p className="max-w-md text-ink-500">
            Não conseguimos carregar esta página. Recarregue a página para
            tentar novamente.
          </p>
          <button
            type="button"
            onClick={() => window.location.assign("/")}
            className={buttonClasses()}
          >
            Voltar para o início
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
