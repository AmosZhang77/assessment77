import styles from './VariantSelector.module.scss';

interface VariantSelectorProps {
  label: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export default function VariantSelector({
  label,
  options,
  selected,
  onChange,
}: VariantSelectorProps) {
  return (
    <div className={styles.variantSelector}>
      <span className={styles.variantSelectorLabel}>{label}:</span>
      <div className={styles.variantSelectorOptions}>
        {options.map((option) => (
          <button
            key={option}
            className={`${styles.variantSelectorOption} ${
              selected === option ? styles.variantSelectorOptionActive : ''
            }`}
            onClick={() => onChange(option)}
            aria-pressed={selected === option}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
