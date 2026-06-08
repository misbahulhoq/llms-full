import { getLibraryContent } from "@/app/actions";
import DocsPageClient from "./docs-page-client";

const DocsPage = async ({
  librarySlug,
  version,
}: {
  librarySlug: string;
  version: string;
}) => {
  const activeLibraryMdContent = await getLibraryContent(
    librarySlug,
    version,
    0.2, // percentage
  );

  return (
    <DocsPageClient
      markdownContent={activeLibraryMdContent}
      librarySlug={librarySlug}
      version={version}
    />
  );
};

export default DocsPage;
