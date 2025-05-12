// hooks/useQuizData.ts
import { useEffect, useState } from "react";
import { Alternative } from "@prisma/client";
import { QuizWithQuestionsAndAlternatives } from "@/lib/prismaTypes";
import { useParams } from "next/navigation";

export function useQuizData() {
  const { id: quizId } = useParams();
  const [quiz, setQuiz] = useState<QuizWithQuestionsAndAlternatives | null>(
    null
  );
  const [pickedAnswers, setPickedAnswers] = useState<Alternative[]>([]);
  const [pickedAnswer, setPickedAnswer] = useState<Alternative | null>(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const res = await fetch(`/api/quiz/${quizId}`);
        const data = await res.json();
        setQuiz(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuiz();
  }, [quizId]);

  const handleAnswerSelect = (answer: Alternative) => {
    const next = [...pickedAnswers];
    next[questionNumber] = answer;
    setPickedAnswers(next);
    setPickedAnswer(answer);
  };

  const saveResults = async () => {
    if (!quiz) return;
    const correctCount = pickedAnswers.reduce(
      (sum, a) => sum + (a?.is_correct ? 1 : 0),
      0
    );
    await fetch(`/api/quiz/${quiz.id}/result`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numberCorrectAnswers: correctCount }),
    });
  };

  const handleNext = () => {
    if (!pickedAnswer) {
      alert("Välj ett svar först!");
      return;
    }
    const total = quiz?.questions.length ?? 0;
    if (questionNumber + 1 < total) {
      setQuestionNumber((qn) => qn + 1);
      setPickedAnswer(pickedAnswers[questionNumber + 1] || null);
    }
  };

  const handlePrev = () => {
    if (questionNumber > 0) {
      const prevQuestionNumber = questionNumber - 1;
      setQuestionNumber(prevQuestionNumber);
      setPickedAnswer(pickedAnswers[prevQuestionNumber] || null);
    }
  };

  return {
    // existerande värden
    currentQuestion: quiz?.questions[questionNumber] ?? null,
    questionNumber,
    totalQuestionNumber: quiz?.questions.length ?? 0,
    pickedAnswer,
    handleAnswerSelect,
    handleNext,
    handlePrev,
    saveResults,
    quizCategory: quiz?.category ?? "",
    isLoading,
    pickedAnswers,
    quiz,
  };
}
