import ForgotPasswordForm from "@/components/forms/ForgatPasswordForm";

export default function ForgotPassword() {
  return (
    <div className="page-container bg-gradient-to-br from-[var(--color-accent-200)]/40 via-[var(--color-accent-200)]/20 to-[var(--color-primary-300)]">
      <main className="flex-1 flex flex-col items-center h-screen justify-center py-16 px-4">
        <ForgotPasswordForm />
      </main>
    </div>
  );
}
