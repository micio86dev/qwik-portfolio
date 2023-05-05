import { component$ } from "@builder.io/qwik";
import { IconTwitter } from "~/components/icons/IconTwitter";
import { IconInstagram } from "~/components/icons/IconInstagram";
import { IconFacebook } from "~/components/icons/IconFacebook";
import { IconGithub } from "~/components/icons/IconGithub";

export default component$(() => {
  const social = [
    {
      label: "Twitter",
      icon: IconTwitter,
      href: "https://twitter.com/micio862",
    },
    {
      label: "Instagram",
      icon: IconInstagram,
      href: "https://www.instagram.com/alessandro.micelli/",
    },
    {
      label: "Facebook",
      icon: IconFacebook,
      href: "https://www.facebook.com/micio86dev",
    },
    {
      label: "Github",
      icon: IconGithub,
      href: "https://github.com/micio86dev",
    },
  ];

  return (
    <footer class="border-t border-gray-200 dark:border-slate-800">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="md:flex md:items-center md:justify-between py-6 md:py-8">
          <ul class="flex mb-4 md:order-1 -ml-2 md:ml-4 md:mb-0">
            {social.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center"
                  aria-label={label}
                  title={label}
                  href={href}
                  target="_blank"
                >
                  {Icon && <Icon />}
                </a>
              </li>
            ))}
          </ul>

          <div class="text-sm text-gray-700 mr-4 dark:text-slate-400">
            <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 float-left rounded-sm bg-[url(/images/icon.webp)]"></span>
            Made by{" "}
            <a
              class="text-secondary-700 hover:underline dark:text-gray-200"
              href="https://github.com/micio86dev"
            >
              {" "}
              micio86dev
            </a>
            · All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
});
