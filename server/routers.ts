import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createBooking } from "./db";

const bookingInput = z.object({
  customerName: z.string().trim().min(2).max(160),
  phone: z.string().trim().min(6).max(40),
  service: z.string().trim().min(2).max(180),
  bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid date"),
  bookingTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Choose a valid time"),
  notes: z.string().trim().max(3000).optional(),
});

const isWithinWorkingHours = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes >= 8 * 60 && totalMinutes < 18 * 60;
};

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  booking: router({
    create: publicProcedure.input(bookingInput).mutation(async ({ input }) => {
      if (!isWithinWorkingHours(input.bookingTime)) {
        throw new Error("Bookings are available every day between 08:00 and 18:00.");
      }

      const booking = await createBooking({
        customerName: input.customerName,
        phone: input.phone,
        service: input.service,
        bookingDate: input.bookingDate,
        bookingTime: input.bookingTime,
        notes: input.notes || null,
      });

      const notified = await notifyOwner({
        title: `New Švarus Krantas booking · ${input.bookingDate} ${input.bookingTime}`,
        content: [
          `Customer: ${input.customerName}`,
          `Phone: ${input.phone}`,
          `Service: ${input.service}`,
          `Requested time: ${input.bookingDate} at ${input.bookingTime}`,
          input.notes ? `Notes: ${input.notes}` : "Notes: —",
          "Business hours: every day, 08:00–18:00 (Europe/Vilnius)",
        ].join("\n"),
      });

      return { success: true, bookingId: booking.id, notified } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;
