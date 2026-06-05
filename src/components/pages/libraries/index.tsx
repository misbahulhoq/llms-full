import MarkDownRenderer from "@/components/shared/markdown-renderer";
import { libraryInfo } from "@/content/library-info";
import { getLibraryContent } from "@/app/actions";
import { Button } from "@/components/ui/button";

const LibraryPage = async ({ libraryName }: { libraryName: string }) => {
  const activeLibraryInfo = libraryInfo.filter((library) => {
    return library.name === libraryName;
  });
  const activeLibraryVersions = activeLibraryInfo[0]?.versions;

  const activeLibraryMdContent = await getLibraryContent(libraryName, "16.2.6");

  console.log(activeLibraryInfo);
  console.log(libraryName);

  return (
    <div>
      <div className="rounded border p-4">
        <section className="flex items-center gap-4">
          <Button size="sm">Raw</Button>
          <Button size="sm">Preview</Button>
        </section>

        <MarkDownRenderer content={activeLibraryMdContent} />
      </div>
    </div>
  );
};

export default LibraryPage;
