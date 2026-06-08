import fs from "node:fs/promises";
import path from "node:path";

export async function getLibraryContent(
  library: string,
  version: string,
  fileName: string,
  percentage?: number,
) {
  const safePercentage = Math.min(Math.max(percentage || 5, 0.001), 100);
  const filePath = path.join(
    process.cwd(),
    "public",
    "docs",
    library,
    version,
    fileName,
  );

  let fileHandle;
  try {
    fileHandle = await fs.open(filePath, "r");
    const stat = await fileHandle.stat();
    const targetBytes = Math.floor(stat.size * (safePercentage / 100));

    if (targetBytes === 0) return "";

    const buffer = Buffer.alloc(targetBytes);
    await fileHandle.read(buffer, 0, targetBytes, 0);
    return buffer.toString("utf8").replace(/\s+\S*$/, "");
  } catch (error) {
    console.error("Build-time read error:", error);
    return ""; // Return empty string so the build doesn't crash completely
  } finally {
    if (fileHandle) await fileHandle.close();
  }
}
