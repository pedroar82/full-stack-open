import { useState, SyntheticEvent } from "react";

import { Box, TextField ,  Button, Collapse, Grid, InputLabel, Select, SelectChangeEvent, MenuItem} from '@mui/material';

import { EntryFormValues, HealthCheckRating } from "../../types";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

interface HealthCheckRatingOption{
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'Low Risk' },
  { value: HealthCheckRating.HighRisk, label: 'High Risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical Risk' }
];

const AddHealtCheckEntry = ({ onSubmit }: Props) => {

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
  const [showForm, setShowForm] = useState(false);

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
      event.preventDefault();
      if ( typeof event.target.value === "number") {
        const value = event.target.value;
        const health = Object.values(HealthCheckRating).find(g => g === value);
        if (health) {
          setHealthCheckRating(Number(health));
        }
      }
    };

  const addEntry= (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      specialist,  
      description,
      date,
      healthCheckRating,
      diagnosisCodes,
      type: 'HealthCheck'
    } as EntryFormValues); 
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <Box
          component="section"
          sx={{ p: 2, border: '1px dashed grey', mb: 2 }}
        >
          <Button onClick={() => setShowForm(true)}>
            New HealtCheck entry
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

              <InputLabel style={{ marginTop: 20 }}>Healthcheck rating</InputLabel>
              <Select
                label="Healthcheck rating"
                fullWidth
                value={healthCheckRating}
                onChange={onHealthCheckRatingChange}
              >
                {healthCheckRatingOptions.map((option) => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>

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

export default AddHealtCheckEntry;