import { UserInterface } from "./IUser";
import { AdminInterface } from "./IAdmin";
import { RoomInterface } from "./IRoom";
import { EquipmentInterface } from "./IEquipment";
import { AmountInterface } from "./IAmount";

export interface FurnitureInterface {

  ID:             number,
  FurnitureTime:  Date | null,
  Detail:         string,

  AdminID:        number,
  Admin:          AdminInterface,

  UserID:         number,
  User:           UserInterface,

  RoomID:         number,
  Room:           RoomInterface,
  
  EquipmentID:     number,
  Equipment:       EquipmentInterface,

  AmountID:         number,
  Amount:           AmountInterface,

}