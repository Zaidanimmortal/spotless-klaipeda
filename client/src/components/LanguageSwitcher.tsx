import * as React from "react";

type Language = "lt" | "en";
type Variant = "header" | "menu";

type LanguageSwitcherProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
  variant?: Variant;
};

export function LanguageSwitcher({
  language,
  onLanguageChange,
  variant = "menu",
}: LanguageSwitcherProps) {
  const isHeader = variant === "header";
  const groupClass = isHeader
    ? "inline-flex items-center gap-0.5 rounded-full border border-[#c9d8cf] bg-[#edf4ef] p-1 text-[10px] font-extrabold tracking-[0.04em] shadow-[0_6px_18px_rgba(25,58,63,.1)]"
    : "flex rounded-full border border-[#193a3f]/15 bg-white p-1 text-[11px] font-extrabold tracking-[0.04em]";

  const buttonClass = (selected: boolean) => {
    const base = "rounded-full px-3 py-2 font-bold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#193a3f] focus-visible:ring-offset-2";
    if (!isHeader) {
      return `${base} ${selected ? "bg-[#193a3f] text-white" : "text-[#4d696c]"}`;
    }
    return `${base} ${selected ? "bg-[#193a3f] text-white shadow-[0_2px_9px_rgba(25,58,63,.22)]" : "text-[#536e68] hover:bg-white/85 hover:text-[#193a3f]"}`;
  };

  const indicator = (selected: boolean) =>
    isHeader ? (
      <span
        aria-hidden="true"
        className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full transition-colors duration-150 ${selected ? "bg-[#b9d8d7]" : "bg-[#9bb4a6]"}`}
      />
    ) : null;

  return (
    <div role="group" aria-label="Kalba / Language" className={groupClass}>
      <button
        type="button"
        onClick={() => onLanguageChange("lt")}
        aria-pressed={language === "lt"}
        title="Lietuvių"
        className={buttonClass(language === "lt")}
      >
        {indicator(language === "lt")}LT · Lietuvių
      </button>
      <button
        type="button"
        onClick={() => onLanguageChange("en")}
        aria-pressed={language === "en"}
        title="English"
        className={buttonClass(language === "en")}
      >
        {indicator(language === "en")}EN · English
      </button>
    </div>
  );
}
