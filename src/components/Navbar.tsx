import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { CartIcon, CloseIcon, MenuIcon } from "./ui/icons";
import { Container } from "./ui/Container";
import { useCart } from "@/hooks/useCart";

const links = [
  { to: "/", label: "Início", end: true },
  { to: "/menu", label: "Cardápio" },
  { to: "/servicos", label: "Papelaria" },
  { to: "/sobre", label: "Sobre" },
];

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
    isActive
      ? "bg-brand-100 text-brand-700"
      : "text-ink-600 hover:bg-ink-100 hover:text-ink-900",
  ].join(" ");

export function Navbar() {
  const { itemCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-cream/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Abrir carrinho (${itemCount} ${
              itemCount === 1 ? "item" : "itens"
            })`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-700 shadow-soft transition-colors hover:text-brand-600"
          >
            <CartIcon />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-700 shadow-soft md:hidden"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Menu"
          className="animate-fade-in border-t border-ink-100 bg-cream px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      "block rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                      isActive
                        ? "bg-brand-100 text-brand-700"
                        : "text-ink-700 hover:bg-ink-100",
                    ].join(" ")
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
