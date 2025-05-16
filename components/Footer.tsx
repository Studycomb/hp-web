import { getTranslations } from "next-intl/server";

export default async function Footer({ title }: { title: string }) {
  const t = await getTranslations('footer')
  return (
    <footer className="bg-[var(--color-primary-400)] text-[var(--color-secondary-200)] text-center py-4">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} {title}. {t('allRightsReserved')}.
      </p>
    </footer>
  );
}
