import { RoomInterface } from "./IRoom";
import { CategoryInterface } from "./ICategory";
import { SizeInterface } from "./ISize";

export interface ManageInterface {
  ID:           number,
  Detail:       string,
  Stetus:       string,
  Price:        string,

  RoomID:       number,
  Room:         RoomInterface,
  
  CategoryID:   number,
  Category:     CategoryInterface,

  SizeID:       number,
  Size:         SizeInterface,
  }