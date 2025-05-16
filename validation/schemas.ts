import { validateFiscalCode } from './validate';
import { z } from 'zod';

export const emailSchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string()
    .min(1, 'Email richiesta')
    .email('Email non valida')
  );



export const taxCodeSchema = z.string()
  .transform(val => val.trim().toUpperCase())
  .pipe(z.string()
    .min(1, 'Codice fiscale richiesto')
    .regex(
      /^[A-Za-z]{6}[0-9LMNPQRSTUV]{2}[A-Za-z]{1}[0-9LMNPQRSTUV]{2}[A-Za-z]{1}[0-9LMNPQRSTUV]{3}[A-Za-z]{1}$/,
      'Codice fiscale non valido'
    )
    .refine(
      async (val) => await validateFiscalCode(val),
      {
        message: 'Codice fiscale non valido o non esistente'
      }
    )
  );

export const dateSchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string()
    .min(1, 'Data di nascita richiesta')
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'Formato data non valido (YYYY-MM-DD)'
    )
    .refine(date => !isNaN(Date.parse(date)), {
      message: 'Data non valida'
    })
  );

// Address validation updates
const countryOptions = ["IT", "ES", "DE", "PT", "FR"] as const;

export const addressSchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string()
    .min(5, 'Indirizzo minimo 5 caratteri')
    .regex(/^[A-Za-zÀ-ÿ'\- ]+$/, 'L’indirizzo può contenere solo lettere, spazi, apostrofi e trattini')
  );

export const addressNumberSchema = z.preprocess(
  (val) => typeof val === 'string' ? parseInt(val, 10) : val,
  z.number({ invalid_type_error: 'Numero civico richiesto', required_error: 'Numero civico richiesto' })
    .int('Numero civico deve essere un intero')
    .min(1, 'Numero civico richiesto')
);

export const postalCodeSchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string().min(1, 'CAP richiesto'));

export const provinceSchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string().min(1, 'Provincia richiesta'));

export const citySchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string().min(1, 'Città richiesta'));

export const countrySchema = z.enum(countryOptions, {
  required_error: 'Nazione richiesta',
  invalid_type_error: 'Nazione non valida',
});

export const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ'\- ]+$/;

export const firstNameSchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string()
    .min(2, 'Nome richiesto')
    .regex(nameRegex, 'Il nome può contenere solo lettere, spazi, apostrofi e trattini')
  );

export const lastNameSchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string()
    .min(2, 'Cognome richiesto')
    .regex(nameRegex, 'Il cognome può contenere solo lettere, spazi, apostrofi e trattini')
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
