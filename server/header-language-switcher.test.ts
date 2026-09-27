import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { LanguageSwitcher } from "../client/src/components/LanguageSwitcher";

describe("header LanguageSwitcher", () => {
  it("renders both language choices and highlights the selected option", () => {
    for (const language of ["lt", "en"] as const) {
      const markup = renderToStaticMarkup(
        createElement(LanguageSwitcher, {
          language,
          onLanguageChange: () => undefined,
          variant: "header",
        }),
      );

      expect(markup).toContain('aria-label="Kalba / Language"');
      expect(markup).toContain("LT · Lietuvių");
      expect(markup).toContain("EN · English");
      expect(markup).toContain("bg-[#edf4ef]");
      expect(markup).toContain('aria-pressed="true"');
      expect(markup).toContain(`aria-pressed="${language === "en"}"`);
      expect(markup).toContain("focus-visible:ring-2");
    }
  });

  it("calls the language callback for either option", () => {
    const onLanguageChange = vi.fn();
    const element = LanguageSwitcher({
      language: "lt",
      onLanguageChange,
      variant: "header",
    });
    const buttons = element.props.children as Array<{
      props: { onClick?: () => void };
    }>;

    buttons[1]?.props.onClick?.();
    expect(onLanguageChange).toHaveBeenLastCalledWith("en");
    buttons[0]?.props.onClick?.();
    expect(onLanguageChange).toHaveBeenLastCalledWith("lt");
    expect(onLanguageChange).toHaveBeenCalledTimes(2);
  });
});
