import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { useUiStore } from "@/store/useUiStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DISPLAY_NAME_MAX_LENGTH = 50;

export function LoginPage() {
  const { session, signIn, signUp } = useAuth();
  const { isLoading, setLoading, showToast, toast } = useUiStore();
  const [mode, setMode] = useState("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  if (session) {
    return <Navigate to="/home" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const { error } =
      mode === "sign-in"
        ? await signIn(email, password)
        : await signUp(email, password, displayName.trim());

    setLoading(false);

    if (error) {
      showToast(error.message, "error");
      return;
    }

    if (mode === "sign-up") {
      showToast("Account created!", "success");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8FC] p-4">
      {" "}
      <Card className="w-full max-w-sm border-[#E8DDF2] bg-white shadow-[0_10px_40px_rgba(75,45,110,0.10)]">
        {" "}
        <CardHeader className="border-b border-[#F0E8F5] pb-5">
          {" "}
          <CardTitle className="text-center text-2xl font-semibold text-[#5B2A86]">
            {" "}
            {mode === "sign-in" ? "Welcome back" : "Create your account"}{" "}
          </CardTitle>{" "}
          <p className="mt-2 text-center text-sm leading-relaxed text-[#8E7A9D]">
            {" "}
            {mode === "sign-in"
              ? "Sign in to continue your learning and growth journey."
              : "Start your journey and discover opportunities to grow."}{" "}
          </p>{" "}
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#D4AF6A]" />{" "}
        </CardHeader>{" "}
        <CardContent className="pt-6">
          {" "}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {" "}
            {mode === "sign-up" ? (
              <div className="flex flex-col gap-2">
                {" "}
                <Label htmlFor="display-name" className="text-[#4A3B55]">
                  {" "}
                  Display Name{" "}
                </Label>{" "}
                <Input
                  id="display-name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={DISPLAY_NAME_MAX_LENGTH}
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  className="border-[#DCCBEA] bg-white text-[#33243D] placeholder:text-[#A89AB2] focus-visible:border-[#7B3FA1] focus-visible:ring-[#DCCBEA]"
                />{" "}
              </div>
            ) : null}{" "}
            <div className="flex flex-col gap-2">
              {" "}
              <Label htmlFor="email" className="text-[#4A3B55]">
                {" "}
                Email{" "}
              </Label>{" "}
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="border-[#DCCBEA] bg-white text-[#33243D] placeholder:text-[#A89AB2] focus-visible:border-[#7B3FA1] focus-visible:ring-[#DCCBEA]"
              />{" "}
            </div>{" "}
            <div className="flex flex-col gap-2">
              {" "}
              <Label htmlFor="password" className="text-[#4A3B55]">
                {" "}
                Password{" "}
              </Label>{" "}
              <Input
                id="password"
                type="password"
                autoComplete={
                  mode === "sign-in" ? "current-password" : "new-password"
                }
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="border-[#DCCBEA] bg-white text-[#33243D] placeholder:text-[#A89AB2] focus-visible:border-[#7B3FA1] focus-visible:ring-[#DCCBEA]"
              />{" "}
            </div>{" "}
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
            <Button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full bg-[#5B2A86] text-white shadow-sm hover:bg-[#48206B] focus-visible:ring-[#D4AF6A]"
            >
              {" "}
              {isLoading
                ? "Please wait…"
                : mode === "sign-in"
                  ? "Sign in"
                  : "Create account"}{" "}
            </Button>{" "}
            <button
              type="button"
              className="text-sm text-[#7B3FA1] underline-offset-4 hover:text-[#5B2A86] hover:underline"
              onClick={() =>
                setMode(mode === "sign-in" ? "sign-up" : "sign-in")
              }
            >
              {" "}
              {mode === "sign-in"
                ? "Don't have an account? Create one"
                : "Already have an account? Sign in"}{" "}
            </button>{" "}
          </form>{" "}
        </CardContent>{" "}
      </Card>{" "}
    </div>
  );
}
