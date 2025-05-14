import { component$ } from "@builder.io/qwik";

export default component$(() => (
  <span class="self-center ml-2 text-2xl md:text-xl font-bold text-gray-900 whitespace-nowrap dark:text-white flex items-center">
    <picture>
      <source srcset="/images/icon.webp" type="image/webp" />
      <img
        class="inline-block mr-1"
        width="48"
        height="48"
        alt="micio86dev Logo"
        srcset="/images/icon.webp"
      />
      micio86dev
    </picture>
  </span>
));
