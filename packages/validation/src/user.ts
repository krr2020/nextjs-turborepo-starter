/**
 * User validation schemas
 */

import { z } from "zod";

import { emailSchema, passwordSchema } from "./common";

/**
 * User registration schema
 */
export const userRegistrationSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(2, "Name must be at least 2 characters").trim(),
});

/**
 * User login schema
 */
export const userLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

/**
 * User profile update schema
 */
export const userProfileUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").trim().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

