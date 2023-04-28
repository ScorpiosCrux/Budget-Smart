import { UserContext } from "@/contexts/AuthContext";
import { IHandleSortTransaction, IHandleUploadTransactions, ITransaction, IUser } from "@/types";
import { IUpdateTransaction } from "@/utils/Transactions";
import { updateTransaction, uploadTransactions } from "@/utils/Data";
import { SetStateAction, useContext } from "react";
import { useAuth } from "./useAuth";
import { refreshToken } from "@/utils/Auth";

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

  // const handleDeleteTransactions = async (props: IHandleDeleteTransactions) => {

  // }

  return { handleSortTransaction, handleUploadTransactions };
};
