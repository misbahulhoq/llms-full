import { MessageCircle } from "lucide-react";

import { LLMId, RecentItem } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { handleAsk } from "@/lib/helpers";

const RECENT_ITEMS: RecentItem[] = [
  {
    name: "React",
    tag: "v19.0.0",
    time: "2h ago",
    bg: "#E6F1FB",
    fg: "#0C447C",
    ltr: "Re",
  },
  {
    name: "Vite",
    tag: "v6.0.3",
    time: "1d ago",
    bg: "#FAECE7",
    fg: "#712B13",
    ltr: "Vt",
  },
  {
    name: "Zod",
    tag: "v3.23.1",
    time: "2d ago",
    bg: "#EEEDFE",
    fg: "#3C3489",
    ltr: "Zd",
  },
  {
    name: "Playwright",
    tag: "v1.48.2",
    time: "4d ago",
    bg: "#EEEDFE",
    fg: "#3C3489",
    ltr: "Pw",
  },
  {
    name: "TanStack Query",
    tag: "v5.6.0",
    time: "6d ago",
    bg: "#FBEAF0",
    fg: "#72243E",
    ltr: "TQ",
  },
];

const RecentUpdates = ({ selectedLLM }: { selectedLLM: LLMId }) => {
  return (
    <div className="mb-8">
      <div className="mb-3">
        <h2 className="text-sm font-medium">Recent updates</h2>
        <p className="text-xs">Docs updated in the last 7 days</p>
      </div>

      <div className="space-y-0 divide-y divide-gray-100 rounded-lg border border-gray-100 dark:divide-gray-800">
        {RECENT_ITEMS.map((item) => {
          return (
            <div
              key={item.name}
              className="flex items-center justify-between p-3"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-medium"
                  style={{ background: item.bg, color: item.fg }}
                >
                  {item.ltr}
                </div>
                <div>
                  <span className="text-sm">{item.name}</span>
                  <span className="dark: ml-1.5 font-mono text-[11px] text-gray-400">
                    {item.tag}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="dark: text-[11px] text-gray-400">
                  {item.time}
                </span>

                <Button
                  size="sm"
                  className="h-7 gap-1 bg-blue-700 px-2.5 text-[11px] text-white hover:bg-blue-800"
                  onClick={() => handleAsk(selectedLLM, item.name)}
                >
                  <MessageCircle className="h-3 w-3" />
                  Ask
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentUpdates;
