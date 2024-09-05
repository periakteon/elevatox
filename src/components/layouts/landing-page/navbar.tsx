import Link from "next/link";
import { Link as SmoothScroll } from "react-scroll";
import { Loader2, UserCircle } from "lucide-react";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function LandingPageNavigation() {
  const router = useRouter();
  const url = router.asPath;

  const user = useUser();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div className="sticky top-0 z-50 bg-white/90 shadow-md backdrop-blur-sm dark:bg-slate-900/80">
        <header className="flex h-14 items-center px-4 lg:px-6">
          {" "}
          <Link className="flex items-center justify-center" href="/">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 256 256"
              height="2.5em"
              width="2.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm-32,80v96H136V112Zm-56,96H80V112h40Zm88,0H192V104a8,8,0,0,0-8-8H72a8,8,0,0,0-8,8V208H48V48H208V208ZM152,72a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,72Z"></path>
            </svg>
            <span className="ml-2 text-xl font-bold">E.</span>
            <span className="text-xl font-bold text-red-500">X.</span>
            <span className="sr-only">ElevatoX</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            {user.user === null && (
              <>
                <SmoothScroll
                  className="mt-1 text-sm font-medium underline-offset-4 hover:underline"
                  to="features"
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  Özellikler
                </SmoothScroll>
                <SmoothScroll
                  className="mt-1 text-sm font-medium underline-offset-4 hover:underline"
                  to="pricing"
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  Fiyatlar
                </SmoothScroll>
              </>
            )}
            {user.user && (
              <>
                <Link
                  className="mt-1 text-sm font-medium underline-offset-4 hover:underline"
                  href="/dashboard"
                >
                  Panel
                </Link>
              </>
            )}
            <Link
              className="mt-1 text-sm font-medium underline-offset-4 hover:underline"
              href="/iletisim"
            >
              İletişim
            </Link>
            <div className="-mt-1 ml-2">
              {user.user === undefined && (
                <Loader2 className="mt-1 animate-spin" />
              )}
              {user.user === null && (
                <SignInButton mode="modal" forceRedirectUrl={url}>
                  <UserCircle className="mt-1 h-6 w-6 cursor-pointer" />
                </SignInButton>
              )}
              {user.user && <UserButton />}
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}
