import { Timestamp } from "firebase/firestore";

interface TodoModel {
    id?: string;
    title: string;
    description: string | null;
    created_by: string;
    is_completed: boolean;
    tags: string[] | null;
    color: string;
    deadline: Timestamp | null;
    subtask: string[] | null;
    created_at: Timestamp;
    updated_at: Timestamp;
}

function toTodoModel(todo: TodoModel) {
    todo.is_completed = todo.is_completed as boolean;
    console.log(todo.is_completed);
    return(todo);
}

export {
    TodoModel,
    toTodoModel
}