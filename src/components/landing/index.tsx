"use client";

import { useState, useEffect } from "react";

import HeroSection from "./hero";
import StatsBar from "./stats-bar";
import { LLMId } from "@/lib/constants";
import CategoryFilter from "./category-filter";
import LibrariesGrid from "./libraries-grid";
import HowItWorks from "./how-it-works";
import RecentUpdates from "./recent-updates";
import { libraries } from "@/lib/libraries";

export default function LandingPage() {
  const [searchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedLLM, setSelectedLLM] = useState<LLMId>("claude");

  // Filter libraries based on search & category
  const filteredLibraries = libraries
    .filter((lib) => lib.versions)
    .filter((lib) => {
      const matchesCategory =
        activeCategory === "all" || lib.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        lib.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Bar with LLM Selector */}
        <StatsBar selectedLLM={selectedLLM} setSelectedLLM={setSelectedLLM} />

        {/* Categories Filter */}
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Libraries Grid */}
        <LibrariesGrid
          selectedLLM={selectedLLM}
          filteredLibraries={filteredLibraries}
        />

        {/* How it works */}
        <HowItWorks />

        {/* Recent Updates */}
        <RecentUpdates selectedLLM={selectedLLM} />
      </div>
    </div>
  );
}
