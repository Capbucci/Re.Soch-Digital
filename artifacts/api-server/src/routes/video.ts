import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();

const ALLOWED = new Set(["hero-desktop.mp4", "hero-mobile.mp4"]);

/* ESBuild bundles everything into dist/index.mjs so import.meta.url is always
   that file's location — 3 levels up reaches the workspace root. */
const __distDir = path.dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = path.resolve(__distDir, "../../..");
const VIDEO_DIR = path.join(WORKSPACE_ROOT, "artifacts/resoch-digitals/public/images");

router.get("/video/:filename", (req, res) => {
  const { filename } = req.params;

  if (!ALLOWED.has(filename)) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  const filePath = path.join(VIDEO_DIR, filename);

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: "File not found", resolved: filePath });
    return;
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const rangeHeader = req.headers["range"];

  res.setHeader("Content-Type", "video/mp4");
  res.setHeader("Accept-Ranges", "bytes");
  res.setHeader("Cache-Control", "public, max-age=86400");

  if (rangeHeader) {
    const parts = rangeHeader.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;

    res.status(206);
    res.setHeader("Content-Range", `bytes ${start}-${end}/${fileSize}`);
    res.setHeader("Content-Length", chunkSize);
    fs.createReadStream(filePath, { start, end }).pipe(res);
  } else {
    res.setHeader("Content-Length", fileSize);
    fs.createReadStream(filePath).pipe(res);
  }
});

export default router;
