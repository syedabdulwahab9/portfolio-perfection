import { useState, type MouseEvent } from "react";
import { Download, LoaderCircle } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import cvAsset from "@/assets/wahab-cv.pdf.asset.json";

const pdfUrl = cvAsset.url;
const filename = "Syed-Abdul-Wahab-CV.pdf";

export function CvDownload({ children = "Download PDF", variant = "portfolio", className }: {
  children?: string;
  variant?: ButtonProps["variant"];
  className?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  async function download(event: MouseEvent<HTMLAnchorElement>) {
    // Preserve native new-tab gestures and a usable link before hydration.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    // iPhone/iPad viewers can save through the native PDF share sheet.
    // Keep this navigation synchronous so Safari does not block the new tab.
    const appleMobile = /iPhone|iPad|iPod/.test(navigator.userAgent)
      || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (appleMobile) {
      event.preventDefault();
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
      return;
    }
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(false);
    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error("PDF unavailable");
      const bytes = await response.arrayBuffer();
      const signature = new TextDecoder().decode(bytes.slice(0, 5));
      if (signature !== "%PDF-") throw new Error("Invalid PDF response");
      const url = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      link.remove();
      // Safari needs the URL to remain alive while handing off the file.
      window.setTimeout(() => URL.revokeObjectURL(url), 120_000);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="cv-download-control">
      <Button asChild variant={variant} className={className}>
        <a href={pdfUrl} download={filename} target="_blank" rel="noopener noreferrer" onClick={download} aria-disabled={busy} aria-busy={busy}>
          {busy ? <LoaderCircle className="animate-spin" /> : <Download />}
          {busy ? "Preparing PDF…" : children}
        </a>
      </Button>
      {error && <p className="cv-download-error" role="alert">Unable to save automatically. <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Open PDF to save</a>.</p>}
    </div>
  );
}