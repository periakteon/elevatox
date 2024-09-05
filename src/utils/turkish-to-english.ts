export function turkishToEnglish(text: string | undefined | null): string {
  const turkishChars: Record<string, string> = {
    ı: "i",
    ğ: "g",
    ü: "u",
    ş: "s",
    ö: "o",
    ç: "c",
    İ: "I",
    Ğ: "G",
    Ü: "U",
    Ş: "S",
    Ö: "O",
    Ç: "C",
  };

  if (!text) return "";

  return text.replace(/[ığıüşöçİĞÜŞÖÇ]/g, (char: string) => {
    return turkishChars[char] ?? char;
  });
}
