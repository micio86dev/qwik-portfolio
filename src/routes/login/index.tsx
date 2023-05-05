import { component$, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { SITE } from "~/config.mjs";
import Title from "~/components/atoms/Title";
import LoginForm from "~/components/widgets/LoginForm";
import { UserInformationContext } from "~/root";

export default component$(() => {
  const currentUser = useContext(UserInformationContext);

  if (currentUser.isLogged && document) {
    document.location = "/";
  }

  return (
    <section>
      <header>
        <Title>Login</Title>
      </header>
      <LoginForm />
    </section>
  );
});

export const head: DocumentHead = {
  title: `Login — ${SITE.name}`,
  meta: [
    {
      name: "description",
      content: SITE.description,
    },
  ],
};
