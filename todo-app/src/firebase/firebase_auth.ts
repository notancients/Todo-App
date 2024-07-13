import { FIREBASE } from "./firebase";
import { getAuth, createUserWithEmailAndPassword, Auth } from "firebase/auth";

const auth = getAuth(FIREBASE);

async function createUserEmailPassword(email: string, password:string) {
  
  try {
    let newAccount = await createUserWithEmailAndPassword(auth, email, password);
    console.log(newAccount.user);
  } catch (error) {
    console.log("There was an error with creating a user.");
  }
}

export {
  createUserEmailPassword
}