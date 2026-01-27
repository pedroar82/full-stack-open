import { HealthCheckEntry, HealthCheckRating } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

interface HealthCheckEntryProps{
    entry: HealthCheckEntry;
}

const HealthCheckDetail = ({ entry }: HealthCheckEntryProps) => {

  const setHealtRate = (healthCheckRating: HealthCheckRating) => {
    switch (healthCheckRating) {
      case HealthCheckRating.Healthy:
        return 'success';
      case HealthCheckRating.LowRisk:
        return 'info';
      case HealthCheckRating.HighRisk:
        return 'warning';
      default:
        return 'error';
    }
  }

  return (
    <div>
      <p>
        {entry.date} <MedicalServicesIcon />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <p><FavoriteIcon color={setHealtRate(entry.healthCheckRating)}/></p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  )
}

export default HealthCheckDetail