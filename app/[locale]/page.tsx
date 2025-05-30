// import Link from "next/link";
import { Link } from "@/i18n/navigation";
import { CirclePlay } from "lucide-react";
import { getTranslations } from "next-intl/server";
//import siteInfo from "@/configs/sv-static";

// this comp should take as props the title and description of the app and the logo
export default async function Home() {
  const t = await getTranslations("home");
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[var(--color-primary-200)] to-[var(--color-primary-400)]">
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-16 pb-8">
        <div className="max-w-5xl w-full mx-auto flex flex-col items-center">
          <h1 className="text-5xl mt-10 md:text-7xl font-bold text-center mb-2 tracking-tight text-[var(--color-secondary-200)]">
            {t("title")}
          </h1>
          <p className="text-sm text-center text-[var(--color-secondary-200)] mb-12">
            {t("company")}
          </p>
          <StartButton />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-12">
            <Kontakt />
            <FAQ />
            <AboutUs />
          </div>
        </div>
      </main>
    </div>
  );
}

const StartButton = () => {
  return (
    <Link
      href="/quizMenu"
      className="mb-16 bg-[var(--color-accent-400)] text-[var(--color-primary-300)] rounded-full flex items-center justify-center w-40 h-40 md:w-56 md:h-56
             hover:scale-110 transition-transform duration-300 border-4 border-[var(--color-accent-200)] hover:border-[var(--color-accent-200)] shadow-md"
    >
      <div className="flex flex-col items-center justify-center">
        <CirclePlay className="h-16 w-16 md:h-24 md:w-24" />
      </div>
    </Link>
  );
};

const Kontakt = async () => {
  const t = await getTranslations("home");
  return (
    <Link
      href="/info#kontakt"
      className="bg-[var(--color-primary-200)] rounded-xl p-6 shadow-md 
                         hover:shadow-lg hover:scale-105 transition-all duration-300 block"
    >
      <h3 className="text-xl font-semibold mb-2 text-[var(--color-secondary-200)]">
        {t("contact.title")}
      </h3>
      <p className="text-[var(--color-secondary-200)]">
        {t("contact.description")}
      </p>
    </Link>
  );
};

const FAQ = async () => {
  const t = await getTranslations("home");
  return (
    <Link
      href="/info#faq"
      className="bg-[var(--color-primary-200)] rounded-xl p-6 shadow-md 
                         hover:shadow-lg hover:scale-105 transition-all duration-300 block"
    >
      <h3 className="text-xl font-semibold mb-2 text-[var(--color-secondary-200)]">
        {t("faq.title")}
      </h3>
      <p className="text-[var(--color-secondary-200)]">
        {t("faq.description")}
      </p>
    </Link>
  );
};

const AboutUs = async () => {
  const t = await getTranslations("home");
  return (
    <Link
      href="/info#om-oss"
      className="bg-[var(--color-primary-200)] rounded-xl p-6 shadow-md 
                         hover:shadow-lg hover:scale-105 transition-all duration-300 block"
    >
      <h3 className="text-xl font-semibold mb-2 text-[var(--color-secondary-200)]">
        {t("about.title")}
      </h3>
      <p className="text-[var(--color-secondary-200)]">
        {t("about.description")}
      </p>
    </Link>
  );
};
