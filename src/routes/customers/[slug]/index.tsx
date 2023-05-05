import { component$, Resource } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type {
  DocumentHead,
  // StaticGenerateHandler,
} from "@builder.io/qwik-city";
import type { Customer } from "~/types";
import { SITE } from "~/config.mjs";
import md from "markdown-it";
import { fetchCustomers, findCustomerBySlug } from "~/utils/customers";
import Spinner from "~/components/atoms/Spinner";
import Title from "~/components/atoms/Title";
import Term from "~/components/widgets/Term/Term";

export const useGetCustomerBySlug = routeLoader$(
  async ({ params, status }): Promise<Customer> => {
    await fetchCustomers();
    const customer = await findCustomerBySlug(params.slug);

    if (!customer) {
      status(404);
    }

    return customer as Customer;
  }
);

export default component$(() => {
  const data = useGetCustomerBySlug();

  return (
    <Resource
      value={data}
      onPending={() => <Spinner />}
      onRejected={() => <div class="notification is-danger">Error</div>}
      onResolved={(customer: Customer) => (
        <section class="mx-auto py-8 sm:py-16 lg:py-20">
          <article>
            <header>
              <Title>{customer?.name}</Title>
            </header>

            <div
              class="content py-2"
              dangerouslySetInnerHTML={
                customer?.content &&
                md({
                  html: true,
                }).render(customer.content)
              }
            />

            <Term delay={1000} speed={10} text={customer?.description} />
          </article>
        </section>
      )}
    />
  );
});

/*export const onStaticGenerate: StaticGenerateHandler = async () => {
  const customers = (await fetchCustomers()) as [];

  return {
    params: customers,
  };
};*/

export const head: DocumentHead = ({ resolveValue }) => {
  const customer = resolveValue(useGetCustomerBySlug);

  return {
    title: `${customer?.name} — ${SITE.name}`,
    meta: [
      {
        name: "description",
        content: customer?.content
          ? md({
              html: false,
            }).render(customer?.content)
          : "",
      },
    ],
  };
};
