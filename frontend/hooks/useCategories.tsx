import { Category, ICategory, ICategoryPartial, Transaction } from "@/types";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useCategories = () => {
  /* 
	IMPORTANT NOTE: When creating a copy of this hook, you are DUPLICATING the states!! 
	https://stackoverflow.com/questions/57130413/changes-to-state-issued-from-custom-hook-not-causing-re-render-even-though-added
	*/
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[] | undefined>();

  const getCategories = async (user: any) => {
    try {
      /* Generate GET request */
      // https://stackoverflow.com/questions/57629111/how-to-use-a-type-for-the-response-from-axios-get
      const response: AxiosResponse<ICategory[]> = await axios({
        method: "GET",
        withCredentials: true,
        url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/categories",
        headers: {
          authorization: "Bearer " + user?.accessToken,
        },
      });
      const newCategories: ICategory[] = response.data;

      /* Update categories state  */
      setCategories(newCategories);
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw error;
        /* Access token is most likely expired */
      } else {
        /* Any other errors that could occur */
        console.log(error);
      }
    }
  };

  /**
   * This function is an API call to the backend which adds a category
   * @param user the user object
   */
  const addCategory = async (user: any, categoryName: string, budget: number) => {
    try {
      /* Generate GET request */
      const response: AxiosResponse<ICategory[]> = await axios({
        method: "POST",
        withCredentials: true,
        url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/categories/new",
        headers: {
          authorization: "Bearer " + user?.accessToken,
        },
        data: {
          categoryName: categoryName,
          budget: budget,
        },
      });
      const newCategories: ICategory[] = response.data;

      /* Update categories  */
      setCategories(newCategories);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw error;
        /* Access token is most likely expired */
      } else {
        /* Any other errors that could occur */
        console.log(error);
      }
    }
  };

  /**
   *
   * @param user
   * @param _id
   * @returns
   */
  const deleteCategory = async (user: any, _id: string) => {
    try {
      const response: AxiosResponse<ICategory[]> = await axios({
        method: "DELETE",
        withCredentials: true,
        url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/categories",
        headers: {
          authorization: "Bearer " + user?.accessToken,
        },
        data: {
          _id: _id,
        },
      });
      const newCategories: ICategory[] = response.data;
      // console.log(newCategories)

      /* Update categories  */
      setCategories(newCategories);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        return "Oops Something Went Wrong!";
      }
    }
  };

  /**
   * Calculates the missing attributes of categories. Instead of storing these simple operations.
   * @param transactions Array of transactions to perform calculations with.
   */
  const calculateCategories = async (transactions: Transaction[]) => {
    /* If categories is undefined */
    if (!categories || !transactions) {
      console.log(categories);
      console.log(transactions);
      throw new Error(
        "Error performing category calculations! Categories or Transactions undefined!"
      );
    }

    /* 
			Copy categories by value to update state
			NOTE: [...categories] copies by value instead of reference
		*/
    const newCategories: ICategory[] = [...categories];

    /* Resets all values to zero */
    for (const category of newCategories) {
      category.totalSpent = 0;
      category.remainingBudget = 0;
      category.remainingBudgetPerDay = 0;
    }

    /* Calculate values depending on transactions */
    for (const category of newCategories) {
      for (const transaction of transactions) {
        if (transaction.category === category.name) {
          category.totalSpent += transaction.price;
        }
      }
      category.remainingBudget = category.budget - category.totalSpent;
      category.remainingBudget = Math.round(category.remainingBudget * 100) / 100;
      category.totalSpent = Math.round(category.totalSpent * 100) / 100;
      category.remainingBudgetPerDay = Math.round(category.remainingBudgetPerDay * 100) / 100;
    }

    console.log(newCategories);

    setCategories(newCategories);
  };

  //TODO: add recalculateCategory(category: _id) optimization instead of recalculating everything

  return { isLoading, categories, getCategories, calculateCategories, addCategory, deleteCategory };
};
