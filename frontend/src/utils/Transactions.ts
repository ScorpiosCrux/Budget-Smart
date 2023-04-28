/**
 * EXAMPLE CODE
 * This file contains all the API calls to the backend for categories.
 */

import { ITransaction, IUser } from "@/types";
import axios, { AxiosResponse } from "axios";
import { AxiosErrorHandler } from "./Error";

export interface ICreateTransaction {
  user: IUser;
}

export interface IUploadTransactions {
  user: IUser;
  file: File;
}
export const uploadTransactions = async (props: IUploadTransactions) => {
  try {
    const { user, file } = props;
    let fileData = new FormData();
    fileData.append("transactions", file);

    /* Generate POST request */
    const response: AxiosResponse<ITransaction[]> = await axios({
      method: "POST",
      withCredentials: true,
      url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/transactions/upload",
      headers: {
        authorization: "Bearer " + user?.accessToken,
      },
      data: fileData,
    });
    const transactions: ITransaction[] = response.data;
    return transactions;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      /* Throws an error message depending on the status code. */
      throw AxiosErrorHandler(error);
    } else {
      /* For any other errors */
      throw error;
    }
  }
};

export interface IReadTransactions {
  user: IUser;
}
export const readTransactions = async (props: IReadTransactions) => {
  try {
    const { user } = props;
    /* Generate GET request */
    const response: AxiosResponse<ITransaction[]> = await axios({
      method: "GET",
      withCredentials: true,
      url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/transactions",
      headers: {
        authorization: "Bearer " + user.accessToken,
      },
    });
    const transactions: ITransaction[] = response.data;
    return transactions;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      /* Throws an error message depending on the status code. */
      throw AxiosErrorHandler(error);
    } else {
      /* For any other errors */
      throw error;
    }
  }
};

export interface IUpdateTransaction {
  user: IUser;
  transaction: ITransaction;
}
export const updateTransaction = async (props: IUpdateTransaction) => {
  try {
    const { user, transaction } = props;
    /* Generate PUT request */
    const response: AxiosResponse<ITransaction[]> = await axios({
      method: "PUT",
      withCredentials: true,
      url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/transactions",
      headers: {
        authorization: "Bearer " + user.accessToken,
      },
      data: transaction,
    });

    const transactions: ITransaction[] = response.data;
    return transactions;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      /* Throws an error message depending on the status code. */
      throw AxiosErrorHandler(error);
    } else {
      /* For any other errors */
      throw error;
    }
  }
};

export interface IDeleteTransaction {
  user: IUser;
  transactionId: string;
}
export const deleteTransaction = async (props: IDeleteTransaction) => {
  try {
    const { user, transactionId } = props;
    const response: AxiosResponse<ITransaction[]> = await axios({
      method: "DELETE",
      withCredentials: true,
      url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/transactions",
      headers: {
        authorization: "Bearer " + user.accessToken,
      },
      data: {
        transactionId: transactionId,
      },
    });
    const transactions: ITransaction[] = response.data;
    return transactions;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      /* Throws an error message depending on the status code. */
      throw AxiosErrorHandler(error);
    } else {
      /* For any other errors */
      throw error;
    }
  }
};
