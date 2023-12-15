import Link from "next/link";

import { FooterIcons } from "@/app/_layout/footer/FooterIcons";
import { links } from "@/app/_layout/footer/LinkContents";

/**
 * モバイル用のフッター
 * @returns footer
 */
export const FooterMobileContent = () => {
  return (
    <footer className="bg-neutral p-10 pb-36 text-neutral-content md:hidden">
      <ul className="menu px-0">
        <li>
          {links.map((section) => (
            <details key={section.title}>
              <summary className="footer-title px-0 hover:text-white">
                {section.title}
              </summary>
              <ul className="mx-0 px-0">
                {section.items.map((item) => (
                  <li key={item.text}>
                    <Link
                      href={item.url}
                      className="px-0 font-medium hover:text-white hover:underline "
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </li>
      </ul>
      <FooterIcons />
    </footer>
  );
};

/**
 * PC用のフッター
 * @returns footer
 */
export const FooterContent = () => {
  return (
    <footer className="hidden bg-neutral p-10 text-neutral-content md:block">
      <div className="footer m-auto max-w-7xl">
        {links.map((section) => (
          <div key={section.title}>
            <span className="footer-title">{section.title}</span>
            {section.items.map((item) => (
              <Link
                href={item.url}
                key={item.text}
                className="font-medium hover:underline"
              >
                {item.text}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <FooterIcons />
    </footer>
  );
};
