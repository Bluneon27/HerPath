import { useState } from "react";
import { Check } from "lucide-react";

export function ArticleCard({ article, onOpen, onToggleRead }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showPlaceholder = !article.cover_image_url || imageFailed;

  return (
    <div className="flex w-40 shrink-0 flex-col gap-1.5">
      <button
        type="button"
        onClick={onOpen}
        className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-muted"
      >
        {showPlaceholder ? (
          <div className="flex flex-col items-center gap-1.5 p-2">
            <div className="h-1 w-6 rounded-full bg-[#D4AF6A]" />
            <p className="p-2 text-center text-xs font-medium text-[#68427D]">
              {article.source}
            </p>
          </div>
        ) : (
          <img
            src={article.cover_image_url}
            alt={article.title}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
        {article.read && (
          <span className="absolute top-1.5 right-1.5 flex size-5 items-center justify-center rounded-full border border-white bg-[#5B2A86] text-white shadow-sm">
            <Check className="size-3" strokeWidth={3} />
          </span>
        )}
      </button>

      <div className="flex flex-col gap-0.5">
        <p className="text-[0.65rem] font-medium text-[#7B3FA1]">
          {article.source}
        </p>
        <p className="line-clamp-2 text-xs leading-snug font-medium text-[#4B236D]">
          {article.title}
        </p>
      </div>

      <button
        type="button"
        onClick={onToggleRead}
        className="self-start text-[0.7rem] font-medium text-[#7B3FA1] underline-offset-2 hover:text-[#5B2A86] hover:underline"
      >
        {article.read ? "Mark unread" : "Mark read"}
      </button>
    </div>
  );
}
