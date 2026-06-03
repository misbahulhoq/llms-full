import { libraries } from "@/lib/libraries";
import React from "react";

export const generateStaticParams = () => {
  return libraries.map((library) => ({ slug: `${library.slug}` }));
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <div>{slug}</div>;
};

export default Page;
