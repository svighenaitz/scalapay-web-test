import React, { useMemo } from 'react';
import { accountStepPlaceholders } from './accountStepPlaceholders';
import { useFormStore } from '../store/formSlice';
import DatePicker from 'react-datepicker';
import { it } from 'date-fns/locale';
import { subYears, isBefore } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './AccountStep.module.css';
import FormStep from './FormStep';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { useFormFieldChange } from '../hooks/useFormFieldChange';
import FieldError from './FieldError';

const MINIMUM_AGE = 18;

import type { AccountStepProps } from '../types/form';

const AccountStep: React.FC<AccountStepProps> = ({ loading = false }) => {
  const { account, errors, updateAccount, setError } = useFormStore();
  const handleAccountChange = useFormFieldChange(updateAccount, errors, setError);
  
  // Calculate the min and max dates (120 years ago and 18 years ago from today)
  const minDate = useMemo(() => subYears(new Date(), 120), []);
  const maxDate = useMemo(() => subYears(new Date(), MINIMUM_AGE), []);
  
  // Calculate the default view date (18 years ago)
  const defaultViewDate = useMemo(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - MINIMUM_AGE);
    return date;
  }, []);
  
  // Check if the selected date makes the user at least 18 years old
  const isOver18 = account.birthDate 
    ? isBefore(new Date(account.birthDate), maxDate)
    : false;

  return (
    <>
      <FormStep heading="Crea account">
      <div className={styles.formInputsColumn}>
        <FormInput
          type="text"
          name="email"
          placeholder={accountStepPlaceholders.find(f => f.name === 'email')!.placeholder}
          value={account.email}
          onChange={handleAccountChange}
          errorName="email"
          className={styles.inputFull}
          data-testid="account-email-input"
        />
        <FormInput
          type="text"
          name="firstName"
          placeholder={accountStepPlaceholders.find(f => f.name === 'firstName')!.placeholder}
          value={account.firstName}
          onChange={handleAccountChange}
          errorName="firstName"
          className={styles.inputFull}
          data-testid="account-firstName-input"
        />
        <FormInput
          type="text"
          name="lastName"
          placeholder={accountStepPlaceholders.find(f => f.name === 'lastName')!.placeholder}
          value={account.lastName}
          onChange={handleAccountChange}
          errorName="lastName"
          className={styles.inputFull}
          data-testid="account-lastName-input"
        />
        <div>
          <div className={styles['date-picker-container']} data-testid="account-birthDate-input">
            <DatePicker
              selected={account.birthDate ? new Date(account.birthDate) : null}
              onChange={(date: Date | null) => {
                if (errors.birthDate) setError('birthDate', '');
                updateAccount({ birthDate: date ? date.toISOString().split('T')[0] : '' });
              }}
              onBlur={() => {
                if (!account.birthDate) {
                  setError('birthDate', 'Data di nascita richiesta');
                } else if (!isOver18) {
                  setError('birthDate', `Devi avere almeno ${MINIMUM_AGE} anni`);
                }
              }}
              dateFormat="dd/MM/yyyy"
              placeholderText={accountStepPlaceholders.find(f => f.name === 'birthDate')!.placeholder}
              className={`date-picker ${errors.birthDate ? styles['error-border'] : ''}`}
              locale={it}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              minDate={minDate}
              maxDate={maxDate}
              showMonthDropdown
              dropdownMode="select"
              isClearable
              yearItemNumber={100}
              selectsStart
              startDate={account.birthDate ? new Date(account.birthDate) : null}
              adjustDateOnChange
              openToDate={account.birthDate ? new Date(account.birthDate) : defaultViewDate}            
            />
          </div>
          {/* Keep FieldError for birthDate for clarity */}
          {/* You could also wrap this in a FormInput abstraction if needed */}
          <FieldError name="birthDate" />
        </div>
        <FormInput
          type="text"
          name="taxCode"
          placeholder={accountStepPlaceholders.find(f => f.name === 'taxCode')!.placeholder}
          value={account.taxCode}
          onChange={handleAccountChange}
          errorName="taxCode"
          className={styles.inputFull}
          data-testid="account-taxCode-input"
        />
      </div>
    </FormStep>
    <FormButton
      loading={loading}
      label="Continua"
      loadingLabel="Attendi..."
      className={styles.bottomButton}
      data-testid="account-continue-button"
    />
    </>
  );
};

export default AccountStep;
