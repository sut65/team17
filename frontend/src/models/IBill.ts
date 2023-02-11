import { AdminInterface } from "./IAdmin";
import { FurnitureInterface } from "./IFurniture";
import { MeterInterface } from "./IMeter";

export interface BillInterface {

    ID: number,
    Cost:           number,
    BillTime:       Date,


    FurnitureID:            number[],                                                

    AdminID:        number,
    Admin:          AdminInterface,

    MeterID:       number,
    Meter:         MeterInterface
   
   }