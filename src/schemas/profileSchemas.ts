import { z } from 'zod';

export const phoneNumberSchema = z
    .string()
    .trim()
    .nonempty({ message: 'El teléfono es obligatorio' })
    .regex(/^\d+$/, { message: 'El teléfono solo puede contener dígitos' })
    .min(6, { message: 'El teléfono debe contener entre 6-14 dígitos' })
    .max(14, { message: 'El teléfono debe contener entre 6-14 dígitos' })

export const storeDataFormSchema = z.object({
    name: z.string().trim().nonempty({ message: 'El nombre es obligatorio' }),
    address: z.string().trim().optional(),
    tel: phoneNumberSchema
});

export type StoreDataForm = z.infer<typeof storeDataFormSchema>;

export const userDataFormSchema = z.object({
    name: z.string().trim().nonempty({ message: 'El nombre es obligatorio'}),
    last_name: z.string().trim().nonempty({ message: 'El apellido es obligatorio' }),
    email: z.string()
    .min(1, { message: 'El email es obligatorio' })
    .email({ message: 'Formato incorrecto: ejemplo@correo.com' })
});

export type UserDataForm = z.infer<typeof userDataFormSchema>;