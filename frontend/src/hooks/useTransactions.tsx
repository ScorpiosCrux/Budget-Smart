import {
  IHandleDeleteTransaction,
  IHandleSortTransaction,
  IHandleUploadTransactions,
  ITransaction,
  IUser,
} from "@/types";
import { deleteTransaction, updateTransaction, uploadTransactions } from "@/utils/Data";
import { SetStateAction } from "react";
import { useAuth } from "./useAuth";

/**
 * This file contains all the functions that are used to manipulate the transactions.
 * The functions are exposed ONLY to the transactions components.
 */

interface IUseTransactions {
  setTransactions: React.Dispatch<SetStateAction<ITransaction[]>>;
  setIsTransactionsLoading: React.Dispatch<SetStateAction<boolean>>;
}

export const useTransactions = (props: IUseTransactions) => {
  const { user, handleTokenRefresh } = useAuth();
  const { setTransactions, setIsTransactionsLoading } = props;

  const handleSortTransaction = async (props: IHandleSortTransaction) => {
    try {
      await updateTransaction({ user, ...props, setTransactions, setIsTransactionsLoading });
    } catch (error) {
      const { retry } = props;
      if (error === "Unauthorized!" && retry !== true) {
        await handleTokenRefresh();
        handleSortTransaction({ ...props, retry: true });
      } else {
        console.log(error);
      }
    }
  };

  const handleUploadTransactions = async (props: IHandleUploadTransactions) => {
    try {
      await uploadTransactions({ user, ...props, setTransactions, setIsTransactionsLoading });
    } catch (error) {
      const { retry } = props;
      if (error === "Unauthorized!" && retry !== true) {
        await handleTokenRefresh();
        handleUploadTransactions({ ...props, retry: true });
      } else {
        console.log(error);
      }
    }
  };

  const handleDeleteTransaction = async (props: IHandleDeleteTransaction) => {
    try {
      await deleteTransaction({ user, ...props, setTransactions, setIsTransactionsLoading });
    } catch (error) {
      const { retry } = props;
      if (error === "Unauthorized!" && retry !== true) {
        await handleTokenRefresh();
        handleDeleteTransaction({ ...props, retry: true });
      } else {
        console.log(error);
      }
    }
  };

  return { handleSortTransaction, handleUploadTransactions, handleDeleteTransaction };
};
