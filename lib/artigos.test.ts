import { describe, expect, it } from "vitest";
import { getArtigoBySlug, getArtigos } from "./artigos";

describe("getArtigos", () => {
  it("retorna artigos com slug, autor, data e conteúdo válidos", async () => {
    const artigos = await getArtigos();

    expect(artigos.length).toBeGreaterThan(0);
    for (const artigo of artigos) {
      expect(artigo.slug).toMatch(/^[a-z0-9-]+$/);
      expect(artigo.title).toBeTruthy();
      expect(artigo.author).toBeTruthy();
      expect(artigo.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(artigo.content.length).toBeGreaterThan(0);
    }
  });

  it("ordena os artigos do mais recente para o mais antigo", async () => {
    const artigos = await getArtigos();
    const datas = artigos.map((artigo) => artigo.date);
    const datasOrdenadas = [...datas].sort().reverse();

    expect(datas).toEqual(datasOrdenadas);
  });
});

describe("getArtigoBySlug", () => {
  it("encontra um artigo existente pelo slug gerado a partir do título", async () => {
    const [primeiro] = await getArtigos();
    const encontrado = await getArtigoBySlug(primeiro.slug);

    expect(encontrado?.title).toBe(primeiro.title);
  });

  it("retorna undefined para um slug inexistente", async () => {
    const encontrado = await getArtigoBySlug("slug-que-nao-existe");

    expect(encontrado).toBeUndefined();
  });
});
