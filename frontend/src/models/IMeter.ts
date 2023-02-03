import { AdminInterface } from "./IAdmin";
import { UserInterface } from "./IUser";
import { ManageInterface } from "./IManage";

export interface MeterInterface {

    ID: number,
    Before:     number,
	After:      number,
	Total:      number,
	Unit:       number,
	Electric:   number,
	Water:      number,
	Metertime:  Date,


    UserID:             number,
    User:               UserInterface,                                                    

    AdminID:        number,
    Admin:          AdminInterface,

    ManageID:       number,
    Manage:         ManageInterface
   
   }