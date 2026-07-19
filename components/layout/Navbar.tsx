"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Leaf, Menu, X } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const loggedOutLinks = [
  { href: "/", label: "Home" },
  { href: "/plants", label: "Explore" },
  { href: "/identify", label: "Identify" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

const loggedInLinks = [
  { href: "/", label: "Home" },
  { href: "/plants", label: "Explore" },
  { href: "/identify", label: "Identify" },
  { href: "/plants/add", label: "Add Plant" },
  { href: "/plants/manage", label: "Manage" },
  { href: "/dashboard", label: "Dashboard" },
];

export const Navbar = () => {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const links = session ? loggedInLinks : loggedOutLinks;

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sand bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-canopy text-paper">
            <Leaf size={16} />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-canopy">
            PlantPal
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-sm font-medium transition-colors",
                  isActive ? "text-canopy" : "text-ink/60 hover:text-ink",
                  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-canopy after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100",
                  isActive && "after:scale-x-100"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isPending ? null : session ? (
            <>
              <span className="text-sm text-ink/60">Hi, {session.user.name.split(" ")[0]}</span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-ink/70 hover:text-canopy">
                Log in
              </Link>
              <Button size="sm" onClick={() => router.push("/register")}>
                Sign up
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-sand bg-paper px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-ink/80"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-3 border-t border-sand pt-3">
              {session ? (
                <Button variant="outline" size="sm" onClick={handleSignOut} className="w-full">
                  Log out
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setOpen(false);
                      router.push("/login");
                    }}
                  >
                    Log in
                  </Button>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setOpen(false);
                      router.push("/register");
                    }}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
