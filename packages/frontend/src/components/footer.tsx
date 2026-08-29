export function Footer() {
  const startYear = 2026;
  const now = new Date();
  const currentYear = now.getFullYear();
  const yearRange = startYear === currentYear ? startYear : `${startYear} ~ ${currentYear}`;

  return (
    <footer className="text-center text-zinc-500 py-2">
      <span>© {yearRange} namahu. All rights reserved.</span>
    </footer>
  );
};
