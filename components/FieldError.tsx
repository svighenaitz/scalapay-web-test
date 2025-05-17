import { useFormStore } from '../store/formSlice';
import styles from './FieldError.module.css';

interface FieldErrorProps {
  name: string;
}

export default function FieldError({ name }: FieldErrorProps) {
  const { errors } = useFormStore();
  if (!errors[name]) return null;
  return <div className={styles.fieldError}>{errors[name]}</div>;
}
