import { AxiosError } from "axios";

/**
 * This function handles the errors that are caught from an axios call.
 * @param error The error object that is caught from an axios call
 */
export const AxiosErrorHandler = (error: AxiosError) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        return "Unauthorized!";
      case 403:
        return "Forbidden!";
      case 404:
        return "Not Found!";
      case 409:
        return "Conflict!";
      case 500:
        return "Internal Server Error!";
      default:
        return "Oops Something Went Wrong!";
    }
  } else if (error.request) {
    console.log("Request");
    console.log(error.request);
    return "AxiosErrorHandler(Request): Oops Something Went Wrong!";
  } else if (error.message) {
    console.log("Message");
    console.log(error.message);
    return "AxiosErrorHandler(Message): Oops Something Went Wrong!";

  }
};
