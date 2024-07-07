interface ResponseMessage {
    success: boolean;
    data: any;
    message: string;
}

interface ErrorDetails {
    route: string;
    errorMessage: any;
}

export {
    ResponseMessage,
    ErrorDetails
}