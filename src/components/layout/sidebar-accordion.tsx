import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LibraryInfo } from "@/lib/libraries";

type Props = {
  accordionParentHref: string;
  isAccordionParentActive: boolean;
  library: LibraryInfo;
};

export default function SidebarAccordion({
  accordionParentHref,
  isAccordionParentActive,
  library,
}: Props) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const pathName = usePathname();

  const { slug: librarySlug } = library;
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
          className={`flex w-full items-center justify-between pr-6 pl-6 ${isAccordionParentActive ? "text-primary font-semibold" : ""}`}
          onClick={() => setIsAccordionOpen((prev) => !prev)}
        >
          {library.name}

          <AccordionTrigger
            iconAlignment="horizontal"
            className="pr-6 text-base"
            onClick={(e) => e.stopPropagation()}
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
                className={`my-1 block py-2.5 pl-7 capitalize ${
                  isAccordionChildActive && "text-primary font-semibold"
                }`}
              >
                {doc}
              </Link>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
