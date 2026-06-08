import { getLibraryContent } from "@/utils/read-file";
import DocsPageClient from "./docs-page-client";

const DocsPage = async ({
  librarySlug,
  version,
  fileName,
}: {
  librarySlug: string;
  version: string;
  fileName: string;
}) => {
  const percentage = fileName.includes("index")
    ? 100
    : fileName.includes("medium")
      ? 0.4
      : 0.2;

  const activeLibraryMdContent = await getLibraryContent(
    librarySlug,
    version,
    fileName,
    percentage, // percentage
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
