import { DB, FIRESTORE } from '../firebase/firestore';
import { 
  collection, doc, addDoc, getDoc, getDocs, 
  limit, query, setDoc, DocumentReference, DocumentData, 
  DocumentSnapshot,
  documentId,
  deleteDoc,
  where,
  QueryFieldFilterConstraint,
  Timestamp,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { Request, Response } from 'express';
import { TodoModel, toTodoModel } from '../models/todo_model';
import { ErrorDetails, ResponseMessage } from '../models/response_model';


async function addTodo(req: Request, res: Response) {
  console.log("Adding a new todo.");
  
  try {
    let todoData: TodoModel = req.body;
    todoData.is_completed = Boolean(req.body.is_completed);
    todoData.deadline = Timestamp.fromDate(new Date(todoData.deadline as unknown as number))
    todoData.created_at = Timestamp.fromDate(new Date());
    todoData.updated_at = Timestamp.fromDate(new Date());
    // console.log(req);
    // console.log(req.body);
    const addedDocument = await addDoc(DB.todo, todoData);
    const documentId = addedDocument.id;
    // console.log(documentId);

    let documentReference = doc(FIRESTORE, "todo", documentId);
    // console.log(documentReference);
    let fetchedDocument = await getDoc(documentReference);
    // console.log(`DocumentId: ${documentId} | typeof(documentId): ${typeof(documentId)}`)
    console.log(fetchedDocument.data());

    let successResponse: ResponseMessage = {
      success: true,
      data: documentId ,
      message: "A todo has been successfully added."
    }

    return(res.status(200).json(successResponse));

  } catch (error) {
    console.log({
      "route": "/todo/add-todo",
      "errorMessage": error
    })

    let errorResponse: ResponseMessage = {
      success: false,
      data: error,
      message: "There was an error with adding a todo."
    }

    return(res.status(500).json(errorResponse));
  }
}


async function getTodoByUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    console.log("Fetching todo data.");
    
    try {
      const userId = req.params.userId;
      const pageSize = 10;

      let { tags, deadlineBefore, deadlineAfter, color } = req.query;
      // filters
      let queries: QueryFieldFilterConstraint[] = [];
      if (tags) {
        let parsedTags = Array.isArray(tags) ? tags : [tags];
        queries.push(where("tags", "array-contains-any", parsedTags));
      }
      if (deadlineBefore) {
        let date = new Date(deadlineBefore as string);
        let timestamp = Timestamp.fromDate(date);
        queries.push( where("deadline", "<=", timestamp) );
      }
      if (deadlineAfter) {
        let date = new Date(deadlineAfter as string);
        let timestamp = Timestamp.fromDate(date);
        queries.push( where("deadline", ">=", timestamp) );
      }
      if (color) queries.push( where("color", "==", color) );
      // end of filters

      // console.log(queries);

      const getTodoQuery = query(DB.todo, ...queries);
      const documentSnapshot = await getDocs(getTodoQuery);
      const todoData = documentSnapshot.docs.map(doc => {
        let todoData = doc.data();
        todoData.id = doc.id;
        return todoData;
      });

      let successResponse: ResponseMessage = {
        success: true,
        data: todoData,
        message: "Successfully fetched all todo."
      };

      return(res.status(200).json(successResponse));
    } catch (error) {

      console.log({
        "route": "/todo/get-todo",
        "errorMessage": error
      })
  
      let errorResponse: ResponseMessage = {
        success: false,
        data: error,
        message: "There was an error with fetching todos."
      }
      
    return(res.status(500).json(errorResponse));

    }
}


async function getTodoDetails(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  console.log("Fetching details for a todo.");

  try {
    let todoId: string = req.params.todoId.trim();

    let documentReference = doc(FIRESTORE, "todo", todoId);
    let todoDetails: TodoModel | null = null;
    let fetchedDocument = await getDoc(documentReference)
    .then( snapshot => {
        if (snapshot.exists()) {
          todoDetails = snapshot.data() as unknown as TodoModel;
        };
      }
    );

    let successResponse: ResponseMessage = {
      success: true,
      data: todoDetails,
      message: "Successfully retrieved todo details."
    }

    return(res.status(200).json(successResponse));
    
  } catch (error) {
    let errorDetails: ErrorDetails = {
      route: "/todo-details",
      errorMessage: error
    };

    console.log(errorDetails);

    let errorResponse: ResponseMessage = {
      success: false,
      data: null,
      message: "There was an error with fetching the details for a todo."
    }
    return(res.status(500).json(errorResponse))
  }
}


async function editTodo(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  console.log("Editing todo data.");
  
  try {

    const documentId = req.params.todoId;
    const details: TodoModel = req.body as TodoModel;
    details.updated_at = Timestamp.fromDate(new Date());
    details["is_completed"] = Boolean(req.body.is_completed) as boolean;
    console.log(typeof(details.is_completed));
    // console.log(typeof(req.body.is_completed as boolean));

    const documentReference = doc(DB.todo, documentId);
    let editedDocument: void | DocumentData  = await setDoc(documentReference, details);
    editedDocument = (await getDoc(documentReference)).data();

    console.log(editedDocument);

    let successResponse: ResponseMessage = {
      success: true,
      data: editedDocument,
      message: "Successfully updated todo."
    };

    return(res.status(200).json(successResponse));
  } catch (error) {

    console.log({
      "route": "/todo/edit-todo",
      "errorMessage": error
    })

    let errorResponse: ResponseMessage = {
      success: false,
      data: error,
      message: "There was an error with editing a todo."
    }
    
  return(res.status(500).json(errorResponse));

  }
}


async function deleteTodo(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  console.log("Deleting a todo.");
  
  try {

    const todoId: string = req.params.todoId.trim();
    console.log(todoId);
    let documentReference = doc(FIRESTORE, "todo", todoId);
    const existingDocument: boolean = await getDoc(documentReference).then(snapshot => snapshot.exists());
    if(existingDocument) {
      await deleteDoc(documentReference);
    }

    let successResponse: ResponseMessage = {
      success: true,
      data: null,
      message: "Successfully deleted todo."
    };

    return(res.status(200).json(successResponse));
  } catch (error) {

    let errorDetails: ErrorDetails = {
      "route": "/todo/delete-todo",
      "errorMessage": error
    };

    console.log(errorDetails);

    let errorResponse: ResponseMessage = {
      success: false,
      data: error,
      message: "There was an error with deleting a todo."
    }
    
  return(res.status(500).json(errorResponse));

  }
}


async function markAsDone(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  console.log("Marking todo as done.");

  try {
    
    let todoId = req.params.todoId;
    let is_completed = req.params.isCompleted === "true";
    console.log(typeof(is_completed));

    console.log(`TodoId: ${todoId} | isCompleted: ${is_completed}`);
    let documentReference = doc(DB.todo, todoId);

    let updatedDocument = await updateDoc(documentReference, {"is_completed": is_completed});
    console.log(updatedDocument);

    let successResponse: ResponseMessage = {
      success: true,
      data: null,
      message: "Successfully marked todo as done."
    }

    return(res.status(200).json(successResponse));
    
  } catch (error) {
    let errorDetails: ErrorDetails = {
      route: "/todo/mark-done",
      errorMessage: error
    };

    console.log(errorDetails);

    let errorResponse: ResponseMessage = {
      success: false,
      data: null,
      message: "Failed to mark todo as done."
    }
    return(res.status(500).json(errorResponse))
  }
}


export {
    addTodo,
    getTodoByUser,
    editTodo,
    deleteTodo,
    getTodoDetails,
    markAsDone
}