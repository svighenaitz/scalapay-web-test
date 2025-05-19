export type FormState = {
  step: 1 | 2;
  account: {
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    taxCode: string;
  };
  address: {
    address: string;
    addressNumber: string;
    postalCode: string;
    province: string;
    city: string;
    country: string;
    currentlyLiveHere: boolean;
    isPEP: boolean;
  };
  errors: {
    [field: string]: string;
  };
};

export type FormSlice = FormState & {
  setStep: (step: 1 | 2) => void;
  updateAccount: (account: Partial<FormState['account']>) => void;
  updateAddress: (address: Partial<FormState['address']>) => void;
  setError: (field: string, error: string) => void;
  clearErrors: () => void;
};

export interface AccountStepProps {
  loading?: boolean;
}

export interface AddressStepProps {
  loading?: boolean;
}

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  errorName: string;
  as?: 'input' | 'select';
  options?: { value: string; label: string }[];
  className?: string;
}

export interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  label: string;
  loadingLabel?: string;
  className?: string;
}

export interface FormStepProps {
  heading: string;
  children: React.ReactNode;
  className?: string;
}

export interface FieldErrorProps {
  name: string;
}
