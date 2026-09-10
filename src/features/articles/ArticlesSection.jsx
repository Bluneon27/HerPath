import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Browser } from "@capacitor/browser";
import { useAuth } from "@/features/auth/AuthProvider";
import { useGrowthAssessment } from "@/features/assessment/useGrowthAssessment";
import { useGrowthArticles, filterArticlesByPath } from "./useGrowthArticles";
import { markArticleRead, markArticleUnread } from "./mutations";
import { ArticleCard } from "./ArticleCard";
import { GROWTH_PATH_NAMES } from "@/lib/growthPaths";
import { cn } from "@/lib/utils";

export function ArticlesSection() {
  const { user } = useAuth();
  const assessmentQuery = useGrowthAssessment();
  const articlesQuery = useGrowthArticles();
  const queryClient = useQueryClient();
  const [selectedPath, setSelectedPath] = useState(null);

  const paths = useMemo(() => {
    if (!assessmentQuery.data) return [];
    return [
      assessmentQuery.data.primary_growth_path,
      assessmentQuery.data.secondary_growth_path_1,
      assessmentQuery.data.secondary_growth_path_2,
    ].filter(Boolean);
  }, [assessmentQuery.data]);

  const activePath = selectedPath ?? paths[0];

  const filteredArticles = useMemo(() => {
    if (!articlesQuery.data || !activePath) return [];
    return filterArticlesByPath(articlesQuery.data, activePath);
  }, [articlesQuery.data, activePath]);

  const invalidateProgress = () =>
    queryClient.invalidateQueries({ queryKey: ["article-progress", user.id] });

  const readMutation = useMutation({
    mutationFn: markArticleRead,
    onSuccess: invalidateProgress,
  });
  const unreadMutation = useMutation({
    mutationFn: markArticleUnread,
    onSuccess: invalidateProgress,
  });

  async function handleOpen(article) {
    await Browser.open({ url: article.url });
    readMutation.mutate({ userId: user.id, articleId: article.id });
  }

  function handleToggleRead(article) {
    if (article.read) {
      unreadMutation.mutate({ userId: user.id, articleId: article.id });
    } else {
      readMutation.mutate({ userId: user.id, articleId: article.id });
    }
  }

  const isLoading = assessmentQuery.isLoading || articlesQuery.isLoading;
  const isError = assessmentQuery.isError || articlesQuery.isError;

  if (isLoading) {
    return (
      <p className="text-sm text-[#8E7A9D]">Loading your growth articles…</p>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-muted-foreground">
        Couldn't load your growth articles.
      </p>
    );
  }

  if (paths.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-2">
      <div>
        <h2 className="text-sm font-medium text-[#5B2A86]">Growth Articles</h2>

        <p className="mt-1 text-sm leading-relaxed text-[#8E7A9D]">
          Explore helpful articles selected to support your growth and
          development.
        </p>
      </div>

      <div className="flex gap-2">
        {paths.map((path) => (
          <button
            key={path}
            type="button"
            onClick={() => setSelectedPath(path)}
            aria-pressed={activePath === path}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              activePath === path
                ? "border-[#7B3FA1] bg-[#F6F0FA] font-medium text-[#5B2A86] shadow-sm"
                : "border-[#E2D4EB] bg-white text-[#68427D] hover:border-[#DCCBEA] hover:bg-[#FAF8FC]",
            )}
          >
            {GROWTH_PATH_NAMES[path]}
          </button>
        ))}
      </div>

      <div className="h-1 w-10 rounded-full bg-[#D4AF6A]" />

      {filteredArticles.length === 0 ? (
        <div className="rounded-xl border border-[#E2D4EB] bg-[#F6F0FA]">
          <p className="text-sm font-medium text-[#68427D]">
            No articles yet for this growth path.
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#9B8BA6]">
            Check back later for new articles to support your growth.
          </p>
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onOpen={() => handleOpen(article)}
              onToggleRead={() => handleToggleRead(article)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
