import { RoomInterface } from "./IRoom";
import { ReasonInterface } from "./IReason";
import { UserInterface } from "./IUser";


export interface RequestoutInterface {

  ID:           number,
  Detail:       string,
  Outtime:      Date | null,

  UserID:       number,
  User:         UserInterface,

  RoomID:       number,
  Room:         RoomInterface,
  
  ReasonID:     number,
  Reason:       ReasonInterface,

  }