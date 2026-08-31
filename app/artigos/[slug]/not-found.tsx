import Link from "next/link";

export default function ArtigoNaoEncontrado() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-12 text-center">
      <h1 className="text-2xl font-bold">Artigo não encontrado</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        O artigo que você procura não existe ou foi removido.
      </p>
      <Link
        href="/"
        className="mt-6 text-sm font-medium hover:underline underline-offset-4"
      >
        ← Voltar para todos os artigos
      </Link>
    </main>
  );
}
