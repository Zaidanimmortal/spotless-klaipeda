import * as React from "react";

type Language = "lt" | "en";

type LanguageSwitcherProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
  className?: string;
};

export function LanguageSwitcher({
  language,
  onLanguageChange,
  className = "",
}: LanguageSwitcherProps) {
  const buttonClass = (selected: boolean) =>
    `rounded-full px-3 py-2 font-bold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#193a3f] focus-visible:ring-offset-2 ${selected ? "bg-[#193a3f] text-white shadow-sm" : "text-[#4d696c] hover:bg-[#193a3f]/5 hover:text-[#193a3f]"}`;

  return (
    <div
      role="group"
      aria-label="Kalba / Language"
      className={`inline-flex w-fit rounded-full border border-[#193a3f]/15 bg-white p-1 text-[11px] font-extrabold tracking-[0.04em] shadow-sm ${className}`}
    >
      <button
        type="button"
        onClick={() => onLanguageChange("lt")}
        aria-pressed={language === "lt"}
        title="Lietuvių"
        className={buttonClass(language === "lt")}
      >
        LT · Lietuvių
      </button>
      <button
        type="button"
        onClick={() => onLanguageChange("en")}
        aria-pressed={language === "en"}
        title="English"
        className={buttonClass(language === "en")}
      >
        EN · English
      </button>
    </div>
  );
}
