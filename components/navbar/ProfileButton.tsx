"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProfileChart } from "@/components/navbar/ProfileChart";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface ProfileButtonProps {
  email: string;
  firstName?: string;
  lastName?: string;
}

export function ProfileButton({
  firstName,
  lastName,
  email,
}: ProfileButtonProps) {
  const fullName = `${firstName || ""} ${lastName || ""}`.trim();
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  const t = useTranslations("navbar");
  const [quizResults, setQuizResults] = useState<
    { quizId: string; score: number; title: string }[]
  >([]);

  useEffect(() => {
    const lastTenResults = async () => {
      const res = await fetch(`/api/quiz/last-results?numberOfQuizzes=10`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch quiz results");
      }
      const quizResults = await res.json();
      setQuizResults(quizResults);
    };
    lastTenResults();
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-[var(--color-accent-300)] hover:border-[var(--color-accent-400)] transition-colors">
            <AvatarFallback className="bg-[var(--color-accent-200)]">
              {getInitials(fullName)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 backdrop-blur-sm bg-[var(--color-primary-300)]/90 border border-[var(--color-secondary-200)]">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-[var(--color-secondary-200)]">
              {fullName}
            </h4>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>

          {/* Diagram */}
          <div className="pt-2">
            <ProfileChart quizResults={quizResults} />
          </div>

          {/* Log-out */}
          <form>
            <div className="flex justify-center">
              <Button
                formAction={logout}
                className="mt-5 bg-[var(--color-secondary-300)] text-[var(--color-primary-300)] hover:bg-[var(--color-secondary-200)] hover:scale-105 transition-colors duration-200"
              >
                {t("logout")}
              </Button>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
