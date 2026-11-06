import Field, { controlClasses } from "./Field";

/** Text <input> (or <textarea> when `multiline`). */
export default function TextField({
  label,
  name,
  value,
  onChange,
  error,
  hint,
  tone = "light",
  multiline = false,
  className,
  ...rest
}) {
  const Control = multiline ? "textarea" : "input";
  return (
    <Field label={label} htmlFor={name} error={error} hint={hint} tone={tone} className={className}>
      <Control
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className={controlClasses(tone, error)}
        {...(multiline ? { rows: 3 } : { type: "text" })}
        {...rest}
      />
    </Field>
  );
}
