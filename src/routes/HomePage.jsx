import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { useGrowthAssessment } from "@/features/assessment/useGrowthAssessment";
import { ReadingSection } from "@/features/reading/ReadingSection";
import { VideosSection } from "@/features/videos/VideosSection";
import { ArticlesSection } from "@/features/articles/ArticlesSection";
import { GROWTH_PATH_NAMES } from "@/lib/growthPaths";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function GrowthFocusSection() {
  const { data: assessment, isLoading, isError } = useGrowthAssessment();

  if (isLoading) {
    return <p className="text-sm text-[#8E7A9D]">Loading your growth focus…</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-[#8E7A9D]">Couldn't load your growth focus.</p>
    );
  }

  const primaryName = assessment
    ? GROWTH_PATH_NAMES[assessment.primary_growth_path]
    : undefined;
  const secondaryNames = assessment
    ? [assessment.secondary_growth_path_1, assessment.secondary_growth_path_2]
        .map((code) => GROWTH_PATH_NAMES[code])
        .filter(Boolean)
    : [];

  // No row, or a path code we don't recognize: fail quietly rather than
  // rendering broken/undefined text.
  if (!primaryName) {
    return null;
  }

  return (
    <section className="flex flex-col gap-2">
      {" "}
      <h2 className="text-sm font-medium text-[#7B3FA1]">
        {" "}
        Your Growth Focus{" "}
      </h2>{" "}
      <Card className="border-[#DCCBEA] bg-[#F6F0FA] shadow-sm">
        {" "}
        <CardContent className="flex flex-col gap-1">
          {" "}
          <p className="text-xs font-medium tracking-wide text-[#7B3FA1] uppercase">
            {" "}
            Primary Path{" "}
          </p>{" "}
          <p className="text-2xl font-semibold text-[#4B236D]">
            {" "}
            {primaryName}{" "}
          </p>{" "}
          <p className="mt-1 text-sm leading-relaxed text-[#8E7A9D]">
            {" "}
            Keep growing in this area as you continue your journey.{" "}
          </p>
          <div className="mt-1 h-1 w-10 rounded-full bg-[#D4AF6A]" />{" "}
        </CardContent>{" "}
      </Card>{" "}
      {secondaryNames.length > 0 && (
        <div className="flex flex-col gap-2">
          {" "}
          <p className="text-xs font-medium tracking-wide text-[#8E7A9D] uppercase">
            {" "}
            Supporting Focus Areas{" "}
          </p>{" "}
          <p className="text-sm leading-relaxed text-[#9B8BA6]">
            {" "}
            These areas can also help you grow and develop.{" "}
          </p>
          <div className="flex flex-wrap gap-2">
            {" "}
            {secondaryNames.map((name) => (
              <span
                key={name}
                className="rounded-full border border-[#E2D4EB] bg-white px-3 py-1 text-sm font-medium text-[#68427D] shadow-sm"
              >
                {" "}
                {name}{" "}
              </span>
            ))}{" "}
          </div>{" "}
        </div>
      )}{" "}
    </section>
  );
}

export function HomePage() {
  const { user, signOut } = useAuth();

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col gap-4 bg-[#FAF8FC] p-6">
      {" "}
      <div className="flex items-center justify-between">
        {" "}
        <div>
          {" "}
          <h1 className="text-xl font-semibold text-[#5B2A86]">
            {" "}
            Welcome back{" "}
          </h1>{" "}
          <p className="mt-1 text-sm text-[#8E7A9D]">
            {" "}
            Continue your journey and keep growing.{" "}
          </p>{" "}
        </div>
        <Button
          variant="outline"
          onClick={() => signOut()}
          className="border-[#DCCBEA] bg-white text-[#68427D] hover:bg-[#F6F0FA] hover:text-[#5B2A86]"
        >
          {" "}
          Sign out{" "}
        </Button>{" "}
      </div>{" "}
      <div className="flex items-center justify-between">
        {" "}
        <p className="text-sm text-[#8E7A9D]">
          {" "}
          Signed in as {user?.email}{" "}
        </p>{" "}
        <Link
          to="/settings"
          className="text-sm font-medium text-[#7B3FA1] underline-offset-4 hover:text-[#5B2A86] hover:underline"
        >
          {" "}
          Settings{" "}
        </Link>{" "}
      </div>{" "}
      <GrowthFocusSection />
      <section className="flex flex-col gap-1">
        {" "}
        <h2 className="text-lg font-semibold text-[#5B2A86]">
          {" "}
          Keep Learning{" "}
        </h2>{" "}
        <p className="text-sm leading-relaxed text-[#8E7A9D]">
          {" "}
          Explore readings, videos, and helpful articles designed to support
          your growth.{" "}
        </p>{" "}
      </section>
      <ReadingSection />
      <VideosSection />
      <ArticlesSection />{" "}
    </div>
  );
}
