import { useState } from "react";
import { cn } from "@/lib/utils";

// Covers a missing cover_image_url and a dead/broken image URL with the
// same graceful fallback: a styled placeholder showing the title instead.
export function BookPoster({ book, className }) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !book.cover_image_url || failed;

  if (showPlaceholder) {
    return (
      <div
        className={cn(
          "flex aspect-[2/3] w-20 shrink-0 items-center justify-center rounded-lg border border-[#DCCBEA] bg-[#F6F0FA] p-2 text-center text-[0.65rem] leading-tight font-medium text-[#68427D] shadow-sm",
          className,
        )}
      >
        <div className="flex flex-col items-center gap-1.5">
          <div className="h-1 w-6 rounded-full bg-[#D4AF6A]" />
          {book.title}
        </div>
      </div>
    );
  }

  return (
    <img
      src={book.cover_image_url}
      alt={`Cover of ${book.title}`}
      onError={() => setFailed(true)}
      className={cn(
        "aspect-[2/3] w-20 shrink-0 rounded-lg border border-[#E2D4EB] object-cover shadow-sm",
        className,
      )}
    />
  );
}
