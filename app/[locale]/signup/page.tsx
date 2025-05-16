import SignupForm from "@/components/forms/SignupForm";

export default function Signup() {
  return (
    <div className="page-container bg-gradient-to-br from-[var(--color-accent-200)]/40 via-[var(--color-accent-200)]/20 to-[var(--color-primary-300)]">
      <main className="flex-1 flex flex-col h-screen items-center justify-center py-16 px-4">
        <SignupForm />
      </main>
    </div>
  );
}
