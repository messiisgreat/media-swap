import Link from "next/link";
import { links } from "@/app/_layout/LinkContents";

export const FooterMobileContent = () => {
  return (
    <ul className="menu px-0">
      <li>
        {links.map((section, index) => (
          <details key={index}>
            <summary className="footer-title px-0 hover:text-white">
              {section.title}
            </summary>
            <ul className="mx-0 px-0">
              {section.items.map((item, i) => (
                <li key={i} color="">
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

export const FooterContent = () => {
  return (
    <div className="footer m-auto max-w-7xl">
      {links.map((section, index) => (
        <div key={index}>
          <span className="footer-title">{section.title}</span>
          {section.items.map((item, i) => (
            <Link
              href={item.url}
              key={i}
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
