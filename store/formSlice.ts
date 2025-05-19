import { create } from 'zustand';

import type { FormSlice } from '../types/form';

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
