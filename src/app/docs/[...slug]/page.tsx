import { libraries } from "@/lib/libraries";

export const generateStaticParams = () => {
  const paths: { slug: string[] }[] = [];

  libraries
    .filter((lib) => lib.versions !== null)
    .forEach((library) => {
      const docList =
        library.docs && library.docs.length > 0 ? library.docs : null;

      const versionList =
        library.versions && library.versions.length > 0
          ? library.versions
          : null;

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

  return paths;
};

const Page = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
  console.log(await params);

  return (
    <div className="">
      <h2>Coming Soon</h2>
    </div>
  );
};

export default Page;
