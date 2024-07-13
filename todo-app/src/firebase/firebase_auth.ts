import { FIREBASE } from "./firebase";
import { getAuth, createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(FIREBASE);

async function createUserEmailPassword(email: string, password:string) {
  
  try {
    console.log("Creating a new user.");
    let newAccount = await createUserWithEmailAndPassword(auth, email, password);
    console.log(newAccount.user);
  } catch (error) {
    let failureResponse = {
      success: false,
      data: error,
      message: "There was an error with creating a user." 
    };
    console.log(failureResponse);
  }
}

async function signInEmailPassword(email: string, password: string) {

  try {
    let account = await signInWithEmailAndPassword(auth, email, password);
    console.log(account.user);
  } catch (error) {
    console.log("There was an error with signing in.");
  }
}

export {
  createUserEmailPassword,
  signInEmailPassword
}