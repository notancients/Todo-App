import { Timestamp } from "firebase/firestore";

enum Sex {
    "Male",
    "Female",
    "Undisclosed"
}

interface UserModel {
    id: string;
    firstName: string;
    lastName: string;
    sex: Sex;
    email: string;
    birthday: Timestamp;
}


export default UserModel;