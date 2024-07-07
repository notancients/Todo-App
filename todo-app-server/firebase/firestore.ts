import { FIREBASE } from "./firebase";
import { collection, CollectionReference, DocumentData, getFirestore } from 'firebase/firestore';

const FIRESTORE = getFirestore(FIREBASE);
const DB: { [key: string]: CollectionReference<DocumentData, DocumentData> } = {
    "user": collection(FIRESTORE, "user"),
    "todo": collection(FIRESTORE, "todo"),
}
export {
    FIRESTORE,
    DB
}