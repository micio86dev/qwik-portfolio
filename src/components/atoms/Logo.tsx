import { component$ } from "@builder.io/qwik";
import ImgIcon from "~/images/icon.webp?jsx"; // width={ 32 } height={ 32 }

export default component$(() => (
  <span class="self-center ml-2 text-2xl md:text-xl font-bold text-gray-900 whitespace-nowrap dark:text-white flex items-center">
    <ImgIcon class="inline-block mr-1" alt="micio86dev Logo" loading="lazy" />
    micio86dev
  </span>
));
