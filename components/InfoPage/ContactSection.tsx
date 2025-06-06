import { motion } from "framer-motion";
import { Mail, Phone, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

export const ContactSection = ({
  email,
  telephoneTimes,
  timeStamp,
  more,
}: {
  email: string;
  telephoneTimes: string;
  timeStamp: string;
  more: string;
}) => {
  const t = useTranslations("info");
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-20 w-full lg:w-2/3"
    >
      <h2 className="text-2xl font-bold mb-6 text-[var(--color-accent-400)] flex items-center gap-2">
        <Mail className="w-6 h-6" />
        {t("contact.title")}
      </h2>
      <div className="bg-[var(--color-primary-300)]/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
        <div className="space-y-4">
          <p className="flex items-center gap-2 text-[var(--color-secondary-200)]">
            <Mail className="w-5 h-5 text-[var(--color-accent-200)]" />
            <a
              href="mailto:info@studycomb.se"
              className="text-[var(--color-accent-200)] hover:text-[var(--color-accent-400)] transition-colors"
            >
              {email}
            </a>
          </p>
          <p className="flex items-center gap-2 text-[var(--color-secondary-200)]">
            <Phone className="w-5 h-5 text-[var(--color-accent-200)]" />
            <span>{telephoneTimes}</span>
          </p>
          <p className="flex items-center gap-2 text-[var(--color-secondary-200)]">
            <Clock className="w-5 h-5 text-[var(--color-accent-200)]" />
            <span>{timeStamp}</span>
          </p>
          <p className="mt-4 text-[var(--color-secondary-200)]">
            {more}
          </p>
        </div>
      </div>
    </motion.section>
  );
};
