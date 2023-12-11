import { z } from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

export const repairSchema = z.object({
    date: z
        .string({
            invalid_type_error: 'date must be a string',
            required_error: 'date is required',
        })
        .min(3, { message: 'date is too short' })
        .max(50, { message: 'date is too long' }),
    motorsNumber: z
        .number({
            invalid_type_error: 'motorsNumber must be an integer',
            required_error: 'motorsNumber is required'
        }),
    description: z
        .string({
            invalid_type_error: 'description must be a string',
            required_error: 'description is required',
        })
        .min(3, { message: 'description is too short' })
        .max(250, { message: 'description is too long' }),
    userId: z
        .number({
            invalid_type_error: 'userId must be an integer',
            required_error: 'userId is required',
        }),
});

export function validateRepair(data) {
    const result = repairSchema.safeParse(data);

    const {
        hasError,
        errorMessages,
        data: repairData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessages,
        repairData,
    };
};

export function validatePartialRepair(data) {
    const result = repairSchema.partial().safeParse(data);

    const {
        hasError,
        errorMessages,
        data: repairData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessages,
        repairData,
    };
}