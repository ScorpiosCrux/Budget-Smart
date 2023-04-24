import { Category, ICategory, Transaction } from "@/types";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";

/**
 * This is a custom react hook with logic related to categories.
 * IMPORTANT: When calling useCategories(), you are DUPLICATING states!
 * @returns exposed functions and states.
 */
export const useCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>();

  /**
   * An API call to the backend to get the user's categories!
   * @param user the user state that contains their accessToken and _id
   */
  const getCategories = async (user: any) => {
    try {
      /* Generate GET request */
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
   * @param user the user state that contains their accessToken and _id
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
   * Deletes a category by calling the backend API.
   * @param user the user state that contains their accessToken and _id
   * @param _id the categoryId we want to delete
   * @returns Possible feedback to the user.
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

    setCategories(newCategories);
  };

  //TODO: add recalculateCategory(category: _id) optimization instead of recalculating everything

  return { isLoading, categories, getCategories, calculateCategories, addCategory, deleteCategory };
};
