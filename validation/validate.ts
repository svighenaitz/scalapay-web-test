import { z } from 'zod';
import { formSchema, accountSchema, addressFormSchema } from './schemas';

export type ValidationResult<T = any> = {
  success: boolean;
  errors?: Record<string, string>;
  data?: T; // The validated and transformed data
};

export const validateForm = (data: unknown): ValidationResult<z.infer<typeof formSchema>> => {
  const result = formSchema.safeParse(data);
  
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

export const validateAccount = (data: unknown): ValidationResult<z.infer<typeof accountSchema>> => {
  const result = accountSchema.safeParse(data);
  
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

export const validateAddress = (data: unknown): ValidationResult<z.infer<typeof addressFormSchema>> => {
  const result = addressFormSchema.safeParse(data);
  
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
