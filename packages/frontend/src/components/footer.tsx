export function Footer() {
  const startYear = 2026;
  const now = new Date();
  const currentYear = now.getFullYear();
  const yearRenge = startYear === currentYear ? startYear : `${startYear} ~ ${currentYear}`;

  return (
    <div className="text-center text-zinc-500 py-2">
      <span>@ {yearRenge} namahu. All rights reserved.</span>
    </div>
  );
};
