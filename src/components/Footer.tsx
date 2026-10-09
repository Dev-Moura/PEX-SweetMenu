import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Container } from "./ui/Container";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "./ui/icons";
import { store } from "@/data/store";

const quickLinks = [
  { to: "/menu", label: "Cardápio" },
  { to: "/servicos", label: "Papelaria & Serviços" },
  { to: "/sobre", label: "Sobre a loja" },
  { to: "/carrinho", label: "Meu carrinho" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-ink-100 bg-white">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="text-sm leading-relaxed text-ink-500">
            {store.description}
          </p>
          <div className="flex gap-2">
            {store.social.instagram && (
              <a
                href={store.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram da Long River"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-100 text-ink-700 transition-colors hover:bg-brand-100 hover:text-brand-700"
              >
                <InstagramIcon />
              </a>
            )}
            {store.social.facebook && (
              <a
                href={store.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook da Long River"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-100 text-ink-700 transition-colors hover:bg-brand-100 hover:text-brand-700"
              >
                <FacebookIcon />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-ink-900">
            Navegação
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-ink-500 transition-colors hover:text-brand-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-ink-900">
            Contato
          </h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-500">
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
              <span>
                {store.address}
                <br />
                {store.city}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5 shrink-0 text-brand-500" />
              <a href={`tel:${store.phone}`} className="hover:text-brand-600">
                {store.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MailIcon className="h-5 w-5 shrink-0 text-brand-500" />
              <a
                href={`mailto:${store.email}`}
                className="hover:text-brand-600"
              >
                {store.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-ink-900">
            Horários
          </h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-500">
            {store.hours.map((hour) => (
              <li key={hour.label} className="flex items-start gap-2">
                <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                <span>
                  <span className="block font-semibold text-ink-700">
                    {hour.label}
                  </span>
                  {hour.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-ink-100">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {store.name}. Todos os direitos
            reservados.
          </p>
          <p>Feito com carinho para o nosso bairro 💛</p>
        </Container>
      </div>
    </footer>
  );
}
