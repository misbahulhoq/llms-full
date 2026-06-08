import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { LibraryInfo } from "@/lib/libraries";

type Props = {
  library: LibraryInfo;
};

export default function SidebarAccordion({ library }: Props) {
  const pathName = usePathname();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const { slug: librarySlug } = library;
  const accordionParentHref = `/docs/${library.slug}`;
  const isAccordionParentActive =
    pathName === accordionParentHref || pathName.includes(accordionParentHref);
  const latestVersion = library.versions?.[library.versions.length - 1];

  return (
    <Accordion
      type="single"
      collapsible
      value={isAccordionOpen ? librarySlug : ""}
      onValueChange={(val) => setIsAccordionOpen(val === librarySlug)}
    >
      <AccordionItem value={librarySlug}>
        <Link
          href={accordionParentHref}
          className={`my-1 flex w-full items-center justify-between py-2 pr-6 pl-6 ${isAccordionParentActive ? "text-primary font-semibold" : ""}`}
          onClick={() => setIsAccordionOpen((prev) => !prev)}
        >
          {library.name}

          <ChevronRight
            className={`transition-all duration-200 ${isAccordionOpen ? "rotate-90" : ""}`}
            size={16}
          />
        </Link>

        <AccordionContent>
          {library.docs?.map((doc) => {
            const accordionChildHref = `/docs/${librarySlug}/${doc}/${latestVersion}`;
            const isAccordionChildActive = pathName === accordionChildHref;

            return (
              <Link
                key={doc}
                href={accordionChildHref}
                className={`my-1 block py-2.5 pl-7 first-letter:uppercase ${
                  isAccordionChildActive && "text-primary font-semibold"
                }`}
              >
                {doc}.md
              </Link>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
