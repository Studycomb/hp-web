import Link from "next/link";
import { CirclePlay } from "lucide-react";
import siteInfo from "@/siteConfig";

// this comp should take as props the title and description of the app and the logo
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[var(--color-primary-200)] to-[var(--color-primary-400)]">
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-16 pb-8">
        <div className="max-w-5xl w-full mx-auto flex flex-col items-center">
          <h1 className="text-5xl mt-10 md:text-7xl font-bold text-center mb-2 tracking-tight text-[var(--color-secondary-200)]">
            {siteInfo.title}
          </h1>
          <p className="text-sm text-center text-[var(--color-secondary-200)] mb-12">
            powered by Mindswarm
          </p>

          <Link
            href="/start-now"
            className="mb-16 bg-[var(--color-accent-400)] text-[var(--color-primary-300)] rounded-full flex items-center justify-center w-40 h-40 md:w-56 md:h-56
             hover:scale-110 transition-transform duration-300 border-4 border-[var(--color-accent-200)] hover:border-[var(--color-accent-200)] shadow-md"
          >
            <div className="flex flex-col items-center justify-center">
              <CirclePlay className="h-16 w-16 md:h-24 md:w-24" />
              {siteInfo.startButton.showText && (
                <span className="font-semibold text-lg md:text-xl mt-2">
                  {siteInfo.startButton.text}
                </span>
              )}
            </div>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            {/* Kontakt */}
            <Link
              href="/info#kontakt"
              className="bg-[var(--color-primary-200)] rounded-xl p-6 shadow-md 
                         hover:shadow-lg hover:scale-105 transition-all duration-300 block"
            >
              <h3 className="text-xl font-semibold mb-2 text-[var(--color-secondary-200)]">Kontakt</h3>
              <p className="text-[var(--color-secondary-200)]">
                Tveka inte att höra av dig till oss om du har frågor eller
                funderingar.
              </p>
            </Link>

            {/* FAQ */}
            <Link
              href="/info#faq"
              className="bg-[var(--color-primary-200)] rounded-xl p-6 shadow-md 
                         hover:shadow-lg hover:scale-105 transition-all duration-300 block"
            >
              <h3 className="text-xl font-semibold mb-2 text-[var(--color-secondary-200)]">FAQ</h3>
              <p className="text-[var(--color-secondary-200)]">
                Kolla in vår FAQ-sektion för svar på vanliga frågor och
                funderingar.
              </p>
            </Link>

            {/* Om oss */}
            <Link
              href="/info#om-oss"
              className="bg-[var(--color-primary-200)] rounded-xl p-6 shadow-md 
                         hover:shadow-lg hover:scale-105 transition-all duration-300 block"
            >
              <h3 className="text-xl font-semibold mb-2 text-[var(--color-secondary-200)]">Om oss</h3>
              <p className="text-[var(--color-secondary-200)]">
                Vi är ett team av passionerade individer som gör lärande roligt
                och effektivt.
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
