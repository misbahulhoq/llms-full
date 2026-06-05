import { use } from "react";

// A simple global cache map to prevent downloading the same logo multiple times
const svgCache = new Map<string, Promise<string>>();

function fetchRawSvg(url: string): Promise<string> {
  if (!svgCache.has(url)) {
    const promise = fetch(url)
      .then((res) => (res.ok ? res.text() : ""))
      .catch(() => "");
    svgCache.set(url, promise);
  }
  return svgCache.get(url)!;
}

export function SVGImage({ src, alt }: { src: string; alt: string }) {
  // Automatically pauses rendering until the SVG text is ready
  const rawSvg = use(fetchRawSvg(src));

  if (!rawSvg)
    return <span className="text-muted-foreground text-xs">Fallback</span>;

  return (
    <span
      className="text-foreground block h-5 w-5 [&>svg]:h-full [&>svg]:w-full"
      aria-label={alt}
      dangerouslySetInnerHTML={{ __html: rawSvg }}
    />
  );
}
