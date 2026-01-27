import { Entry } from "../../types";
import HospitalEntryDetail from "./HospitalEntryDetail"
import OccupationalHealthcareEntryDetail from "./OccupationalHealthcareEntryDetail"
import HealthCheckDetail from "./HealthCheckDetail"

interface EntryDetailsProps {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({entry}: EntryDetailsProps)=>{
    switch (entry.type){
        case "Hospital":
          return <HospitalEntryDetail entry={entry}/>;
        case "OccupationalHealthcare":
          return <OccupationalHealthcareEntryDetail entry={entry}/>
        case "HealthCheck":  
          return <HealthCheckDetail entry={entry}/>
        default:
          return assertNever(entry);  
    }
}

export default EntryDetails