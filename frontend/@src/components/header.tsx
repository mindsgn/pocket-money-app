"use client";

import { Button } from "@/@src/components/ui/button";
import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Logo />
          <span className="font-bold text-xl">Vibe Connect</span>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link title="btn-signin" href="/signin">
            Sign In
          </Link>
        </Button>
      </div>
    </header>
  );
}
