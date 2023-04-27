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
    /* The request was made but no response was received
    `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    http.ClientRequest in node.js */
    return "No response was received!";
  } else {
    /* Something happened in setting up the request that triggered an Error */
    console.log("Error", error.message);
  }
};
