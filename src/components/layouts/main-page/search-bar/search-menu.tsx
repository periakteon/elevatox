import { useRouter } from "next/navigation";
import { type DialogProps } from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { searchBarConfig } from "./config";

export function CommandMenu({ ...props }: DialogProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64",
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Sayfa ara...</span>
        <span className="inline-flex lg:hidden">Ara...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Sayfalar arasında arama yapın..." />
        <CommandList>
          <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>
          <CommandGroup heading="Firma Kısayolları">
            {searchBarConfig.company
              .filter((navitem) => !navitem.external)
              .map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => {
                    runCommand(() => router.push(navItem.href));
                  }}
                >
                  <span className="mr-2">{navItem.icon}</span>
                  {navItem.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Personel Kısayolları">
            {searchBarConfig.staff
              .filter((navitem) => !navitem.external)
              .map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => {
                    runCommand(() => router.push(navItem.href));
                  }}
                >
                  <span className="mr-2">{navItem.icon}</span>
                  {navItem.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Bina Sorumluları Kısayolları">
            {searchBarConfig.buildingResponsiblePerson
              .filter((navitem) => !navitem.external)
              .map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => {
                    runCommand(() => router.push(navItem.href));
                  }}
                >
                  <span className="mr-2">{navItem.icon}</span>
                  {navItem.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Asansör Kısayolları">
            {searchBarConfig.elevator
              .filter((navitem) => !navitem.external)
              .map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => {
                    runCommand(() => router.push(navItem.href));
                  }}
                >
                  <span className="mr-2">{navItem.icon}</span>
                  {navItem.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Bakım Kısayolları">
            {searchBarConfig.maintenance
              .filter((navitem) => !navitem.external)
              .map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => {
                    runCommand(() => router.push(navItem.href));
                  }}
                >
                  <span className="mr-2">{navItem.icon}</span>
                  {navItem.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Tahsilat Kısayolları">
            {searchBarConfig.payment
              .filter((navitem) => !navitem.external)
              .map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => {
                    runCommand(() => router.push(navItem.href));
                  }}
                >
                  <span className="mr-2">{navItem.icon}</span>
                  {navItem.title}
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
