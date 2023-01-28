import { ManageInterface } from "./IManage";
import { UserInterface } from "./IUser";
import { LeaseInterface } from "./ILease";

export interface ResidentInterface {
  ID:           number,
  Bail:         string,
  LeaseTime:    Date,

  UserID:       number,
  User:         UserInterface,
  
  LeaseID:      number,
  Lease:        LeaseInterface,

  ManageID:     number,
  Manage:       ManageInterface,

  }