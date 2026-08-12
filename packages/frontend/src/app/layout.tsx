import type React from "react";

export type RootLayoutProps = {
  children: React.ReactNode;
};

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="w-full animate-fade-in">
      <header className="mx-2 text-xl">
        <div>
          <span>namahu's Portfolio</span>
        </div>
      </header>
      <main className="w-full">{children}</main>
    </div>
  );
}
