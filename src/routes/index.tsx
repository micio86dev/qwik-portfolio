import {
  component$,
  useVisibleTask$,
  useContext,
  useStore,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { db } from "~/utils/firebase";
import { ref, onValue } from "firebase/database";
import { SITE } from "~/config.mjs";
import type { Skill } from "~/types";
import Title from "~/components/atoms/Title";
import Row from "~/components/skills/Row";
import Spinner from "~/components/atoms/Spinner";
import AddForm from "~/components/skills/AddForm";
import Term from "~/components/widgets/Term/Term";
import { UserInformationContext } from "~/root";
import ImgAvatarMini from "~/images/avatar-mini.webp?jsx"; // width="581" height="581"
import ImgAvatar from "~/images/avatar.webp?jsx"; // width="200" height="493"

interface SkillsProps {
  skills?: Skill[];
}

export default component$(() => {
  const store = useStore<SkillsProps>(
    {
      skills: undefined,
    },
    { deep: true },
  );
  const currentUser = useContext(UserInformationContext);

  useVisibleTask$(() => {
    const skills = ref(db, "skills");

    onValue(skills, (snapshot) => {
      const res = snapshot.val();
      store.skills = res
        ? Object.keys(res)?.map((key: string) => {
            return { ...res[key], id: key } as Skill;
          })
        : [];
    });
  });

  return (
    <section>
      <header>
        <Title>
          Hi! I'm{" "}
          <span class="text-primary-800 dark:text-primary-500">micio86dev</span>
        </Title>
      </header>

      <div class="row md:grid-cols-4">
        <div class="mb-4 md:mb-0">
          <ImgAvatar class="w-full hidden md:block m-auto" alt="Avatar" />
          <ImgAvatarMini class="w-full block md:hidden" alt="Avatar" />
        </div>
        <div class="col-span-3">
          <Term delay={1000} speed={10} name="story" />
        </div>
      </div>

      <div class="row md:grid-cols-4 md:mt-4">
        <div class="col-span-3">
          <Term delay={5000} speed={15} name="study" />
        </div>
        <div>
          {currentUser.isLogged && <AddForm />}

          {store.skills && store.skills.length ? (
            <div class="list p-2">
              {store.skills.map((item: Skill) => (
                <Row key={item.id} item={item} />
              ))}
            </div>
          ) : store.skills ? (
            <div class="notification is-danger">There aren't skills</div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: SITE.title,
  meta: [
    {
      name: "description",
      content: SITE.description,
    },
  ],
};
