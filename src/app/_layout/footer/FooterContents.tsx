import Link from "next/link";
import { links } from "@/app/_layout/LinkContents";

/**
 * モバイル用のフッター
 * @returns footer
 */
export const FooterMobileContent = () => {
  return (
    <ul className="menu px-0">
      <li>
        {links.map((section) => (
          <details key={section.title}>
            <summary className="footer-title px-0 hover:text-white">
              {section.title}
            </summary>
            <ul className="mx-0 px-0">
              {section.items.map((item) => (
                <li key={item.text} color="">
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
  );
};

/**
 * PC用のフッター
 * @returns footer
 */
export const FooterContent = () => {
  return (
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
  );
};
