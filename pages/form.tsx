

import React, { FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormStore } from '../store/formSlice';
import { validateAccount, validateAddress } from '../validation/validate';
import AccountStep from '../components/AccountStep';
import AddressStep from '../components/AddressStep';

const Form: React.FC = () => {
  const {
    step,
    account,
    address,
    errors,
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
      // If no step in URL, set to default step 1
      setStep(1);
    }
  }, [router.query.step, setStep]);


  // --- Navigation & Validation ---
  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();

    // The schema will handle trimming and validation
    const result = await validateAccount(account);

    if (result.success && result.data) {
      // Update the store with the validated and transformed data
      updateAccount(result.data);
      setStep(2);
    } else if (result.errors) {
      clearErrors();
      Object.entries(result.errors).forEach(([field, message]) => {
        if (typeof message === 'string') {
          setError(field, message);
        }
      });
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    const result = await validateAddress(address);

    if (result.success) {
      // Submit the form
      alert('Form inviato con successo!');
    } else if (result.errors) {
      clearErrors();
      Object.entries(result.errors).forEach(([field, message]) => {
        if (typeof message === 'string') {
          setError(field, message);
        }
      });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 16 }}>
      <h2>Secure checkout <span role="img" aria-label="love">♥</span> scalapay</h2>
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001' }}>
        <div style={{ marginBottom: 24 }}>
          <b>Merchant</b>
          <div style={{ fontSize: 14, color: '#888' }}>Paga il tuo ordine in un massimo di 36 rate</div>
        </div>
        <form onSubmit={step === 1 ? handleContinue : handleSave}>
          {step === 1 ? <AccountStep /> : <AddressStep />}
          
        </form>
      </div>
    </div>
  );
};

export default Form;