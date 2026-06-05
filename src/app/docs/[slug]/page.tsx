import { Suspense } from "react";
import DocsPage from "@/components/pages/docs";
import { libraries } from "@/lib/libraries";

export const generateStaticParams = () => {
  return libraries.map((library) => ({ slug: `${library.slug}` }));
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <div className="px-5 py-6">
      <Suspense fallback={<div>Loading...</div>}>
        <DocsPage libraryName={slug} />
      </Suspense>
    </div>
  );
};

export default Page;
