import RadioGroup from "../ui/RadioGroup";
import SelectField from "../ui/SelectField";
import {
  AMBIENCE_OPTIONS,
  BUDGET_OPTIONS,
  CUISINE_OPTIONS,
  DIETARY_OPTIONS,
  GROUP_SIZE_OPTIONS,
} from "../../data/options";

/**
 * The preference inputs shared by the profile form and the AI demo:
 * three <select> dropdowns + two radio groups.
 * `lead` lets the caller put one extra control (e.g. Location) in the first grid cell.
 */
export default function PreferenceFields({ values, onChange, errors = {}, tone = "light", lead }) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {lead}
        <SelectField label="🍜 Cuisine" name="cuisine" value={values.cuisine} onChange={onChange} options={CUISINE_OPTIONS} tone={tone} />
        <SelectField label="💰 Budget" name="budget" value={values.budget} onChange={onChange} options={BUDGET_OPTIONS} tone={tone} />
        <SelectField
          label="🥗 Dietary preference"
          name="dietary"
          value={values.dietary}
          onChange={onChange}
          options={DIETARY_OPTIONS}
          tone={tone}
          className={lead ? "" : "sm:col-span-2"}
        />
      </div>

      <div className="mt-5">
        <RadioGroup
          legend="👥 Group size"
          name="groupSize"
          options={GROUP_SIZE_OPTIONS}
          value={values.groupSize}
          onChange={onChange}
          error={errors.groupSize}
          tone={tone}
          columns="grid-cols-4"
        />
      </div>

      <div className="mt-5">
        <RadioGroup
          legend="✨ Ambience"
          name="ambience"
          options={AMBIENCE_OPTIONS}
          value={values.ambience}
          onChange={onChange}
          tone={tone}
        />
      </div>
    </>
  );
}
