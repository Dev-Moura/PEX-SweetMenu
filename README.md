# PEX-SweetMenu — Doceria & Papelaria Long River

Site institucional e catálogo digital da **Doceria & Papelaria Long River**. Os clientes
navegam pelo cardápio de doces e pelos produtos/serviços de papelaria, montam um carrinho
e finalizam o pedido diretamente pelo **WhatsApp** da loja.

## ✨ Recursos

- Catálogo com busca e filtro por categoria
- Detalhe do produto com imagem, descrição e quantidade
- Carrinho lateral (drawer) com persistência em `localStorage`
- Finalização do pedido via WhatsApp com resumo automático
- Layout responsivo (mobile-first) e acessível
- Página 404 e Error Boundary
- SEO básico por rota (título/descrição)

## 🧱 Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 7](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/) (configuração CSS-first via `@theme`)
- [React Router 7](https://reactrouter.com/)

## 🚀 Como rodar

```bash
npm install
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
npm run preview  # pré-visualiza o build
npm run lint     # análise estática
```

## 📁 Estrutura

```
src/
  components/        Componentes de UI e de negócio (componentes/ e ui/)
  context/           CartContext e ToastContext
  data/              Dados locais (catálogo e informações da loja)
  hooks/             Hooks reutilizáveis
  lib/               Utilitários (formatação de moeda, link do WhatsApp)
  pages/             Páginas da aplicação
  types.ts           Tipos compartilhados
```

## 🛠️ Personalização

- **Produtos:** edite `src/data/catalog.ts`.
- **Contato, horários e redes:** edite `src/data/store.ts`.
- **Fotos reais:** coloque as imagens em `public/images/` e aponte o campo
  `image` de cada produto. Sem foto, um placeholder da marca é exibido.

## 📄 Licença

MIT — veja [LICENSE](LICENSE).
