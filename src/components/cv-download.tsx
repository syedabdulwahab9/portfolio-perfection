import { Download } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";

// Served from /public so it works on any domain or host.
const pdfUrl = "/files/Syed-Abdul-Wahab-CV.pdf";
const filename = "Syed-Abdul-Wahab-CV.pdf";

export function CvDownload({ children = "Download PDF", variant = "portfolio", className }: {
  children?: string;
  variant?: ButtonProps["variant"];
  className?: string;
}) {
  return (
    <div className="cv-download-control">
      <Button asChild variant={variant} className={className}>
        <a href={pdfUrl} download={filename}>
          <Download />
          {children}
        </a>
      </Button>
    </div>
  );
}
