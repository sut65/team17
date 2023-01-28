import { UserInterface } from "./IUser";  
import { ResidentInterface } from "./IResident";
import { ObjectInterface } from "./IObject";


export interface RepairInterface {
  ID:           number,
  Repairtime:		Date,
	Detail:				string,

  UserID: number,
  User:   UserInterface,
  
  ResidentID:    number,
  Resident:      ResidentInterface,

  ObjectID: number,
  Object:   ObjectInterface,

  
}