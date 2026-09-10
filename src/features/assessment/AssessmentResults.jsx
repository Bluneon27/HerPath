import { GROWTH_PATH_NAMES } from "@/lib/growthPaths";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AssessmentResults({ result, onContinue }) {
  const { primaryGrowthPath, secondaryGrowthPath1, secondaryGrowthPath2 } =
    result;

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 bg-[#FAF8FC] p-6">
      {" "}
      <div className="text-center">
        {" "}
        <h1 className="text-2xl font-semibold text-[#5B2A86]">
          {" "}
          Your Growth Results{" "}
        </h1>{" "}
        <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-[#D4AF6A]" />{" "}
        <p className="mt-4 text-sm leading-relaxed text-[#8E7A9D]">
          {" "}
          Your results highlight areas where you can focus your growth right
          now. Use them as a guide for your next steps.{" "}
        </p>{" "}
      </div>{" "}
      <Card className="border-[#DCCBEA] bg-white shadow-[0_8px_30px_rgba(75,45,110,0.08)]">
        {" "}
        <CardHeader className="border-b border-[#F0E8F5]">
          {" "}
          <p className="text-xs font-medium tracking-wide text-[#D4AF6A] uppercase">
            {" "}
            Primary Focus{" "}
          </p>{" "}
          <CardTitle className="text-lg text-[#4B236D]">
            {" "}
            Your Primary Growth Path{" "}
          </CardTitle>{" "}
        </CardHeader>{" "}
        <CardContent className="pt-6">
          {" "}
          <p className="text-2xl font-semibold text-[#5B2A86]">
            {" "}
            {GROWTH_PATH_NAMES[primaryGrowthPath]}{" "}
          </p>{" "}
          <p className="mt-2 text-sm leading-relaxed text-[#8E7A9D]">
            {" "}
            This is the area that currently stands out most in your growth
            journey.{" "}
          </p>{" "}
        </CardContent>{" "}
      </Card>{" "}
      <Card className="border-[#E2D4EB] bg-white shadow-sm">
        {" "}
        <CardHeader className="border-b border-[#F0E8F5]">
          {" "}
          <p className="text-xs font-medium tracking-wide text-[#7B3FA1] uppercase">
            {" "}
            Supporting Areas{" "}
          </p>{" "}
          <CardTitle className="text-lg text-[#4B236D]">
            {" "}
            Your Supporting Growth Paths{" "}
          </CardTitle>{" "}
        </CardHeader>{" "}
        <CardContent className="flex flex-col gap-3 pt-6">
          {" "}
          <div className="rounded-xl border border-[#E2D4EB] bg-[#F6F0FA] p-3">
            {" "}
            <p className="text-base font-medium text-[#68427D]">
              {" "}
              {GROWTH_PATH_NAMES[secondaryGrowthPath1]}{" "}
            </p>{" "}
          </div>{" "}
          <div className="rounded-xl border border-[#E2D4EB] bg-[#F6F0FA] p-3">
            {" "}
            <p className="text-base font-medium text-[#68427D]">
              {" "}
              {GROWTH_PATH_NAMES[secondaryGrowthPath2]}{" "}
            </p>{" "}
          </div>{" "}
          <p className="text-sm leading-relaxed text-[#8E7A9D]">
            {" "}
            These supporting areas can also help you develop and make progress
            over time.{" "}
          </p>{" "}
        </CardContent>{" "}
      </Card>{" "}
      <div className="flex flex-col gap-3">
        {" "}
        <Button
          type="button"
          size="lg"
          onClick={onContinue}
          className="w-full bg-[#5B2A86] text-white shadow-sm hover:bg-[#48206B] focus-visible:ring-[#D4AF6A]"
        >
          {" "}
          Continue Your Journey{" "}
        </Button>{" "}
        <p className="text-center text-xs leading-relaxed text-[#A596AF]">
          {" "}
          This assessment identifies your current growth focus right now — not
          who you are.{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
}
