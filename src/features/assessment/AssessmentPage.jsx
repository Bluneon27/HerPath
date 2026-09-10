import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { QUESTIONS } from "./questions";
import { scoreAssessment } from "./scoring";
import { submitAssessment } from "./submitAssessment";
import { AssessmentResults } from "./AssessmentResults";
import { useAuth } from "@/features/auth/AuthProvider";
import { useUiStore } from "@/store/useUiStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const TOTAL_QUESTIONS = QUESTIONS.length;

export function AssessmentPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, setLoading, showToast, toast, clearToast } = useUiStore();

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  // The toast store is global; clear out anything left over from the page
  // (e.g. login/sign-up) that sent the user here.
  useEffect(() => {
    clearToast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const question = QUESTIONS[stepIndex];
  const isLastQuestion = stepIndex === TOTAL_QUESTIONS - 1;
  const currentAnswer = answers[question.id];
  const isAnswered =
    question.type === "free-text"
      ? Boolean(currentAnswer?.trim())
      : Boolean(currentAnswer);

  function setAnswer(value) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function goBack() {
    clearToast();
    setStepIndex((index) => Math.max(0, index - 1));
  }

  async function goNext() {
    if (!isAnswered) return;
    clearToast();

    if (!isLastQuestion) {
      setStepIndex((index) => index + 1);
      return;
    }

    setLoading(true);
    try {
      const scored = scoreAssessment(answers);
      await submitAssessment(user.id, answers);
      // Deliberately not invalidating the assessment-status query yet: this
      // route is also gated by SkipIfAssessed, and refetching now would make
      // it see a completed assessment and immediately redirect away to
      // /home before the results screen ever renders. Invalidate on Continue
      // instead, once the user has actually seen their results.
      setResult(scored);
    } catch (error) {
      showToast(
        error.message ?? "Could not save your assessment. Please try again.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleContinue() {
    await queryClient.invalidateQueries({
      queryKey: ["growth-assessment-status", user.id],
    });
    navigate("/home", { replace: true });
  }

  if (result) {
    return <AssessmentResults result={result} onContinue={handleContinue} />;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4 bg-[#FAF8FC] p-4">
      {" "}
      <div className="flex flex-col gap-2">
        {" "}
        <div className="text-center">
          {" "}
          <h1 className="text-lg font-semibold text-[#5B2A86]">
            {" "}
            Discover Your Growth Path{" "}
          </h1>{" "}
          <p className="mt-1 text-sm leading-relaxed text-[#8E7A9D]">
            {" "}
            Take a moment to reflect. Your answers will help us understand where
            you can focus your growth.{" "}
          </p>{" "}
        </div>{" "}
        <div className="mt-2 flex items-center justify-between">
          {" "}
          <p className="text-sm font-medium text-[#7B3FA1]">
            {" "}
            Question {stepIndex + 1} of {TOTAL_QUESTIONS}{" "}
          </p>{" "}
          <p className="text-xs text-[#9B8BA6]">
            {" "}
            {Math.round(((stepIndex + 1) / TOTAL_QUESTIONS) * 100)}%
            complete{" "}
          </p>{" "}
        </div>{" "}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EDE4F2]">
          {" "}
          <div
            className="h-full rounded-full bg-[#5B2A86] transition-all"
            style={{ width: `${((stepIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
          />{" "}
        </div>{" "}
      </div>{" "}
      <Card className="border-[#E2D4EB] bg-white shadow-[0_8px_30px_rgba(75,45,110,0.08)]">
        {" "}
        <CardHeader className="border-b border-[#F0E8F5]">
          {" "}
          <p className="text-xs font-medium tracking-wide text-[#D4AF6A] uppercase">
            {" "}
            Growth Assessment{" "}
          </p>{" "}
          <CardTitle className="text-lg leading-snug font-medium text-[#4B236D]">
            {" "}
            {question.text}{" "}
          </CardTitle>{" "}
          <p className="text-sm leading-relaxed text-[#8E7A9D]">
            {" "}
            Choose the answer that best reflects you. There are no right or
            wrong answers.{" "}
          </p>{" "}
        </CardHeader>{" "}
        <CardContent className="flex flex-col gap-3 pt-6">
          {" "}
          {question.type === "single-select" ? (
            <div className="flex flex-col gap-2.5">
              {" "}
              {question.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setAnswer(option.id)}
                  aria-pressed={currentAnswer === option.id}
                  className={cn(
                    "rounded-xl border p-4 text-left text-sm transition-colors",
                    currentAnswer === option.id
                      ? "border-[#7B3FA1] bg-[#F6F0FA] font-medium text-[#5B2A86] shadow-sm"
                      : "border-[#E2D4EB] bg-white text-[#4A3B55] hover:border-[#DCCBEA] hover:bg-[#FAF8FC]",
                  )}
                >
                  {" "}
                  {option.label}{" "}
                </button>
              ))}{" "}
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {" "}
              <Textarea
                value={currentAnswer ?? ""}
                onChange={(event) => setAnswer(event.target.value)}
                maxLength={question.maxLength}
                rows={5}
                placeholder="Take a moment and share your thoughts…"
                className="border-[#DCCBEA] bg-white text-[#33243D] placeholder:text-[#A89AB2] focus-visible:border-[#7B3FA1] focus-visible:ring-[#DCCBEA]"
              />{" "}
              <p className="text-right text-xs text-[#9B8BA6]">
                {" "}
                {(currentAnswer ?? "").length}/{question.maxLength}{" "}
              </p>{" "}
            </div>
          )}{" "}
          {toast ? (
            <p
              className={
                toast.variant === "error"
                  ? "text-sm text-red-600"
                  : "text-sm text-[#7B3FA1]"
              }
            >
              {" "}
              {toast.message}{" "}
            </p>
          ) : null}{" "}
          <div className="mt-2 flex items-center justify-between gap-3">
            {" "}
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              disabled={stepIndex === 0 || isLoading}
              className="border-[#DCCBEA] bg-white text-[#68427D] hover:bg-[#F6F0FA] hover:text-[#5B2A86]"
            >
              {" "}
              Back{" "}
            </Button>{" "}
            <Button
              type="button"
              onClick={goNext}
              disabled={!isAnswered || isLoading}
              className="bg-[#5B2A86] text-white shadow-sm hover:bg-[#48206B] focus-visible:ring-[#D4AF6A]"
            >
              {" "}
              {isLoading
                ? "Saving…"
                : isLastQuestion
                  ? "See My Results"
                  : "Next"}{" "}
            </Button>{" "}
          </div>{" "}
          <p className="mt-1 text-center text-xs text-[#A596AF]">
            {" "}
            Take your time and answer honestly.{" "}
          </p>{" "}
        </CardContent>{" "}
      </Card>{" "}
    </div>
  );
}
