import DocsPage from "@/components/pages/docs";
import LibraryRootPage from "@/components/pages/docs/library-root";
import { libraries } from "@/lib/libraries";

const paths: { slug: string[] }[] = [];

libraries
  .filter((lib) => lib.versions !== null)
  .forEach((library) => {
    const docList =
      library.docs && library.docs.length > 0 ? library.docs : null;

    const versionList =
      library.versions && library.versions.length > 0 ? library.versions : null;

    paths.push({
      slug: [library.slug],
    });

    docList?.forEach((doc) => {
      versionList?.forEach((version) => {
        paths.push({
          slug: [library.slug, doc, version],
        });
      });
    });
  });

export const generateStaticParams = () => {
  return paths;
};

const Page = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
  const { slug } = await params;

  // Slug length one means it's the root page of a library.
  if (slug.length === 1) {
    return <LibraryRootPage />;
  }

  const librarySlug = slug[0];
  const fileName = slug[1] + ".md";
  const version = slug[2];

  return (
    <div className="">
      <DocsPage
        librarySlug={librarySlug}
        version={version}
        fileName={fileName}
      />
    </div>
  );
};

export default Page;
