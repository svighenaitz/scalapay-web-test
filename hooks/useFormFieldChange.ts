import { ChangeEvent } from 'react';

type Errors = Record<string, string>;

type UpdateFn = (data: Record<string, unknown>) => void;
type SetErrorFn = (field: string, error: string) => void;

export function useFormFieldChange(updateFn: UpdateFn, errors: Errors, setError: SetErrorFn) {
  return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
    updateFn({ [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value });
    if (errors[name]) setError(name, '');
  };
}
