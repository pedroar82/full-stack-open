import { EntryFormValues } from "../../types";
import AddHealtCheckEntry from './AddHealtCheckEntry'
import AddOccupationalHealthcareEntry from './AddOccupationalHealthcareEntry'
import AddHospitalEntry from './AddHospitalEntry'

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {
  return (
    <div>
      <AddHealtCheckEntry onSubmit={onSubmit} />
      <AddOccupationalHealthcareEntry onSubmit={onSubmit} />
      <AddHospitalEntry onSubmit={onSubmit} />
    </div>
  )
};

export default AddEntryForm;