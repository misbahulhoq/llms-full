"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ChevronDown,
  Copy,
  Check,
  MessageCircle,
  LayoutGrid,
  Component,
  Database,
  RefreshCw,
  TestTube,
  Hammer,
  Layers,
} from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Footer from "@/components/layout/footer";
import HeroSection from "./hero";

// ============================================================================
// Data & Types
// ============================================================================

interface Library {
  name: string;
  desc: string;
  version: string;
  cat: string;
  badge: "popular" | "new" | "stable";
  bg: string;
  fg: string;
  ltr: string;
}

interface RecentItem {
  name: string;
  tag: string;
  time: string;
  bg: string;
  fg: string;
  ltr: string;
}

const LLMS = [
  { id: "claude", name: "Claude", dot: "#185FA5", icon: "✨" },
  { id: "chatgpt", name: "ChatGPT", dot: "#639922", icon: "🤖" },
  { id: "gemini", name: "Gemini", dot: "#D85A30", icon: "🌟" },
  { id: "perplexity", name: "Perplexity", dot: "#5DCAA5", icon: "🔍" },
] as const;

type LLMId = (typeof LLMS)[number]["id"];

const LIBRARIES: Library[] = [
  {
    name: "React",
    desc: "UI component library by Meta",
    version: "v19.0",
    cat: "ui",
    badge: "popular",
    bg: "#E6F1FB",
    fg: "#0C447C",
    ltr: "Re",
  },
  {
    name: "Next.js",
    desc: "React meta-framework with SSR & SSG",
    version: "v15.2",
    cat: "meta",
    badge: "popular",
    bg: "#F1EFE8",
    fg: "#444441",
    ltr: "Nx",
  },
  {
    name: "Vue",
    desc: "Progressive JavaScript framework",
    version: "v3.5",
    cat: "ui",
    badge: "popular",
    bg: "#E1F5EE",
    fg: "#085041",
    ltr: "Vu",
  },
  {
    name: "Zustand",
    desc: "Minimal state management for React",
    version: "v5.0",
    cat: "state",
    badge: "popular",
    bg: "#FAEEDA",
    fg: "#633806",
    ltr: "Zs",
  },
  {
    name: "TanStack Query",
    desc: "Async & server-state manager",
    version: "v5.6",
    cat: "fetching",
    badge: "popular",
    bg: "#FBEAF0",
    fg: "#72243E",
    ltr: "TQ",
  },
  {
    name: "Zod",
    desc: "TypeScript-first schema validation",
    version: "v3.23",
    cat: "utils",
    badge: "new",
    bg: "#EEEDFE",
    fg: "#3C3489",
    ltr: "Zd",
  },
  {
    name: "Vitest",
    desc: "Vite-native unit testing framework",
    version: "v2.1",
    cat: "testing",
    badge: "new",
    bg: "#E1F5EE",
    fg: "#085041",
    ltr: "Vi",
  },
  {
    name: "Vite",
    desc: "Lightning-fast dev server & bundler",
    version: "v6.0",
    cat: "build",
    badge: "popular",
    bg: "#FAECE7",
    fg: "#712B13",
    ltr: "Vt",
  },
  {
    name: "Nuxt",
    desc: "Vue meta-framework with SSR & SSG",
    version: "v3.13",
    cat: "meta",
    badge: "stable",
    bg: "#E1F5EE",
    fg: "#085041",
    ltr: "Nu",
  },
  {
    name: "SvelteKit",
    desc: "Full-stack Svelte app framework",
    version: "v2.7",
    cat: "meta",
    badge: "stable",
    bg: "#FAECE7",
    fg: "#712B13",
    ltr: "Sk",
  },
  {
    name: "Axios",
    desc: "Promise-based HTTP client",
    version: "v1.7",
    cat: "fetching",
    badge: "stable",
    bg: "#F1EFE8",
    fg: "#444441",
    ltr: "Ax",
  },
  {
    name: "Playwright",
    desc: "End-to-end browser testing tool",
    version: "v1.48",
    cat: "testing",
    badge: "popular",
    bg: "#EEEDFE",
    fg: "#3C3489",
    ltr: "Pw",
  },
];

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

const CATEGORIES = [
  { id: "all", name: "All", icon: LayoutGrid },
  { id: "ui", name: "UI Frameworks", icon: Component },
  { id: "state", name: "State Management", icon: Database },
  { id: "fetching", name: "Data Fetching", icon: RefreshCw },
  { id: "testing", name: "Testing", icon: TestTube },
  { id: "build", name: "Build Tools", icon: Hammer },
  { id: "utils", name: "Utilities", icon: Hammer },
  { id: "meta", name: "Meta Frameworks", icon: Layers },
] as const;

// ============================================================================
// Helper Functions
// ============================================================================

function buildLLMUrl(llmId: LLMId, libName: string): string {
  const prompt = `Using the documentation at https://llmdocs.com/docs/${libName.toLowerCase().replace(/\s/g, "-")}.md, help me understand and work with ${libName}.`;
  const encodedPrompt = encodeURIComponent(prompt);
  switch (llmId) {
    case "claude":
      return `https://claude.ai/new?q=${encodedPrompt}`;
    case "chatgpt":
      return `https://chatgpt.com/?q=${encodedPrompt}`;
    case "gemini":
      return `https://gemini.google.com/app?q=${encodedPrompt}`;
    case "perplexity":
      return `https://perplexity.ai/?q=${encodedPrompt}`;
    default:
      return `https://claude.ai/new?q=${encodedPrompt}`;
  }
}

// ============================================================================
// Main Component
// ============================================================================

export default function LandingPage() {
  const [searchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedLLM, setSelectedLLM] = useState<LLMId>("claude");
  const [copiedLibName, setCopiedLibName] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter libraries based on search & category
  const filteredLibraries = useMemo(() => {
    return LIBRARIES.filter((lib) => {
      const matchesCategory =
        activeCategory === "all" || lib.cat === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        lib.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lib.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Copy library name to clipboard
  const handleCopy = async (libName: string) => {
    await navigator.clipboard.writeText(libName);
    setCopiedLibName(libName);
    setTimeout(() => setCopiedLibName(null), 1500);
  };

  // Ask LLM about a library
  const handleAsk = (libName: string) => {
    const url = buildLLMUrl(selectedLLM, libName);
    window.open(url, "_blank");
  };

  // Change LLM model
  const changeLLM = (llmId: LLMId) => {
    setSelectedLLM(llmId);
    setIsDropdownOpen(false);
  };

  const currentLLM = LLMS.find((l) => l.id === selectedLLM)!;

  // Stats data
  const stats = [
    { label: "Libraries", value: "142" },
    { label: "Categories", value: "38" },
    { label: "Tokens served", value: "4.2M" },
    { label: "Daily", value: "Updates" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Bar with LLM Selector */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-6 mb-6">
          <div className="flex items-center gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl font-medium text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* LLM Selector Dropdown */}
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: currentLLM.dot }}
                />
                <span>Ask with {currentLLM.name}</span>
                <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              {LLMS.map((llm) => (
                <DropdownMenuItem
                  key={llm.id}
                  onClick={() => changeLLM(llm.id)}
                  className="flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: llm.dot }}
                    />
                    <span>{llm.name}</span>
                  </div>
                  {selectedLLM === llm.id && (
                    <Check className="h-3.5 w-3.5 text-blue-600" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Categories Filter */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <Button
                  key={cat.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={`gap-1.5 rounded-full text-xs h-8 ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                      : "border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Libraries Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-medium text-gray-900 dark:text-white">
                Popular libraries
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Most asked this week
              </p>
            </div>
          </div>

          {filteredLibraries.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No libraries found.{" "}
                <button
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={() => alert("Submit a library feature coming soon")}
                >
                  Submit it ↗
                </button>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredLibraries.map((lib) => {
                const isCopied = copiedLibName === lib.name;
                return (
                  <Card
                    key={lib.name}
                    className="group border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all"
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
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                              : lib.badge === "new"
                                ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          }`}
                        >
                          {lib.badge}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {lib.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {lib.desc}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500">
                          {lib.version}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <Button
                          size="sm"
                          className="flex-1 h-8 gap-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs"
                          onClick={() => handleAsk(lib.name)}
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          Ask {currentLLM.name}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-3 gap-1.5 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400"
                          onClick={() => handleCopy(lib.name)}
                        >
                          {isCopied ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                          <span className="text-xs">
                            {isCopied ? "Copied!" : "Copy"}
                          </span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* How it works */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                step: "1",
                title: "Find your library",
                desc: "Search by name or browse by category. Every major JS ecosystem library is indexed here.",
              },
              {
                step: "2",
                title: "Hit Ask",
                desc: "Choose your preferred LLM from the dropdown. You'll be redirected instantly with the docs pre-loaded as context.",
              },
              {
                step: "3",
                title: "Start asking",
                desc: "The LLM receives a prompt with your doc URL. No context window overflow — just relevant, structured answers.",
              },
            ].map((item) => (
              <Card
                key={item.step}
                className="border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50"
              >
                <CardContent className="p-4">
                  <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[11px] font-medium text-gray-600 dark:text-gray-400 mb-2">
                    {item.step}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                  {item.step === "2" && (
                    <div className="flex gap-1.5 mt-3">
                      {LLMS.map((llm) => (
                        <span
                          key={llm.id}
                          className="text-[10px] px-2 py-0.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                        >
                          {llm.name}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Updates */}
        <div className="mb-8">
          <div className="mb-3">
            <h2 className="text-sm font-medium text-gray-900 dark:text-white">
              Recent updates
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Docs updated in the last 7 days
            </p>
          </div>
          <div className="space-y-0 divide-y divide-gray-100 dark:divide-gray-800 border border-gray-100 dark:border-gray-800 rounded-lg">
            {RECENT_ITEMS.map((item) => {
              const isCopied = copiedLibName === item.name;
              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-3"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-medium"
                      style={{ background: item.bg, color: item.fg }}
                    >
                      {item.ltr}
                    </div>
                    <div>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {item.name}
                      </span>
                      <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 ml-1.5">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-400 dark:text-gray-500">
                      {item.time}
                    </span>
                    <Button
                      size="sm"
                      className="h-7 px-2.5 gap-1 bg-blue-700 hover:bg-blue-800 text-white text-[11px]"
                      onClick={() => handleAsk(item.name)}
                    >
                      <MessageCircle className="h-3 w-3" />
                      Ask
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 gap-1 text-[11px] border-gray-200 dark:border-gray-800"
                      onClick={() => handleCopy(item.name)}
                    >
                      {isCopied ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      {isCopied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
