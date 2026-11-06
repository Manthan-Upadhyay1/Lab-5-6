import { useState } from "react";
import { EMPTY_PROFILE } from "../../data/options";
import Button from "../ui/Button";
import TextField from "../ui/TextField";
import LocationField from "./LocationField";
import PreferenceFields from "./PreferenceFields";

/** Validation rules for the form. Returns { fieldName: "message" }. */
function validate(values) {
  const errors = {};
  if (values.profileName.trim().length < 3) {
    errors.profileName = "Give the profile a name (at least 3 characters).";
  }
  if (!values.destination.trim()) {
    errors.destination = "Tell us where you'll be dining.";
  }
  if (!values.groupSize) {
    errors.groupSize = "Pick a group size.";
  }
  return errors;
}

/**
 * Create + Update form (the same component handles both).
 * Controlled inputs – every field lives in the `values` state object.
 */
export default function ProfileForm({ initialValues, isEditing, onSubmit, onCancel }) {
  const [values, setValues] = useState({ ...EMPTY_PROFILE, ...initialValues });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [saving, setSaving] = useState(false);

  // One handler for text, textarea, select and radio inputs (matched by `name`)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setSaving(true);
    setSubmitError("");
    try {
      await onSubmit({
        ...values,
        profileName: values.profileName.trim(),
        destination: values.destination.trim(),
        notes: values.notes.trim(),
      });
      if (!isEditing) setValues({ ...EMPTY_PROFILE }); // clear the form after Create
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setValues({ ...EMPTY_PROFILE });
    setErrors({});
    setSubmitError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="profile-form-title"
      className="rounded-[2rem] border border-brand-100 bg-white p-6 shadow-[0_25px_70px_rgba(21,15,56,0.10)] sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-600">
            {isEditing ? `Editing profile #${initialValues.id}` : "New profile"}
          </p>
          <h3 id="profile-form-title" className="mt-1 text-xl font-extrabold text-ink">
            {isEditing ? "Update your preferences" : "Create a dining profile"}
          </h3>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-lg text-white">
          {isEditing ? "✎" : "+"}
        </span>
      </div>

      <div className="mt-6 space-y-5">
        <TextField
          label="Profile name"
          name="profileName"
          value={values.profileName}
          onChange={handleChange}
          error={errors.profileName}
          placeholder="e.g. Weekend family brunch"
          autoComplete="off"
        />
        <TextField
          label="Destination"
          name="destination"
          value={values.destination}
          onChange={handleChange}
          error={errors.destination}
          placeholder="e.g. Bengaluru, India"
          autoComplete="off"
        />

        <LocationField
          latitude={values.latitude}
          longitude={values.longitude}
          onChange={(coords) => setValues((prev) => ({ ...prev, ...coords }))}
        />

        <div>
          <PreferenceFields values={values} onChange={handleChange} errors={errors} />
        </div>

        <TextField
          label="Notes (optional)"
          name="notes"
          value={values.notes}
          onChange={handleChange}
          multiline
          placeholder="Allergies, seating, must-haves…"
        />
      </div>

      {submitError && (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {submitError}
        </p>
      )}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
        {isEditing ? (
          <Button variant="outline" onClick={onCancel} className="sm:flex-1">
            Cancel
          </Button>
        ) : (
          <Button variant="outline" onClick={reset} className="sm:flex-1">
            Reset
          </Button>
        )}
        <Button type="submit" variant="gradient" loading={saving} className="sm:flex-[2]" arrow>
          {isEditing ? "Save changes" : "Save profile"}
        </Button>
      </div>
    </form>
  );
}
