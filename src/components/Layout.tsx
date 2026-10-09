import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { WhatsappIcon } from "./ui/icons";
import { store } from "@/data/store";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function Layout() {
  const whatsappLink = buildWhatsAppLink(
    store.whatsapp,
    "Olá! Gostaria de tirar uma dúvida com a Long River.",
  );

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <Navbar />

      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <CartDrawer />

      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Long River no WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-card transition-transform duration-200 hover:scale-105"
      >
        <WhatsappIcon className="h-7 w-7" />
      </a>
    </div>
  );
}
