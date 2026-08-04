import type React from "react";

export type RootLayoutProps = {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <header className="mx-2 text-xl">
        <div>
          <span>namahu's Portfolio</span>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};
