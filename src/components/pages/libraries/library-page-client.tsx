"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarkDownRenderer from "@/components/shared/markdown-renderer";

interface LibraryPageClientProps {
  markdownContent: string;
}

const LibraryPageClient = ({ markdownContent }: LibraryPageClientProps) => {
  return (
    <div className="rounded border p-4">
      <Tabs defaultValue="raw" className="">
        <TabsList>
          <TabsTrigger value="raw">Raw</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="raw">
          <pre className="bg-secondary rounded p-4 font-mono text-sm break-words whitespace-pre-wrap">
            <code>{markdownContent}</code>
          </pre>
        </TabsContent>
        <TabsContent value="preview">
          <MarkDownRenderer content={markdownContent} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LibraryPageClient;
