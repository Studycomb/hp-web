import { Progress } from "@/components/ui/progress";

interface StatusBarProps {
  questionNumber: number;
  totalQuestions: number;
}

export default function StatusBar({
  questionNumber,
  totalQuestions,
}: StatusBarProps) {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <Progress
      value={progress}
      className="h-3 bg-[var(--color-primary-400)] [&>div]:bg-[var(--color-accent-300)]"
    />
  );
}
