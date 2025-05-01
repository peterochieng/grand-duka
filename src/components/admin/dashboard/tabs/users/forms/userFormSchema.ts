import { z } from "zod";
import { UserRole } from "@/lib/types/userTypes";
import { DateRange } from "react-day-picker";

export const userFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: z.string()
});

export type UserFormValues = z.infer<typeof userFormSchema>;

// User search schema for advanced filtering
export const userSearchSchema = z.object({
  query: z.string().optional(),
  role: z.string().optional(),
  dateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional()
    .transform((val) => {
      if (!val || (!val.from && !val.to)) return undefined;
      // Convert to proper DateRange format expected by DateRangePicker
      const result: DateRange = {
        from: val.from || new Date(), // Default to today if not provided
        to: val.to
      };
      return result;
    }),
  isOnline: z.boolean().default(false),
});

export type UserSearchValues = z.infer<typeof userSearchSchema>;
