import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArtigoBySlug, getArtigos } from "@/lib/artigos";

export const dynamic = "force-static";
export const dynamicParams = false;

type ArtigoPageProps = {
  params: Promise<{ slug: string }>;
};

function formatarData(data: string) {
  return new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  const artigos = await getArtigos();
  return artigos.map((artigo) => ({ slug: artigo.slug }));
}

export async function generateMetadata({ params }: ArtigoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artigo = await getArtigoBySlug(slug);

  if (!artigo) {
    return {
      title: "Artigo não encontrado",
      description: "O artigo solicitado não existe ou foi removido.",
    };
  }

  return {
    title: artigo.title,
    description: artigo.excerpt,
    authors: [{ name: artigo.author }],
    openGraph: {
      type: "article",
      title: artigo.title,
      description: artigo.excerpt,
      publishedTime: artigo.date,
      authors: [artigo.author],
    },
    twitter: {
      card: "summary",
      title: artigo.title,
      description: artigo.excerpt,
    },
  };
}

export default async function ArtigoPage({ params }: ArtigoPageProps) {
  const { slug } = await params;
  const artigo = await getArtigoBySlug(slug);

  if (!artigo) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <Link
        href="/"
        className="text-sm font-medium text-zinc-500 hover:underline underline-offset-4 dark:text-zinc-400"
      >
        ← Voltar para todos os artigos
      </Link>

      <article className="mt-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">{artigo.title}</h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Por <span className="font-medium">{artigo.author}</span> ·{" "}
            <time dateTime={artigo.date}>{formatarData(artigo.date)}</time>
          </p>
        </header>

        <div className="mt-8 flex flex-col gap-4 text-zinc-800 dark:text-zinc-200">
          {artigo.content.map((paragrafo, indice) => (
            <p key={indice} className="leading-7">
              {paragrafo}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}
