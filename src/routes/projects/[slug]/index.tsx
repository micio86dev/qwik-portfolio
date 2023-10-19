import { component$, Resource } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type {
  DocumentHead,
  // StaticGenerateHandler,
} from "@builder.io/qwik-city";
import type { Project } from "~/types";
import { SITE } from "~/config.mjs";
import md from "markdown-it";
import { fetchProjects, findProjectBySlug } from "~/utils/projects";
import Spinner from "~/components/atoms/Spinner";
import Title from "~/components/atoms/Title";
import Term from "~/components/widgets/Term/Term";

export const useGetProjectBySlug = routeLoader$(
  async ({ params, status }): Promise<Project> => {
    await fetchProjects();
    const project = await findProjectBySlug(params.slug);

    if (!project) {
      status(404);
    }

    return project as Project;
  },
);

export default component$(() => {
  const data = useGetProjectBySlug();

  return (
    <Resource
      value={data}
      onPending={() => <Spinner />}
      onRejected={() => <div class="notification is-danger">Error</div>}
      onResolved={(project: Project) => (
        <section class="mx-auto py-8 sm:py-16 lg:py-20">
          <article>
            <header>
              <Title>{project?.name}</Title>
            </header>

            <div
              class="content py-2"
              dangerouslySetInnerHTML={
                project?.content &&
                md({
                  html: true,
                }).render(project.content)
              }
            />

            <Term delay={1000} speed={10} text={project?.description} />
          </article>
        </section>
      )}
    />
  );
});

/*export const onStaticGenerate: StaticGenerateHandler = async () => {
  const projects = (await fetchProjects()) as [];

  return {
    params: projects,
  };
};*/

export const head: DocumentHead = ({ resolveValue }) => {
  const project = resolveValue(useGetProjectBySlug);

  return {
    title: `${project?.name} — ${SITE.name}`,
    meta: [
      {
        name: "description",
        content: project?.content
          ? md({
              html: false,
            }).render(project?.content)
          : "",
      },
    ],
  };
};
