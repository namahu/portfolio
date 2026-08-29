import { Footer } from "@/components/footer";
import type React from "react";

export type RootLayoutProps = {
  children: React.ReactNode;
};

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="w-full min-h-screen mx-auto px-4 sm:px-6 animate-fade-in flex flex-col">
      <header className="py-4 text-xl font-bold">
        <div>
          <span>namahu's Portfolio</span>
        </div>
      </header>
      <main className="flex-1 w-full overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}
