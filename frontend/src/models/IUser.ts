import {StatusInterface} from "./IStatus";
import {GenderInterface} from "./IGender";
import {TitleInterface} from "./ITitle";

export interface UserInterface{
    ID:             number,
    Name:           string,
    Email:          string,
    Tel:            string,
    Password:       string,
    Role:           string,
	Address:        string,
	Personal:       string,
    BirthdayTime:   Date,

    StatusID:       number,
    Status:         StatusInterface,

    GenderID:       number,
    Gender:         GenderInterface,

    TitleID:        number,
    Title:          TitleInterface,

}
