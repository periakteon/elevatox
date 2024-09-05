import ModeToggle from "@/components/mode-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  Building2,
  ClipboardList,
  Home,
  Loader2,
  MenuIcon,
  ScrollText,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function AdminNavbar() {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  const hamburgerMenuRef = useRef<HTMLDivElement>(null);

  const hamburgerIconRef = useRef<HTMLButtonElement>(null);

  const user = useUser();

  const router = useRouter();

  const { pathname } = router;

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        hamburgerMenuRef.current &&
        !hamburgerIconRef.current?.contains(event.target as Node) &&
        !hamburgerMenuRef.current.contains(event.target as Node)
      ) {
        setIsHamburgerMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsHamburgerMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900`}
      >
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Button
                ref={hamburgerIconRef}
                onClick={() => setIsHamburgerMenuOpen(!isHamburgerMenuOpen)}
                className="inline-flex items-center rounded-lg bg-primary-foreground p-2 text-sm text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:bg-primary-foreground dark:text-gray-400 dark:hover:bg-slate-700 dark:focus:ring-slate-600 sm:hidden"
              >
                <MenuIcon />
              </Button>
              <Link href="/dashboard" className="ml-2 flex md:mr-24">
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
                <div className="ml-2 flex items-center justify-center">
                  <span className="ml-2 text-xl font-bold">E.</span>
                  <span className="text-xl font-bold text-red-500">X.</span>
                  <span className="sr-only">ElevatoX</span>
                </div>
              </Link>
              <span className="hidden self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl md:ml-12 md:inline lg:ml-12 lg:inline">
                ADMIN PANELİ
              </span>
            </div>
            <div className="flex items-center">
              <div className="ml-3 flex items-center">
                <div className="mr-6 flex h-8 w-8 flex-row rounded-full">
                  <div>
                    {user?.isSignedIn ? (
                      <UserButton />
                    ) : (
                      <Loader2 className="animate-spin" />
                    )}
                  </div>
                </div>
                <div className="mr-4">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        ref={hamburgerMenuRef}
        className={`fixed -top-4 left-0 z-40 h-screen w-64 -translate-x-full border-r border-slate-200 bg-white pt-20 transition-transform dark:border-slate-700 dark:bg-slate-900 sm:translate-x-0 ${
          isHamburgerMenuOpen ? "translate-x-0" : ""
        }`}
      >
        {" "}
        <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-slate-900">
          <Accordion type="single" className="mt-4">
            <AccordionItem value="item-1">
              <Home className="-mb-10" />
              <AccordionTrigger
                isChevronOpen={false}
                className={cn(
                  "ml-10 text-lg font-semibold tracking-tight",
                  pathname === "/admin"
                    ? "border-r-4 border-slate-500 underline underline-offset-2 dark:border-slate-400"
                    : "",
                )}
                onClick={() => void router.push("/admin")}
              >
                ANASAYFA
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="item-1">
              <Building2 className="-mb-10" />
              <AccordionTrigger
                isChevronOpen={true}
                className="ml-10 text-lg font-semibold tracking-tight"
              >
                FİRMALAR
              </AccordionTrigger>
              <AccordionContent className="">
                <Link
                  href="/admin/companies"
                  className={cn(
                    "block",
                    "w-full",
                    "justify-start",
                    buttonVariants({ variant: "ghost" }),
                    pathname === "/admin/companies"
                      ? "bg-muted hover:bg-muted"
                      : "hover:bg-transparent hover:underline",
                    "justify-start",
                  )}
                >
                  <ClipboardList color="#1C82AD" size={20} className="mr-2" />
                  Firma Listesi
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="item-1">
              <Users className="-mb-10" />
              <AccordionTrigger
                isChevronOpen={true}
                className="ml-10 text-lg font-semibold tracking-tight"
              >
                KULLANICILAR
              </AccordionTrigger>
              <AccordionContent className="">
                <Link
                  href="/admin/users"
                  className={cn(
                    "block",
                    "w-full",
                    "justify-start",
                    buttonVariants({ variant: "ghost" }),
                    pathname === "/admin/users"
                      ? "bg-muted hover:bg-muted"
                      : "hover:bg-transparent hover:underline",
                    "justify-start",
                  )}
                >
                  <ScrollText
                    color={`${
                      resolvedTheme === "dark" ? "#e6cca5" : "#765827"
                    }`}
                    size={20}
                    className="mr-2"
                  />
                  Kullanıcı Listesi
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </aside>
    </>
  );
}
