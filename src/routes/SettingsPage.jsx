import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/AuthProvider";
import { useNotificationPreferences } from "@/features/reading/useNotificationPreferences";
import { saveNotificationPreferences } from "@/features/reading/mutations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SettingsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: preferences, isLoading } = useNotificationPreferences();

  const [dailyEnabled, setDailyEnabled] = useState(true);
  const [dailyTime, setDailyTime] = useState("19:00");
  const [weeklyEnabled, setWeeklyEnabled] = useState(true);

  useEffect(() => {
    if (!preferences) return;
    setDailyEnabled(preferences.daily_reminder_enabled);
    setDailyTime(preferences.daily_reminder_time?.slice(0, 5) ?? "19:00");
    setWeeklyEnabled(preferences.weekly_checkin_enabled);
  }, [preferences]);

  const saveMutation = useMutation({
    mutationFn: saveNotificationPreferences,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["notification-preferences", user.id],
      }),
  });

  function handleSave() {
    saveMutation.mutate({
      userId: user.id,
      daily_reminder_enabled: dailyEnabled,
      daily_reminder_time: dailyTime,
      weekly_checkin_enabled: weeklyEnabled,
    });
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col gap-4 bg-[#FAF8FC] p-6">
      {" "}
      <div className="flex items-center justify-between">
        {" "}
        <div>
          {" "}
          <h1 className="text-xl font-semibold text-[#5B2A86]">
            {" "}
            Notification Settings{" "}
          </h1>{" "}
          <p className="mt-1 text-sm text-[#8E7A9D]">
            {" "}
            Stay consistent with your reading journey.{" "}
          </p>{" "}
        </div>{" "}
        <Link
          to="/home"
          className="text-sm font-medium text-[#7B3FA1] underline-offset-4 hover:text-[#5B2A86] hover:underline"
        >
          {" "}
          Back{" "}
        </Link>{" "}
      </div>
      {isLoading ? (
        <p className="text-sm text-[#8E7A9D]">Loading…</p>
      ) : (
        <Card className="border-[#E2D4EB] bg-white shadow-[0_8px_30px_rgba(75,45,110,0.08)]">
          {" "}
          <CardHeader className="border-b border-[#F0E8F5]">
            {" "}
            <CardTitle className="text-lg font-semibold text-[#5B2A86]">
              {" "}
              Reading Reminders{" "}
            </CardTitle>
            <p className="text-sm leading-relaxed text-[#8E7A9D]">
              {" "}
              Choose when you would like gentle reminders to keep up with your
              reading and weekly check-ins.{" "}
            </p>{" "}
            <div className="h-1 w-10 rounded-full bg-[#D4AF6A]" />
          </CardHeader>
          <CardContent className="flex flex-col gap-5 pt-6">
            {" "}
            <div className="flex items-start justify-between gap-4">
              {" "}
              <div className="flex flex-col gap-1">
                {" "}
                <Label htmlFor="daily-enabled" className="text-[#4A3B55]">
                  {" "}
                  Daily reading reminder{" "}
                </Label>{" "}
                <p className="text-xs leading-relaxed text-[#9B8BA6]">
                  {" "}
                  Get a reminder each day to spend time reading.{" "}
                </p>{" "}
              </div>
              <Switch
                id="daily-enabled"
                checked={dailyEnabled}
                onCheckedChange={(checked) => setDailyEnabled(checked)}
                className="data-[state=checked]:bg-[#5B2A86]"
              />
            </div>
            {dailyEnabled ? (
              <div className="flex flex-col gap-1.5 rounded-lg bg-[#FAF8FC] p-3">
                {" "}
                <Label htmlFor="daily-time" className="text-[#4A3B55]">
                  {" "}
                  Reminder time{" "}
                </Label>
                <p className="text-xs text-[#9B8BA6]">
                  {" "}
                  Choose a time that works best for your daily reading.{" "}
                </p>{" "}
                <Input
                  id="daily-time"
                  type="time"
                  value={dailyTime}
                  onChange={(event) => setDailyTime(event.target.value)}
                  className="mt-1 border-[#DCCBEA] bg-white text-[#33243D] focus-visible:border-[#7B3FA1] focus-visible:ring-[#DCCBEA]"
                />
              </div>
            ) : null}
            <div className="flex items-start justify-between gap-4">
              {" "}
              <div className="flex flex-col gap-1">
                {" "}
                <Label htmlFor="weekly-enabled" className="text-[#4A3B55]">
                  {" "}
                  Weekly check-in reminder{" "}
                </Label>{" "}
                <p className="text-xs leading-relaxed text-[#9B8BA6]">
                  {" "}
                  Receive a weekly reminder to reflect on your progress.{" "}
                </p>{" "}
              </div>
              <Switch
                id="weekly-enabled"
                checked={weeklyEnabled}
                onCheckedChange={(checked) => setWeeklyEnabled(checked)}
                className="data-[state=checked]:bg-[#5B2A86]"
              />
            </div>
            <Button
              type="button"
              onClick={handleSave}
              disabled={saveMutation.isPending}
              className="mt-1 w-full bg-[#5B2A86] text-white shadow-sm hover:bg-[#48206B] focus-visible:ring-[#D4AF6A]"
            >
              {saveMutation.isPending ? "Saving…" : "Save Preferences"}{" "}
            </Button>
            <p className="text-center text-xs text-[#A596AF]">
              {" "}
              Your reminder preferences can be changed at any time.{" "}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
