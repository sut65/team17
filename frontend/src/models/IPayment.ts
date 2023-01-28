import {UserInterface} from "./IUser";
import {BillInterface} from "./IBill";
import {BankingInterface} from "./IBanking";
import {MethodInterface} from "./IMethod";

export interface PaymentInterface{
    ID:             number,
    Evidence:          string,
    PaymentTime:    Date,

    UserID:     number,
    User:       UserInterface,

    BillID:         number,
    Bill:           BillInterface,

    BankingID:      number,
    Banking:        BankingInterface,

    MethodID:       number,
    Method:         MethodInterface,

}
