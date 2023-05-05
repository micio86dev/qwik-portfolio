import { component$, Resource } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type {
  DocumentHead,
  // StaticGenerateHandler,
} from "@builder.io/qwik-city";
import type { New } from "~/types";
import { SITE } from "~/config.mjs";
import md from "markdown-it";
import { fetchNews, findNewBySlug } from "~/utils/news";
import Spinner from "~/components/atoms/Spinner";
import Title from "~/components/atoms/Title";
import Term from "~/components/widgets/Term/Term";

export const useGetNewBySlug = routeLoader$(
  async ({ params, status }): Promise<New> => {
    await fetchNews();
    const news = await findNewBySlug(params.slug);

    if (!news) {
      status(404);
    }

    return news as New;
  }
);

export default component$(() => {
  const data = useGetNewBySlug();

  return (
    <Resource
      value={data}
      onPending={() => <Spinner />}
      onRejected={() => <div class="notification is-danger">Error</div>}
      onResolved={(news: New) => (
        <section class="mx-auto py-8 sm:py-16 lg:py-20">
          <article>
            <header>
              <Title>{news?.title}</Title>
            </header>

            <div
              class="content py-2"
              dangerouslySetInnerHTML={
                news?.content &&
                md({
                  html: true,
                }).render(news.content)
              }
            />

            <Term delay={1000} speed={10} text={news?.description} />
          </article>
        </section>
      )}
    />
  );
});

/*export const onStaticGenerate: StaticGenerateHandler = async () => {
  const news = (await fetchNews()) as [];

  return {
    params: news,
  };
};*/

export const head: DocumentHead = ({ resolveValue }) => {
  const news = resolveValue(useGetNewBySlug);

  return {
    title: `${news?.title} — ${SITE.name}`,
    meta: [
      {
        name: "description",
        content: news?.content
          ? md({
              html: false,
            }).render(news?.content)
          : "",
      },
    ],
  };
};
