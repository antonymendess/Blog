import Link from "next/link";
import { getArtigos } from "@/lib/artigos";

export const dynamic = "force-static";

function formatarData(data: string) {
  return new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function HomePage() {
  const artigos = await getArtigos();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Artigos</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Conteúdo sobre Next.js, App Router e boas práticas de desenvolvimento web.
      </p>

      <ul className="mt-10 flex flex-col gap-8">
        {artigos.map((artigo) => (
          <li key={artigo.slug} className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
            <article>
              <h2 className="text-xl font-semibold">
                <Link
                  href={`/artigos/${artigo.slug}`}
                  className="hover:underline underline-offset-4"
                >
                  {artigo.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                <span>{artigo.author}</span>
                {" · "}
                <time dateTime={artigo.date}>{formatarData(artigo.date)}</time>
              </p>
              <p className="mt-3 text-zinc-700 dark:text-zinc-300">{artigo.excerpt}</p>
              <Link
                href={`/artigos/${artigo.slug}`}
                className="mt-3 inline-block text-sm font-medium text-zinc-950 hover:underline underline-offset-4 dark:text-zinc-50"
              >
                Ler artigo →
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
