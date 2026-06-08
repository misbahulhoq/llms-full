import { libraries } from "@/lib/libraries";

export const generateStaticParams = () => {
  const paths: { slug: string[] }[] = [];

  libraries.forEach((library) => {
    const docList =
      library.docs && library.docs.length > 0 ? library.docs : ["full"];

    const versionList =
      library.versions && library.versions.length > 0 ? library.versions : null;

    docList.forEach((doc) => {
      versionList?.forEach((version) => {
        paths.push({
          slug: [library.slug, doc, version],
        });
      });
    });

    paths.push({
      slug: library.docs ? library.docs.map((doc) => doc) : [library.slug],
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
