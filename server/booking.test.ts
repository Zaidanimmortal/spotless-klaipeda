import { describe, expect, it } from "vitest";
import { isWithinWorkingHours } from "./routers";

describe("booking working hours", () => {
  it("rejects times outside daily working hours", () => {
    expect(isWithinWorkingHours("18:00")).toBe(false);
    expect(isWithinWorkingHours("07:30")).toBe(false);
  });

  it("accepts every half-hour slot from 08:00 through 17:30", () => {
    expect(isWithinWorkingHours("08:00")).toBe(true);
    expect(isWithinWorkingHours("12:30")).toBe(true);
    expect(isWithinWorkingHours("17:30")).toBe(true);
  });
});
