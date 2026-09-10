import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Browser } from "@capacitor/browser";
import { useAuth } from "@/features/auth/AuthProvider";
import { useGrowthAssessment } from "@/features/assessment/useGrowthAssessment";
import { useGrowthVideos, filterVideosByPath } from "./useGrowthVideos";
import { markVideoWatched, markVideoUnwatched } from "./mutations";
import { VideoCard } from "./VideoCard";
import { GROWTH_PATH_NAMES } from "@/lib/growthPaths";
import { cn } from "@/lib/utils";

export function VideosSection() {
  const { user } = useAuth();
  const assessmentQuery = useGrowthAssessment();
  const videosQuery = useGrowthVideos();
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

  const filteredVideos = useMemo(() => {
    if (!videosQuery.data || !activePath) return [];
    return filterVideosByPath(videosQuery.data, activePath);
  }, [videosQuery.data, activePath]);

  const invalidateProgress = () =>
    queryClient.invalidateQueries({ queryKey: ["video-progress", user.id] });

  const watchMutation = useMutation({
    mutationFn: markVideoWatched,
    onSuccess: invalidateProgress,
  });
  const unwatchMutation = useMutation({
    mutationFn: markVideoUnwatched,
    onSuccess: invalidateProgress,
  });

  async function handleOpen(video) {
    await Browser.open({
      url: `https://www.youtube.com/watch?v=${video.youtube_id}`,
    });
    watchMutation.mutate({ userId: user.id, videoId: video.id });
  }

  function handleToggleWatched(video) {
    if (video.watched) {
      unwatchMutation.mutate({ userId: user.id, videoId: video.id });
    } else {
      watchMutation.mutate({ userId: user.id, videoId: video.id });
    }
  }

  const isLoading = assessmentQuery.isLoading || videosQuery.isLoading;
  const isError = assessmentQuery.isError || videosQuery.isError;

  if (isLoading) {
    return (
      <p className="text-sm text-muted-foreground">
        Loading your growth videos…
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-muted-foreground">
        Couldn't load your growth videos.
      </p>
    );
  }

  if (paths.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-3">
      {" "}
      <div>
        {" "}
        <h2 className="text-lg font-semibold text-[#5B2A86]">
          {" "}
          Growth Videos{" "}
        </h2>{" "}
        <p className="mt-1 text-sm leading-relaxed text-[#8E7A9D]">
          {" "}
          Watch videos selected to support your personal growth journey.{" "}
        </p>{" "}
      </div>{" "}
      <div className="flex flex-wrap gap-2">
        {" "}
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
            {" "}
            {GROWTH_PATH_NAMES[path]}{" "}
          </button>
        ))}{" "}
      </div>{" "}
      <div className="h-1 w-10 rounded-full bg-[#D4AF6A]" />{" "}
      {filteredVideos.length === 0 ? (
        <div className="rounded-xl border border-[#E2D4EB] bg-[#F6F0FA] p-4">
          {" "}
          <p className="text-sm font-medium text-[#68427D]">
            {" "}
            No videos yet for this growth path.{" "}
          </p>{" "}
          <p className="mt-1 text-xs leading-relaxed text-[#9B8BA6]">
            {" "}
            Check back later for new content to support your growth.{" "}
          </p>{" "}
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {" "}
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onOpen={() => handleOpen(video)}
              onToggleWatched={() => handleToggleWatched(video)}
            />
          ))}{" "}
        </div>
      )}{" "}
    </section>
  );
}
