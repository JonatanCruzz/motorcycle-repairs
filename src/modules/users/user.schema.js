import { z } from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

export const registerSchema = z.object({
    name: z
        .string({
            invalid_type_error: 'name must be a string',
            required_error: 'name is required',
        })
        .min(3, { message: 'name is too short' })
        .max(50, { message: 'name is too long' }),
    email: z.string().email({ message: 'Invalid email' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(16, { message: 'Password is too long' }),
    role: z
        .string()
        .min(3, { message: 'role is too short' })
        .max(10, { message: 'role is too long' }),
});

export const loginUserSchema = z.object({
    email: z
        .string({
            invalid_type_error: 'email must be a string',
            required_error: 'email is required',
        })
        .email({ message: 'Invalid email' }),
    password: z
        .string({
            invalid_type_error: 'password must be a string',
            required_error: 'password is required',
        })
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(16, { message: 'Password is too long' }),
});

export function validateUser(data) {
    const result = registerSchema.safeParse(data);

    const {
        hasError,
        errorMessages,
        data: userData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessages,
        userData,
    };
}

export function validatePartialUser(data) {
    const result = registerSchema.partial().safeParse(data);

    const {
        hasError,
        errorMessages,
        data: userData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessages,
        userData,
    };
}

export function validateLogin(data) {
    const result = loginUserSchema.safeParse(data);

    const {
        hasError,
        errorMessages,
        data: userData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessages,
        userData,
    };
}