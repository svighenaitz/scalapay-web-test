import { z } from 'zod';
import { formSchema, accountSchema, addressFormSchema } from './schemas';

export type ValidationResult<T = unknown> = {
  success: boolean;
  errors?: Record<string, string>;
  data?: T; // The validated and transformed data
};

export const validateForm = async (data: unknown): Promise<ValidationResult<z.infer<typeof formSchema>>> => {
  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach(issue => {
      const path = issue.path.join('.');
      errors[path] = issue.message;
    });

    return {
      success: false,
      errors,
    };
  }

  return {
    success: true,
    data: result.data
  };
};

export const validateAccount = async (data: unknown): Promise<ValidationResult<z.infer<typeof accountSchema>>> => {
  const result = await accountSchema.safeParseAsync(data);

  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach(issue => {
      const path = issue.path.join('.');
      errors[path] = issue.message;
    });

    return {
      success: false,
      errors,
    };
  }

  return {
    success: true,
    data: result.data
  };
};

export const validateAddress = async (data: unknown): Promise<ValidationResult<z.infer<typeof addressFormSchema>>> => {
  const result = await addressFormSchema.safeParseAsync(data);

  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach(issue => {
      const path = issue.path.join('.');
      errors[path] = issue.message;
    });
    return {
      success: false,
      errors,
    };
  }
  return {
    success: true,
    data: result.data
  };
};

export const validateFiscalCode = async (value: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
  return value === "ABCDEF85S14F112Y"; // Mock backend validation: only this value is valid
};  
