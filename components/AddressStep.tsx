import React, { ChangeEvent } from 'react';
import FieldError from './FieldError';
import { useFormStore } from '../store/formSlice';
import styles from './AddressStep.module.css';

const countryOptions = [
  { code: 'IT', label: 'Italia' },
  { code: 'ES', label: 'Spagna' },
  { code: 'DE', label: 'Germania' },
  { code: 'PT', label: 'Portogallo' },
  { code: 'FR', label: 'Francia' },
];

const AddressStep: React.FC = () => {
  const { address, errors, updateAddress, setError } = useFormStore();

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateAddress({ [e.target.name]: e.target.value });
    if (errors[e.target.name]) setError(e.target.name, '');
  };
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateAddress({ [e.target.name]: e.target.checked });
    if (errors[e.target.name]) setError(e.target.name, '');
  };

  return (
    <div className={styles.container}>
      <h3>Indirizzo di residenza</h3>
      <div className={styles.flex}>
        <input
          type="text"
          name="address"
          placeholder="Via, piazza, etc"
          value={address.address}
          onChange={handleAddressChange}
          className={styles.inputDouble}
        />
        <input
          type="number"
          name="addressNumber"
          placeholder="N°"
          value={address.addressNumber}
          onChange={handleAddressChange}
          className={styles.inputHalf}
          min={1}
        />
      </div>
      <FieldError name="address" />
      <FieldError name="addressNumber" />
      <div className={styles.flex}>
        <input
          type="text"
          name="postalCode"
          placeholder="CAP"
          value={address.postalCode}
          onChange={handleAddressChange}
          className={styles.inputHalf}
        />
        <input
          type="text"
          name="province"
          placeholder="Provincia"
          value={address.province}
          onChange={handleAddressChange}
          className={styles.inputHalf}
        />
      </div>
      <FieldError name="postalCode" />
      <FieldError name="province" />
      <div className={styles.flex}>
        <input
          type="text"
          name="city"
          placeholder="Città"
          value={address.city}
          onChange={handleAddressChange}
          className={styles.inputHalf}
        />
        <select
          name="country"
          value={address.country}
          onChange={handleAddressChange}
          className={styles.inputHalf}
        >
          <option value="">Seleziona Nazione</option>
          {countryOptions.map((opt) => (
            <option key={opt.code} value={opt.code}>{opt.label}</option>
          ))}
        </select>
      </div>
      <FieldError name="city" />
      <FieldError name="country" />
      <div className={styles.flexAlignCenter}>
        <label className={styles.label}>
          <input
            type="checkbox"
            name="currentlyLiveHere"
            checked={address.currentlyLiveHere}
            onChange={handleCheckboxChange}
          />{' '}
          I currently live here
        </label>
        <label className={styles.label}>
          <input
            type="checkbox"
            name="isPEP"
            checked={address.isPEP}
            onChange={handleCheckboxChange}
          />{' '}
          Dichiaro di essere una PEP
        </label>
      </div>
      <button type="submit" className={styles.button}>
        Salva
      </button>
    </div>
  );
};

export default AddressStep;
