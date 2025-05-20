import React from 'react';
import { useFormStore } from '../store/formSlice';
import styles from './AddressStep.module.css';
import accountStepStyles from './AccountStep.module.css';
import FormStep from './FormStep';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { useFormFieldChange } from '../hooks/useFormFieldChange';

const countryOptions = [
  { value: '', label: 'Nazione' },
  { value: 'IT', label: 'Italia' },
  { value: 'ES', label: 'Spagna' },
  { value: 'DE', label: 'Germania' },
  { value: 'PT', label: 'Portogallo' },
  { value: 'FR', label: 'Francia' },
];

import type { AddressStepProps } from '../types/form';

const AddressStep: React.FC<AddressStepProps> = ({ loading = false }) => {
  const { address, errors, updateAddress, setError } = useFormStore();
  const handleChange = useFormFieldChange(updateAddress, errors, setError);

  return (
    <>
      <FormStep heading="Indirizzo di residenza" className={styles.container}>
        <div className={accountStepStyles.formInputsColumn} >
          <div className={styles.flexLeft}>
            <FormInput
              type="text"
              name="address"
              placeholder="Via, piazza, etc"
              value={address.address}
              onChange={handleChange}
              errorName="address"
              className={styles.inputFull}
              data-testid="address-address-input"
            />
            <FormInput
              type="number"
              name="addressNumber"
              placeholder="N°"
              value={address.addressNumber}
              onChange={handleChange}
              errorName="addressNumber"
              className={styles.inputFull}
              min={1}
              data-testid="address-addressNumber-input"
            />
          </div>
          <div className={styles.flexRight}>
            <FormInput
              type="text"
              name="postalCode"
              placeholder="CAP"
              value={address.postalCode}
              onChange={handleChange}
              errorName="postalCode"
              className={styles.inputFull}
              data-testid="address-postalCode-input"
            />
            <FormInput
              type="text"
              name="province"
              placeholder="Provincia"
              value={address.province}
              onChange={handleChange}
              errorName="province"
              className={styles.inputFull}
              data-testid="address-province-input"
            />
          </div>
            <FormInput
              type="text"
              name="city"
              placeholder="Città"
              value={address.city}
              onChange={handleChange}
              errorName="city"
              className={styles.inputFull}
              data-testid="address-city-input"
            />
            <FormInput
              as="select"
              name="country"
              value={address.country}
              onChange={handleChange}
              errorName="country"
              className={styles.inputFull}
              options={countryOptions}
              data-testid="address-country-input"
            />
          <div className={styles.checkboxesGroup}>
            <div className={styles.flexAlignCenter}>
              <label className={styles.label} htmlFor="currentlyLiveHere">
                I currently live here
              </label>
              <FormInput
                id="currentlyLiveHere"
                type="checkbox"
                name="currentlyLiveHere"
                checked={address.currentlyLiveHere}
                onChange={handleChange}
                errorName="currentlyLiveHere"
              />
            </div>
            <div className={styles.flexAlignCenter}>
              <label className={styles.label} htmlFor="isPEP">
                Dichiaro di essere una PEP
              </label>
              <FormInput
                id="isPEP"
                type="checkbox"
                name="isPEP"
                checked={address.isPEP}
                onChange={handleChange}
                errorName="isPEP"
              />
            </div>
          </div>
        </div>
      </FormStep>
      <FormButton
        loading={loading}
        label="Salva"
        loadingLabel="Attendi..."
        className={accountStepStyles.bottomButton}
        data-testid="address-continue-button"
      />
    </>
  );
};

export default AddressStep;
