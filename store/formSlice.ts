import { create } from 'zustand';

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

export const useFormStore = create<FormSlice>((set) => ({
  step: 1,
  account: {
    email: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    taxCode: '',
  },
  address: {
    address: '',
    addressNumber: '',
    postalCode: '',
    province: '',
    city: '',
    country: '',
    currentlyLiveHere: false,
    isPEP: false,
  },
  errors: {},
  setStep: (step) => set({ step }),
  updateAccount: (account) => set((state) => ({ account: { ...state.account, ...account } })),
  updateAddress: (address) => set((state) => ({ address: { ...state.address, ...address } })),
  setError: (field, error) => set((state) => ({ errors: { ...state.errors, [field]: error } })),
  clearErrors: () => set({ errors: {} }),
}));
