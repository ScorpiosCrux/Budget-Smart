import { useContext, useEffect, useState } from "react";
import { refreshToken } from "@/utils/Auth";
import { UserContext } from "@/contexts/AuthContext";
import { ICategory, ITransaction } from "@/types";
import { calculateCategories, getCategories, getTransactions } from "@/utils/Data";

export const useData = () => {
  const { user, setUser } = useContext(UserContext);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(true); //The isFetching flag is used to trigger functions and component rendering
  const [isLoading, setIsLoading] = useState(true); //The isLoading flag is used to trigger functions and component rendering
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  /**
   * Fetches the categories and transactions from the backend.
   */
  useEffect(() => {
    const _fetchData = async (retry?: boolean) => {
      if (user?._id) {
        try {
          await getCategories({ user, setCategories, setIsCategoriesLoading });
          await getTransactions({ user, setTransactions, setIsTransactionsLoading });
        } catch (error) {
          if (error === "Unauthorized!") {
            // TODO: this is a temporary fix we should update user
            let accessToken = await refreshToken();
            setUser({ ...user, accessToken });
            if (!retry) _fetchData(true);
            else {
              // log user out
            }
          } else {
            console.log(error);
          }
        }
      }
    };
    _fetchData();
  }, [user]);

  /**
   * Calculates the variables for the remaining values of Categories
   */
  useEffect(() => {
    if (isCategoriesLoading === false && isTransactionsLoading === false) {
      console.log("Use Effect", categories, transactions);
      const newCategories = calculateCategories({ categories, transactions });
      setCategories(newCategories);
      setIsLoading(false);
    }
  }, [isCategoriesLoading, isTransactionsLoading]);


  /**
   * Deletes the category using backend API call.
   * @param _id Category Id
   * @param _retry Should only be used internally
   */
  // const deleteCategory = async (_id: string, _retry?: boolean) => {
    // try {
    //   setIsLoading(true);
    //   await categoryHook.deleteCategory(user, _id);
    //   setIsLoading(false);
    // } catch (error) {
    //   if (isAxiosError(error)) {
    //     await refreshToken();
    //     /* If retry value is not present, then try again else 1 retry is enough */
    //     if (!_retry) await deleteCategory(_id, true);
    //   } else {
    //     console.log("error useData");
    //   }
    // }
  // };

  /**
   * Adds a category using backend API call.
   * @param categoryName The name of the category
   * @param budget The budget amount
   * @param _retry An internal flag for retrying if the auth token is expired.
   */
  const addCategory = async (categoryName: string, budget: number, _retry?: boolean) => {
    // try {
    //   setIsLoading(true);
    //   await categoryHook.addCategory(user, categoryName, budget);
    //   setIsLoading(false);
    // } catch (error) {
    //   if (isAxiosError(error)) {
    //     await refreshToken();
    //     /* If retry value is not present, then try again else 1 retry is enough */
    //     if (!_retry) await addCategory(categoryName, budget, true);
    //   } else {
    //     console.log("error useData");
    //   }
    // }
  };

  return {
    isLoading,
    categories,
    setCategories,
    setIsCategoriesLoading,
    transactions,
    setTransactions,
    setIsTransactionsLoading,
    addCategory,
  };
};
