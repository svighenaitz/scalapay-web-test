import { validateFiscalCode } from './validate';
import { z } from 'zod';

export const validationMessages = {
  email: {
    required: 'Email richiesta',
    invalid: 'Email non valida',
  },
  taxCode: {
    required: 'Codice fiscale richiesto',
    invalid: 'Codice fiscale non valido',
    notExists: 'Codice fiscale non valido o non esistente',
  },
  birthDate: {
    required: 'Data di nascita richiesta',
    invalidFormat: 'Formato data non valido (YYYY-MM-DD)',
    invalid: 'Data non valida',
  },
  address: {
    min: 'Indirizzo minimo 5 caratteri',
    invalid: "L’indirizzo può contenere solo lettere, spazi, apostrofi e trattini",
  },
  addressNumber: {
    required: 'Numero civico richiesto',
    invalid: 'Numero civico richiesto',
    notInt: 'Numero civico deve essere un intero',
    min: 'Numero civico richiesto',
  },
  postalCode: {
    required: 'CAP richiesto',
  },
  province: {
    required: 'Provincia richiesta',
  },
  city: {
    required: 'Città richiesta',
  },
  country: {
    required: 'Nazione richiesta',
    invalid: 'Nazione non valida',
  },
  firstName: {
    min: 'Nome richiesto',
    invalid: 'Il nome può contenere solo lettere, spazi, apostrofi e trattini',
  },
  lastName: {
    min: 'Cognome richiesto',
    invalid: 'Il cognome può contenere solo lettere, spazi, apostrofi e trattini',
  },
};

export const emailSchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string()
    .email(validationMessages.email.invalid)
    .min(1, validationMessages.email.required)
  );

export const taxCodeSchema = z.string()
  .transform(val => val.trim().toUpperCase())
  .pipe(z.string()
    .regex(
      /^[A-Za-z]{6}[0-9LMNPQRSTUV]{2}[A-Za-z]{1}[0-9LMNPQRSTUV]{2}[A-Za-z]{1}[0-9LMNPQRSTUV]{3}[A-Za-z]{1}$/,
      validationMessages.taxCode.invalid
    )
    .min(1, validationMessages.taxCode.required)
    .refine(
      async (val) => await validateFiscalCode(val),
      {
        message: validationMessages.taxCode.notExists
      }
    )
  );

export const dateSchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string()
    .min(1, validationMessages.birthDate.required)
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      validationMessages.birthDate.invalidFormat
    )
    .refine(date => !isNaN(Date.parse(date)), {
      message: validationMessages.birthDate.invalid
    })
  );

// Address validation updates
const countryOptions = ["IT", "ES", "DE", "PT", "FR"] as const;

export const addressSchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string()
    .regex(/^[A-Za-zÀ-ÿ'\- ]+$/, validationMessages.address.invalid)
    .min(5, validationMessages.address.min)
  );

export const addressNumberSchema = z.preprocess(
  (val) => typeof val === 'string' ? parseInt(val, 10) : val,
  z.number({ invalid_type_error: validationMessages.addressNumber.invalid, required_error: validationMessages.addressNumber.required })
    .int(validationMessages.addressNumber.notInt)
    .min(1, validationMessages.addressNumber.min)
);

export const postalCodeSchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string().min(1, validationMessages.postalCode.required));

export const provinceSchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string().min(1, validationMessages.province.required));

export const citySchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string().min(1, validationMessages.city.required));

export const countrySchema = z.enum(countryOptions, {
  required_error: validationMessages.country.required,
  invalid_type_error: validationMessages.country.invalid,
});

export const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ'\- ]+$/;

export const firstNameSchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string()
    .regex(nameRegex, validationMessages.firstName.invalid)
    .min(2, validationMessages.firstName.min)
  );

export const lastNameSchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string()
    .regex(nameRegex, validationMessages.lastName.invalid)
    .min(2, validationMessages.lastName.min)
  );

// Combined schemas
export const accountSchema = z.object({
  email: emailSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  taxCode: taxCodeSchema,
  birthDate: dateSchema,
});

export const addressFormSchema = z.object({
  address: addressSchema,
  addressNumber: addressNumberSchema,
  postalCode: postalCodeSchema,
  province: provinceSchema,
  city: citySchema,
  country: countrySchema,
});

export const formSchema = z.object({
  account: accountSchema,
  address: addressFormSchema,
});

export type FormData = z.infer<typeof formSchema>;
