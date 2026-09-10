import { useState } from "react";
import { Browser } from "@capacitor/browser";
import { BookPoster } from "./BookPoster";
import { isCheckInDue } from "./readingSchedule";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ActiveBook({
  book,
  progress,
  checkins,
  onCheckIn,
  isCheckInPending,
  onFinish,
  isFinishPending,
}) {
  const [pagesReported, setPagesReported] = useState("");
  const hasPlan = Boolean(progress.plan_weeks);
  const checkInDue = hasPlan && isCheckInDue(progress, checkins);

  function handleCheckIn() {
    const value = pagesReported.trim();
    onCheckIn(value === "" ? null : Number(value));
    setPagesReported("");
  }

  return (
    <Card className="border-[#DCCBEA] bg-white shadow-[0_8px_30px_rgba(75,45,110,0.08)]">
      {" "}
      <CardContent className="flex flex-col gap-4 pt-6">
        {" "}
        <div className="flex gap-3">
          {" "}
          <BookPoster book={book} />{" "}
          <div className="flex flex-col gap-1">
            {" "}
            <p className="font-semibold text-[#4B236D]"> {book.title} </p>{" "}
            <p className="text-sm text-[#8E7A9D]"> {book.author} </p>{" "}
            {hasPlan && (
              <p className="text-sm leading-relaxed text-[#68427D]">
                {" "}
                Week {progress.current_week} of {progress.plan_weeks} ·{" "}
                {progress.weekly_page_target} pages/week{" "}
              </p>
            )}{" "}
          </div>{" "}
        </div>{" "}
        {book.description ? (
          <p className="text-sm leading-relaxed text-[#8E7A9D]">
            {" "}
            {book.description}{" "}
          </p>
        ) : null}{" "}
        {checkInDue && (
          <div className="flex flex-col gap-3 rounded-xl border border-[#DCCBEA] bg-[#F6F0FA] p-4">
            {" "}
            <div>
              {" "}
              <p className="text-sm font-semibold text-[#5B2A86]">
                {" "}
                Week {progress.current_week} Check-In{" "}
              </p>{" "}
              <p className="mt-1 text-xs leading-relaxed text-[#8E7A9D]">
                {" "}
                Take a moment to record your progress for this week.{" "}
              </p>{" "}
            </div>{" "}
            <div className="flex items-center justify-between rounded-lg border border-[#E2D4EB] bg-white px-3 py-2">
              {" "}
              <span className="text-xs font-medium text-[#68427D]">
                {" "}
                Weekly target{" "}
              </span>{" "}
              <span className="text-sm font-semibold text-[#5B2A86]">
                {" "}
                {progress.weekly_page_target} pages{" "}
              </span>{" "}
            </div>{" "}
            <div className="flex flex-col gap-1.5">
              {" "}
              <Label htmlFor="pages-reported" className="text-[#4A3B55]">
                {" "}
                Pages read (optional){" "}
              </Label>{" "}
              <Input
                id="pages-reported"
                type="number"
                min="0"
                inputMode="numeric"
                value={pagesReported}
                onChange={(event) => setPagesReported(event.target.value)}
                className="border-[#DCCBEA] bg-white text-[#33243D] placeholder:text-[#A89AB2] focus-visible:border-[#7B3FA1] focus-visible:ring-[#DCCBEA]"
              />{" "}
            </div>{" "}
            <Button
              type="button"
              size="sm"
              onClick={handleCheckIn}
              disabled={isCheckInPending}
              className="bg-[#5B2A86] text-white shadow-sm hover:bg-[#48206B] focus-visible:ring-[#D4AF6A]"
            >
              {" "}
              {isCheckInPending ? "Saving…" : "Mark week complete"}{" "}
            </Button>{" "}
          </div>
        )}{" "}
        <div className="flex items-center justify-between gap-2 border-t border-[#F0E8F5] pt-4">
          {" "}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => Browser.open({ url: book.retailer_url })}
            className="border-[#DCCBEA] bg-white text-[#68427D] hover:bg-[#F6F0FA] hover:text-[#5B2A86]"
          >
            {" "}
            Get the Book{" "}
          </Button>{" "}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onFinish}
            disabled={isFinishPending}
            className="text-[#7B3FA1] hover:bg-[#F6F0FA] hover:text-[#5B2A86]"
          >
            {" "}
            {isFinishPending ? "Saving…" : "Mark as Finished"}{" "}
          </Button>{" "}
        </div>{" "}
        <div className="h-1 w-10 rounded-full bg-[#D4AF6A]" />{" "}
      </CardContent>{" "}
    </Card>
  );
}
