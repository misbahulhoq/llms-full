import { LLMId } from "./constants";

export function buildLLMUrl(llmId: LLMId, libName: string): string {
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

// Ask LLM about a library
export const handleAsk = (selectedLLM: LLMId, libName: string) => {
  const url = buildLLMUrl(selectedLLM, libName);
  window.open(url, "_blank");
};
