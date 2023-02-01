import { RoomInterface } from "./IRoom";
import { ReasonInterface } from "./IReason";
import { UserInterface } from "./IUser";


export interface RequestchangeInterface {

  ID:           number,
  Detail:       string,
  

  UserID:       number,
  User:         UserInterface,

  RoomID:       number,
  Room:         RoomInterface,
  
  ReasonID:     number,
  Reason:       ReasonInterface,

  }