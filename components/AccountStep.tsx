import React, { ChangeEvent, useMemo } from 'react';
import { useFormStore } from '../store/formSlice';
import DatePicker from 'react-datepicker';
import { it } from 'date-fns/locale';
import { subYears, isBefore, format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './AccountStep.module.css';

const MINIMUM_AGE = 18;

const AccountStep: React.FC = () => {
  const { account, errors, updateAccount, setError } = useFormStore();
  
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

  const handleAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateAccount({ [e.target.name]: e.target.value });
    if (errors[e.target.name]) setError(e.target.name, '');
  };

  return (
    <div>
      <h3>Crea account</h3>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={account.email}
          onChange={handleAccountChange}
          style={{ width: '100%', marginBottom: 8 }}
        />
        {errors.email && <div style={{ color: 'red', fontSize: 12 }}>{errors.email}</div>}
      </div>
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="Nome"
          value={account.firstName}
          onChange={handleAccountChange}
          style={{ width: '100%', marginBottom: 8 }}
        />
        {errors.firstName && <div style={{ color: 'red', fontSize: 12 }}>{errors.firstName}</div>}
      </div>
      <div>
        <input
          type="text"
          name="lastName"
          placeholder="Cognome"
          value={account.lastName}
          onChange={handleAccountChange}
          style={{ width: '100%', marginBottom: 8 }}
        />
        {errors.lastName && <div style={{ color: 'red', fontSize: 12 }}>{errors.lastName}</div>}
      </div>
      <div>
        <div className={styles['date-picker-container']}>
          <DatePicker
            selected={account.birthDate ? new Date(account.birthDate) : null}
            onChange={(date: Date | null) => {
              // Clear any existing errors
              if (errors.birthDate) setError('birthDate', '');
              
              // Update the form state with the new date or empty string
              updateAccount({ 
                birthDate: date ? date.toISOString().split('T')[0] : '' 
              });
            }}
            onBlur={() => {
              // Trigger validation when the field loses focus
              if (!account.birthDate) {
                setError('birthDate', 'Data di nascita richiesta');
              } else if (!isOver18) {
                setError('birthDate', `Devi avere almeno ${MINIMUM_AGE} anni`);
              }
            }}
            dateFormat="dd/MM/yyyy"
            placeholderText="Seleziona data di nascita"
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
        {errors.birthDate && <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.birthDate}</div>}
      </div>
      <div>
        <input
          type="text"
          name="taxCode"
          placeholder="Codice Fiscale"
          value={account.taxCode}
          onChange={handleAccountChange}
          style={{ width: '100%', marginBottom: 8 }}
        />
        {errors.taxCode && <div style={{ color: 'red', fontSize: 12 }}>{errors.taxCode}</div>}
      </div>
      <button type="submit" style={{ width: '100%', marginTop: 12, background: '#6366f1', color: '#fff', padding: '12px 0', borderRadius: 24, border: 0, fontWeight: 600 }}>
        Continua
      </button>
    </div>
  );
};

export default AccountStep;
