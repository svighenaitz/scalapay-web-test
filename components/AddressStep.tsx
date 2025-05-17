import React, { ChangeEvent } from 'react';
import FieldError from './FieldError';
import { useFormStore } from '../store/formSlice';

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
    <div>
      <h3>Indirizzo di residenza</h3>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          name="address"
          placeholder="Via, piazza, etc"
          value={address.address}
          onChange={handleAddressChange}
          style={{ flex: 2, marginBottom: 8 }}
        />
        <input
          type="number"
          name="addressNumber"
          placeholder="N°"
          value={address.addressNumber}
          onChange={handleAddressChange}
          style={{ flex: 1, marginBottom: 8 }}
          min={1}
        />
      </div>
      <FieldError name="address" />
      <FieldError name="addressNumber" />
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          name="postalCode"
          placeholder="CAP"
          value={address.postalCode}
          onChange={handleAddressChange}
          style={{ flex: 1, marginBottom: 8 }}
        />
        <input
          type="text"
          name="province"
          placeholder="Provincia"
          value={address.province}
          onChange={handleAddressChange}
          style={{ flex: 1, marginBottom: 8 }}
        />
      </div>
      <FieldError name="postalCode" />
      <FieldError name="province" />
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          name="city"
          placeholder="Città"
          value={address.city}
          onChange={handleAddressChange}
          style={{ flex: 1, marginBottom: 8 }}
        />
        <select
          name="country"
          value={address.country}
          onChange={handleAddressChange}
          style={{ flex: 1, marginBottom: 8 }}
        >
          <option value="">Seleziona Nazione</option>
          {countryOptions.map((opt) => (
            <option key={opt.code} value={opt.code}>{opt.label}</option>
          ))}
        </select>
      </div>
      <FieldError name="city" />
      <FieldError name="country" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '12px 0' }}>
        <label style={{ flex: 1 }}>
          <input
            type="checkbox"
            name="currentlyLiveHere"
            checked={address.currentlyLiveHere}
            onChange={handleCheckboxChange}
          />{' '}
          I currently live here
        </label>
        <label style={{ flex: 1 }}>
          <input
            type="checkbox"
            name="isPEP"
            checked={address.isPEP}
            onChange={handleCheckboxChange}
          />{' '}
          Dichiaro di essere una PEP
        </label>
      </div>
      <button type="submit" style={{ width: '100%', marginTop: 12, background: '#6366f1', color: '#fff', padding: '12px 0', borderRadius: 24, border: 0, fontWeight: 600, fontFamily: 'inherit' }}>
        Salva
      </button>
    </div>
  );
};

export default AddressStep;
