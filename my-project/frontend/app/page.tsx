export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">Универсальный веб-проект Next.js + Strapi</h1>
      </div>

      <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-4 text-center">Технологии проекта:</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Next.js с App Router</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Strapi CMS</li>
          <li>PostgreSQL</li>
          <li>Docker</li>
        </ul>
      </div>

      <div className="mt-16 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left max-w-5xl w-full gap-8">
        <a
          href="https://nextjs.org/docs"
          className="group rounded-lg border border-transparent px-5 py-4 dark:border-gray-700 hover:border-primary-500 hover:bg-gray-100 dark:hover:bg-gray-900"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold text-primary-600">
            Next.js 
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              &rarr;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-70">
            Документация по Next.js и примеры использования
          </p>
        </a>

        <a
          href="https://docs.strapi.io/"
          className="group rounded-lg border border-transparent px-5 py-4 dark:border-gray-700 hover:border-primary-500 hover:bg-gray-100 dark:hover:bg-gray-900"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold text-primary-600">
            Strapi
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              &rarr;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-70">
            Изучите возможности Strapi CMS для управления контентом
          </p>
        </a>

        <a
          href="https://tailwindcss.com/docs"
          className="group rounded-lg border border-transparent px-5 py-4 dark:border-gray-700 hover:border-primary-500 hover:bg-gray-100 dark:hover:bg-gray-900"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold text-primary-600">
            Tailwind CSS
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              &rarr;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-70">
            Руководство по использованию и компоненты Tailwind CSS
          </p>
        </a>
      </div>
    </main>
  );
} 