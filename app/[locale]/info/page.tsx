"use client";

import { ContactSection } from "@/components/InfoPage/ContactSection";
import { FAQSection } from "@/components/InfoPage/FAQSection";
import { AboutSection } from "@/components/InfoPage/AboutSection";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function InfoPage() {
  const t = useTranslations("info");

  const KEYS = ['0', '1', '2'] as const;
  const faqItems = KEYS.map((key) => ({
    question: t(`FAQ.faqItems.${key}.question`),
    answer: t(`FAQ.faqItems.${key}.answer`)
  }));
  const aboutItems = KEYS.map((key) => t(`about.${key}`));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary-200)] to-[var(--color-accent-200)] pt-16 pb-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[var(--color-accent-300)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--color-accent-400)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-accent-300)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent 
                     bg-gradient-to-r from-[var(--color-accent-300)] to-[var(--color-accent-400)]"
        >
        {t("title")}
        </motion.h1>

        <div className="space-y-20">
          {/* Kontakt */}
          {/* scroll-mt-28 => när vi navigerar till #kontakt hamnar rubriken nedanför nav-baren */}
          <section id="kontakt" className="scroll-mt-28">
            <ContactSection
              email={t('contact.email')}
              telephoneTimes={t('contact.telephoneTimes')}
              timeStamp={t('contact.timeStamp')}
              more={t('contact.more')}
            />
          </section>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-24">
            <FAQSection faq={faqItems} />
          </section>

          {/* Om oss */}
          <section id="om-oss" className="scroll-mt-20">
            <AboutSection about={aboutItems} />
          </section>
        </div>
      </div>
    </div>
  );
}
