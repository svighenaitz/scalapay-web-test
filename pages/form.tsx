

import React, { FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormStore } from '../store/formSlice';
import { validateAccount, validateAddress } from '../validation/validate';
import AccountStep from '../components/AccountStep';
import AddressStep from '../components/AddressStep';
import formStyles from '../components/Form.module.css';
import Image from 'next/image';

const Form: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const {
    step,
    account,
    address,
    setStep,
    setError,
    clearErrors,
    updateAccount,
  } = useFormStore();

  const router = useRouter();

  // Sync Zustand step with URL param
  useEffect(() => {
    const urlStep = router.query.step;
    if (urlStep === '1' || urlStep === '2') {
      setStep(Number(urlStep) as 1 | 2);
    } else if (!urlStep) {
      // If no step in URL, update URL to step=1
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, step: 1 },
      }, undefined);
    }
  }, [router.query.step, setStep, router]);


  // --- Navigation & Validation ---
  const handleContinue = async (e: FormEvent) => {
  setLoading(true);
    e.preventDefault();

    // The schema will handle trimming and validation
    const result = await validateAccount(account);

    if (result.success && result.data) {
      // Update the store with the validated and transformed data
      updateAccount(result.data);
      // Update URL to step=2, which will trigger the effect to update Zustand
      router.push({
        pathname: router.pathname,
        query: { ...router.query, step: 2 },
      });
    } else if (result.errors) {
      clearErrors();
      Object.entries(result.errors).forEach(([field, message]) => {
        if (typeof message === 'string') {
          setError(field, message);
        }
      });
    }
    setLoading(false);
};

  const submitFormData = async (data: unknown) => {
    try {
      const resp = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return resp.ok;
    } catch {
      return false;
    }
    setLoading(false);
};

  const handleSave = async (e: FormEvent) => {
  setLoading(true);
    e.preventDefault();
    const result = await validateAddress(address);

    if (result.success) {
      // Submit the form to /submit with all form data
      const ok = await submitFormData({ ...account, ...address });
      if (ok) {
        alert('Form inviato con successo!');
      } else {
        alert('Errore nell’invio del form');
      }
    } else if (result.errors) {
      clearErrors();
      Object.entries(result.errors).forEach(([field, message]) => {
        if (typeof message === 'string') {
          setError(field, message);
        }
      });
    }
    setLoading(false);
};

  return (
    <div className={formStyles.container} style={{ position: 'relative', overflow: 'hidden' }}>
      <div className={formStyles.backgroundCircle} aria-hidden="true" />
      <div className={formStyles.heading}>
        <Image src="/Union.svg" alt="Logo" width={110} height={35} />        
      </div>
      <div className={formStyles.cardWrapper}>
        <div className={formStyles.card}>
          <b className={formStyles.merchantTitle}>Merchant</b>
          <div className={formStyles.merchantDesc}>Paga il tuo ordine in un massimo di 36 rate</div>
        </div>
        <form onSubmit={step === 1 ? handleContinue : handleSave}>
          {step === 1 ? <AccountStep loading={loading} /> : <AddressStep loading={loading} />}
        </form>
      </div>
    </div>
  );
  setLoading(false);
};

export default Form;