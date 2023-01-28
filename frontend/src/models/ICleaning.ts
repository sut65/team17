import { UserInterface } from "./IUser";
import { RoomInterface } from "./IRoom";
import { KindInterface } from "./IKind";
import { AreaInterface } from "./IArea";

export interface CleaningInterface {

  ID:               number,
  CleaningTime:     Date | null,
  Detail:           string,

  UserID:           number,
  User:             UserInterface,

  RoomID:           number,
  Room:             RoomInterface,
  
  KindID:           number,
  Kind:             KindInterface,

  AreaID:           number,
  Area:             AreaInterface,
  }