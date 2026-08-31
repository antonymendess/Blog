import { readFile } from "node:fs/promises";
import path from "node:path";
import slugify from "slugify";

export type Artigo = {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string[];
};

type ArtigoBruto = Omit<Artigo, "slug">;

const DATA_PATH = path.join(process.cwd(), "data", "artigos.json");

function gerarSlug(title: string) {
  return slugify(title, { lower: true, strict: true, locale: "pt" });
}

/**
 * Simula a busca dos artigos em uma fonte de dados externa (API ou JSON local).
 * Trocar por um fetch a uma API real (ex: crudcrud.com) exigiria apenas
 * reescrever esta função, mantendo o restante da aplicação intacto.
 */
export async function getArtigos(): Promise<Artigo[]> {
  const raw = await readFile(DATA_PATH, "utf-8");
  const artigosBrutos = JSON.parse(raw) as ArtigoBruto[];

  return artigosBrutos
    .map((artigo) => ({ ...artigo, slug: gerarSlug(artigo.title) }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArtigoBySlug(slug: string): Promise<Artigo | undefined> {
  const artigos = await getArtigos();
  return artigos.find((artigo) => artigo.slug === slug);
}
