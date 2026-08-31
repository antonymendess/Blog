# Blog — Next.js 15 App Router

Aplicação de blog com artigos carregados dinamicamente via rotas personalizadas, dados vindos de um JSON local e metadados de SEO gerados dinamicamente por artigo, usando o App Router do Next.js 15.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- TypeScript
- Tailwind CSS
- [slugify](https://www.npmjs.com/package/slugify) para gerar as URLs dos artigos a partir do título

## Estrutura

```
app/
  page.tsx                  # Home: lista todos os artigos (SSG, force-static)
  artigos/[slug]/page.tsx   # Página de um artigo (SSG via generateStaticParams + generateMetadata)
  artigos/[slug]/not-found.tsx
data/
  artigos.json              # Fonte de dados dos artigos
lib/
  artigos.ts                # Funções assíncronas que "buscam" os artigos (getArtigos / getArtigoBySlug)
```

## Fonte de dados

Os artigos são lidos de [data/artigos.json](data/artigos.json) por funções assíncronas em [lib/artigos.ts](lib/artigos.ts), chamadas diretamente dentro dos Server Components (`app/page.tsx` e `app/artigos/[slug]/page.tsx`) — sem `useEffect`, sem estado de loading no cliente. Cada artigo recebe um slug gerado a partir do título com `slugify`.

Para trocar por uma API real (ex: `crudcrud.com`), basta reescrever o corpo de `getArtigos` em `lib/artigos.ts` para fazer um `fetch` — o restante da aplicação (rotas, componentes, SEO) não precisa mudar.

## Renderização e SEO

- A home (`app/page.tsx`) usa `export const dynamic = "force-static"`: como o JSON muda raramente, o conteúdo é pré-renderizado como HTML estático (SSG).
- `app/artigos/[slug]/page.tsx` usa `generateStaticParams` para pré-gerar uma página estática por artigo em tempo de build.
- `generateMetadata` gera `title`, `description` e Open Graph específicos para cada artigo, buscando o conteúdo pelo `slug` recebido via `params` (Promise, conforme a API do Next.js 15).
- Slug inexistente aciona `notFound()`, renderizando `not-found.tsx`.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build de produção

```bash
npm run build
npm run start
```

## Deploy

Projeto pronto para deploy na [Vercel](https://vercel.com): basta importar o repositório do GitHub, sem variáveis de ambiente obrigatórias (opcionalmente defina `NEXT_PUBLIC_SITE_URL` com a URL final de produção, usada no `metadataBase`).
