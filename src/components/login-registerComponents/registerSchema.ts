import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
});
export const passwordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const personalInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
});

export const storeInfoSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  storePhone: z.string().min(1, "Store phone is required"),
  storeAddress: z.string().optional(),
});

export const registerSchema = z.object({
  email: emailSchema.shape.email,
  password: passwordSchema.shape.password,
  name: personalInfoSchema.shape.name,
  lastName: personalInfoSchema.shape.lastName,
  dateOfBirth: personalInfoSchema.shape.dateOfBirth,
  storeName: storeInfoSchema.shape.storeName,
  storePhone: storeInfoSchema.shape.storePhone,
  storeAddress: storeInfoSchema.shape.storeAddress,
});

export type RegisterFormData = z.infer<typeof registerSchema>;
