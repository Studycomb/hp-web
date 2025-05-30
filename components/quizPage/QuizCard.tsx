"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnswerOption from "@/components/quizPage/AnswerOption";
import StatusBar from "@/components/quizPage/ProgressBar";
import { Alternative } from "@prisma/client";
import { useQuizData } from "@/hooks/useQuizData";
import { useTranslations } from "next-intl";
import ResultPopup, { QuizResult } from "@/components/quizPage/ResultPopover";

export default function QuizCard() {
  const {
    currentQuestion,
    questionNumber,
    totalQuestionNumber,
    pickedAnswer,
    handleAnswerSelect,
    handleNext,
    handlePrev,
    saveResults,
    quizCategory,
    isLoading,
    // vi behöver också hela fråge-objektet:
    // quiz?.questions, men vi kan få via currentQuestion + questionNumber
    pickedAnswers,
    quiz, // om du vill nå alla frågor
  } = useQuizData();
  const t = useTranslations("buttons");

  const [showResults, setShowResults] = React.useState(false);
  const [results, setResults] = React.useState<QuizResult[]>([]);

  const finishQuiz = async () => {
    if (!pickedAnswer || !quiz) return;

    // Spara poäng-server
    await saveResults();

    // Bygg resultat-array för alla frågor
    const all: QuizResult[] = quiz.questions.map((q, idx) => {
      const picked = pickedAnswers[idx];
      const correctAlt = q.alternatives.find((a) => a.is_correct);
      return {
        id: idx,
        question: q.question,
        isCorrect: picked?.id === correctAlt?.id,
      };
    });

    setResults(all);
    setShowResults(true);
  };

  const onNextClick = () => {
    if (!pickedAnswer) return;
    if (questionNumber === totalQuestionNumber - 1) {
      finishQuiz();
    } else {
      handleNext();
    }
  };

  if (isLoading || !currentQuestion) {
    // loading state
    return (
      <Card className="w-full max-w-xl shadow-xl p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-[var(--color-primary-400)] rounded w-3/4 mx-auto" />
          <div className="h-3 bg-[var(--color-primary-400)] rounded w-1/2 mx-auto" />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-[var(--color-primary-400)] rounded" />
            ))}
          </div>
          <div className="h-10 bg-[var(--color-accent-200)] rounded w-full" />
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full max-w-xl shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold">
            {quizCategory}
          </CardTitle>
          <CardDescription className="text-center">
            Pröva din förmåga att förstå ord och begrepp
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <StatusBar
            questionNumber={questionNumber}
            totalQuestions={totalQuestionNumber}
          />
          <label className="font-bold block">{currentQuestion.question}</label>
          <div className="space-y-3">
            {currentQuestion.alternatives.map((alt: Alternative) => (
              <AnswerOption
                key={alt.id}
                answer={alt}
                isSelected={pickedAnswer?.id === alt.id}
                onClick={() => handleAnswerSelect(alt)}
              />
            ))}
          </div>
          <div className="flex justify-between py-1.5">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={questionNumber === 0}
              className="w-1/2 mr-0.5"
            >
              {t("prev")}
            </Button>
            <Button
              disabled={!pickedAnswer}
              onClick={onNextClick}
              className={`w-1/2 ml-0.5 font-bold transition ${
                pickedAnswer
                  ? "bg-[var(--color-accent-200)] text-[var(--color-secondary-300)] hover:bg-[var(--color-accent-400)]"
                  : "bg-[var(--color-accent-200)] text-[var(--color-secondary-300)]"
              }`}
            >
              {questionNumber === totalQuestionNumber - 1
                ? t("finish")
                : t("next")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <ResultPopup
        open={showResults}
        onOpenChange={setShowResults}
        results={results}
        onClose={() => setShowResults(false)}
      />
    </>
  );
}
