import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { LanguageSwitcher } from "../client/src/components/LanguageSwitcher";

describe("LanguageSwitcher", () => {
  it("keeps Lithuanian and English visible and marks the selected language", () => {
    for (const language of ["lt", "en"] as const) {
      const markup = renderToStaticMarkup(
        createElement(LanguageSwitcher, {
          language,
          onLanguageChange: () => undefined,
        }),
      );
      const buttons = Array.from(
        markup.matchAll(/<button\b([^>]*)>(.*?)<\/button>/g),
      );

      expect(markup).toContain('aria-label="Kalba / Language"');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]?.[2]).toBe("LT · Lietuvių");
      expect(buttons[1]?.[2]).toBe("EN · English");
      expect(buttons[0]?.[1]).toContain(`aria-pressed="${language === "lt"}"`);
      expect(buttons[1]?.[1]).toContain(`aria-pressed="${language === "en"}"`);
    }
  });

  it("calls the language callback when either choice is selected", () => {
    const onLanguageChange = vi.fn();
    const element = LanguageSwitcher({
      language: "lt",
      onLanguageChange,
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
