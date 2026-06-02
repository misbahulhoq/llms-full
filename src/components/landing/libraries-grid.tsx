import { MessageCircle } from "lucide-react";
import { Library, LLMId, LLMS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildLLMUrl } from "@/lib/helpers";

type Props = {
  filteredLibraries: Library[];
  selectedLLM: LLMId;
};

const LibrariesGrid = (props: Props) => {
  const { filteredLibraries, selectedLLM } = props;

  const handleAsk = (libName: string) => {
    const url = buildLLMUrl(selectedLLM, libName);
    window.open(url, "_blank");
  };

  const currentLLM = LLMS.find((l) => l.id === selectedLLM)!;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-medium  ">Popular libraries</h2>
          <p className="text-xs  ">Most asked this week</p>
        </div>
      </div>

      {filteredLibraries.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-foreground/30  rounded-lg">
          <p className="text-sm  ">
            No libraries found.{" "}
            <button
              className="text-blue-600  hover:underline"
              onClick={() => alert("Submit a library feature coming soon")}
            >
              Submit it ↗
            </button>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredLibraries.map((lib) => {
            return (
              <Card
                key={lib.name}
                className="group border border-gray-100  hover:border-foreground/30  transition-all"
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-medium"
                      style={{ background: lib.bg, color: lib.fg }}
                    >
                      {lib.ltr}
                    </div>
                    <Badge
                      variant="secondary"
                      className={`text-[10px] px-2 py-0 ${
                        lib.badge === "popular"
                          ? "bg-emerald-50 text-emerald-700"
                          : lib.badge === "new"
                            ? "bg-primary/10 text-primary"
                            : "bg-card text-card-foreground "
                      }`}
                    >
                      {lib.badge}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium  ">{lib.name}</h3>
                    <p className="text-xs   mt-1">{lib.desc}</p>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {lib.version}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      size="sm"
                      className="flex-1 h-8 gap-1.5"
                      onClick={() => handleAsk(lib.name)}
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Ask {currentLLM.name}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LibrariesGrid;
