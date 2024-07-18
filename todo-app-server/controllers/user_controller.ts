
import UserModel from "../models/user_model";
import { DB, FIRESTORE } from '../firebase/firestore';
import { collection, doc, addDoc, getDoc, getDocs, limit, query, setDoc, where, DocumentReference, DocumentData, Timestamp } from 'firebase/firestore';
import { Request, Response } from 'express';
import { ErrorDetails, ResponseMessage } from '../models/response_model';


async function addUser(req: Request, res: Response) {
  console.log("Adding a new user.");
  
  try {
    let userId = req.params.userId;
    console.log(req.body.birthday);
    console.log(userId);
    let userDetails = req.body;
    userDetails.birthday = Timestamp.fromDate(new Date(userDetails.birthday));
    let documentReference = doc(FIRESTORE, "user", userId);
    let newUser = await setDoc(documentReference, userDetails);

    let successResponse: ResponseMessage = {
      success: true,
      data: null,
      message: "A user has been successfully added."
    }

    return(res.status(200).json(successResponse));

  } catch (error) {
    console.log({
      "route": "/user/add-user",
      "errorMessage": error
    })

    let errorResponse: ResponseMessage = {
      success: false,
      data: error,
      message: "There was an error with adding a user."
    }

    return(res.status(500).json(errorResponse));
  }
}


async function getUserDetails(req: Request, res: Response) {
  console.log("Getting user's details.");
  
  try {
    const userid = req.params.userId;

    const getUserQuery = query(DB.user, where("id", "==", userid));
    const documentSnapshot = await getDocs(getUserQuery);
    const userData = documentSnapshot.docs.map(doc => {
      let fetchedData = doc.data();
      fetchedData.id = doc.id;
      return fetchedData;
    })

    let successResponse: ResponseMessage = {
      success: true,
      data: userData,
      message: "A user's details have been successfully retrieved."
    }

    return(res.status(200).json(successResponse));

  } catch (error) {

    let errorDetails: ErrorDetails = {
      "route": "/user/get-user",
      "errorMessage": error
    }
    console.log(errorDetails)

    let errorResponse: ResponseMessage = {
      success: false,
      data: error,
      message: "There was an error with getting a user's details."
    }

    return(res.status(500).json(errorResponse));
  }
}



async function editUser(req: Request, res: Response) {
  console.log("Editing user's details.");
  
  try {

    const documentId = req.params.userId as unknown as DocumentReference<UserModel, DocumentData>;
    const details: UserModel = { ...req.body };

    const editedDocument = await setDoc(documentId, details);

    let successResponse: ResponseMessage = {
      success: true,
      data: null,
      message: "A user's details have been successfully updated."
    }

    return(res.status(200).json(successResponse));

  } catch (error) {

    let errorDetails: ErrorDetails = {
      "route": "/user/edit-user",
      "errorMessage": error
    }
    console.log(errorDetails)

    let errorResponse: ResponseMessage = {
      success: false,
      data: error,
      message: "There was an error with adding a user."
    }

    return(res.status(500).json(errorResponse));
  }
}


async function deleteUser(req: Request, res: Response) {
  console.log("Deleting a user.");
  
  try {

    let successResponse: ResponseMessage = {
      success: true,
      data: null,
      message: "A user has been successfully deleted."
    }

    return(res.status(200).json(successResponse));

  } catch (error) {
    console.log({
      "route": "/user/delete-user",
      "errorMessage": error
    })

    let errorResponse: ResponseMessage = {
      success: false,
      data: error,
      message: "There was an error with deleting a user."
    }

    return(res.status(500).json(errorResponse));
  }
}


export {
  addUser,
  getUserDetails,
  editUser,
  deleteUser
}