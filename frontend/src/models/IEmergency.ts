import { UserInterface } from "./IUser";  
import { ResidentInterface } from "./IResident";
import { EmergencytypeInterface } from "./IEmergencytype";


export interface EmergencyInterface {
  ID:           number,
  Emergencytime:		Date,
  Detail:				string,

  UserID: number,
  User:   UserInterface,
  
  ResidentID:    number,
  Resident:      ResidentInterface,

  EmergencytypeID: number,
  Emergencytype:   EmergencytypeInterface,

  
}