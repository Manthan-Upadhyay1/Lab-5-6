import Field, { controlClasses } from "./Field";

/** Dropdown driven by an `options` array of { value, label }. */
export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  tone = "light",
  className,
}) {
  return (
    <Field label={label} htmlFor={name} error={error} tone={tone} className={className}>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={controlClasses(tone, error)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}
