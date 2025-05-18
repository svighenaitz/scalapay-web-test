import React from 'react';
import { useFormStore } from '../store/formSlice';
import styles from './AddressStep.module.css';
import FormStep from './FormStep';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { useFormFieldChange } from './useFormFieldChange';

const countryOptions = [
  { value: '', label: 'Seleziona Nazione' },
  { value: 'IT', label: 'Italia' },
  { value: 'ES', label: 'Spagna' },
  { value: 'DE', label: 'Germania' },
  { value: 'PT', label: 'Portogallo' },
  { value: 'FR', label: 'Francia' },
];

interface AddressStepProps {
  loading?: boolean;
}

const AddressStep: React.FC<AddressStepProps> = ({ loading = false }) => {
  const { address, errors, updateAddress, setError } = useFormStore();
  const handleChange = useFormFieldChange(updateAddress, errors, setError);

  return (
    <FormStep heading="Indirizzo di residenza" className={styles.container}>
      <div className={styles.flex}>
        <FormInput
          type="text"
          name="address"
          placeholder="Via, piazza, etc"
          value={address.address}
          onChange={handleChange}
          errorName="address"
          className={styles.inputDouble}
        />
        <FormInput
          type="number"
          name="addressNumber"
          placeholder="N°"
          value={address.addressNumber}
          onChange={handleChange}
          errorName="addressNumber"
          className={styles.inputHalf}
          min={1}
        />
      </div>
      <div className={styles.flex}>
        <FormInput
          type="text"
          name="postalCode"
          placeholder="CAP"
          value={address.postalCode}
          onChange={handleChange}
          errorName="postalCode"
          className={styles.inputHalf}
        />
        <FormInput
          type="text"
          name="province"
          placeholder="Provincia"
          value={address.province}
          onChange={handleChange}
          errorName="province"
          className={styles.inputHalf}
        />
      </div>
      <div className={styles.flex}>
        <FormInput
          type="text"
          name="city"
          placeholder="Città"
          value={address.city}
          onChange={handleChange}
          errorName="city"
          className={styles.inputHalf}
        />
        <FormInput
          as="select"
          name="country"
          value={address.country}
          onChange={handleChange}
          errorName="country"
          className={styles.inputHalf}
          options={countryOptions}
        />
      </div>
      <div className={styles.flexAlignCenter}>
        <label className={styles.label} htmlFor="currentlyLiveHere">
          <FormInput
            id="currentlyLiveHere"
            type="checkbox"
            name="currentlyLiveHere"
            checked={address.currentlyLiveHere}
            onChange={handleChange}
            errorName="currentlyLiveHere"
          />
          I currently live here
        </label>
        <label className={styles.label} htmlFor="isPEP">
          <FormInput
            id="isPEP"
            type="checkbox"
            name="isPEP"
            checked={address.isPEP}
            onChange={handleChange}
            errorName="isPEP"
          />
          Dichiaro di essere una PEP
        </label>
      </div>
      <FormButton
        loading={loading}
        label="Salva"
        loadingLabel="Attendi..."
        className={styles.button}
      />
    </FormStep>
  );
};

export default AddressStep;
