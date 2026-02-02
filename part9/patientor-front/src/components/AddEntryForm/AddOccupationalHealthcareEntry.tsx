


import { useState, SyntheticEvent } from "react";

import { Box, TextField ,  Button, Collapse, Grid} from '@mui/material';

import { EntryFormValues, SickLeave } from "../../types";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

const AddOccupationalHealthcareEntry = ({ onSubmit }: Props) => {

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: '',
    endDate: '',
  });
  const [employerName, setEmployerName] = useState('');

  const [showForm, setShowForm] = useState(false);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault()

    onSubmit({
      specialist,
      description,
      date,
      employerName,
      sickLeave,
      diagnosisCodes,
      type: 'OccupationalHealthcare',
    } as EntryFormValues)
  }
  
    return (
      <div>
        <form onSubmit={addEntry}>
          <Box
            component="section"
            sx={{ p: 2, border: '1px dashed grey', mb: 2 }}
          >
            <Button onClick={() => setShowForm(true)}>
              New Occupational Healthcare Entry
            </Button>
            {showForm && (
              <Collapse in={showForm} timeout="auto" unmountOnExit>
                <TextField
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={({ target }) => setDescription(target.value)}
                  margin="normal"
                  variant="standard"
                  placeholder="Description"
                />

                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  value={date}
                  onChange={({ target }) => setDate(target.value)}
                  margin="normal"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  fullWidth
                  label="Specialist"
                  value={specialist}
                  onChange={({ target }) => setSpecialist(target.value)}
                  margin="normal"
                  variant="standard"
                  placeholder="Dr. Smith"
                />

                <TextField
                  fullWidth
                  label="Employer Name"
                  value={employerName}
                  onChange={({ target }) => setEmployerName(target.value)}
                  margin="normal"
                  variant="standard"
                  placeholder="Tech Inc."
                />

                <TextField
                  fullWidth
                  label="SickLeave start date"
                  type="date"
                  value={sickLeave.startDate}
                  onChange={({ target }) =>
                    setSickLeave({ ...sickLeave, startDate: target.value })
                  }
                  margin="normal"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  label="SickLeave end date"
                  type="date"
                  value={sickLeave.endDate}
                  onChange={({ target }) =>
                    setSickLeave({ ...sickLeave, endDate: target.value })
                  }
                  margin="normal"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  fullWidth
                  label="Diagnosis codes"
                  value={diagnosisCodes.join(', ')}
                  onChange={({ target }) =>
                    setDiagnosisCodes(
                      target.value.split(',').map((s) => s.trim()),
                    )
                  }
                  margin="normal"
                  variant="standard"
                  placeholder="Z57.1, N02.0"
                />
                <Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      sx={{ background: 'red' }}
                      style={{ float: 'left' }}
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      style={{ float: 'right' }}
                      sx={{ background: 'grey', ml: 'auto' }}
                      type="submit"
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Collapse>
            )}
          </Box>
        </form>
      </div>
    )
};

export default AddOccupationalHealthcareEntry;