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

export const addressSchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string().min(1, 'Indirizzo richiesto'));

export const addressNumberSchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string().min(1, 'Numero civico richiesto'));

export const postalCodeSchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string().min(1, 'CAP richiesto'));

export const provinceSchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string().min(1, 'Provincia richiesta'));

export const citySchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string().min(1, 'Città richiesta'));

export const countrySchema = z.string()
  .transform(val => val.trim())
  .pipe(z.string().min(1, 'Nazione richiesta'));

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
