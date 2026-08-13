import type React from "react";

export type RootLayoutProps = {
  children: React.ReactNode;
};

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 animate-fade-in">
      <header className="py-4 text-xl font-bold">
        <div>
          <span>namahu's Portfolio</span>
        </div>
      </header>
      <main className="w-full overflow-x-hidden">{children}</main>
    </div>
  );
}
