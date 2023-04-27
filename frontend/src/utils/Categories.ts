/**
 * EXAMPLE CODE
 * This file contains all the API calls to the backend for categories.
 */

import { ICategory, IUser } from "@/types";
import axios, { AxiosResponse } from "axios";
import { AxiosErrorHandler } from "./Error";

/**
 * CREATE
 * This function is an API call to the backend which adds a category
 * @param props An object that uses destructuring to get the following properties:
 *  user - the user state that contains their accessToken and _id
 *  categoryName - the name of the category
 *  budget - the budget of the category
 */
export interface ICreateCategory {
  user: IUser;
  categoryName: string;
  budget: number;
}
export const createCategory = async (props: ICreateCategory) => {
  try {
    const { user, categoryName, budget } = props;

    /* Generate GET request */
    const response: AxiosResponse<ICategory[]> = await axios({
      method: "POST",
      withCredentials: true,
      url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/categories",
      headers: {
        authorization: "Bearer " + user.accessToken,
      },
      data: {
        categoryName: categoryName,
        budget: budget,
      },
    });
    const categories: ICategory[] = response.data;
    return categories;
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

/**
 * READ
 * An API call to the backend to get the user's categories!
 * @param props An object that uses destructuring to get the following properties:
 *  user - the user state that contains their accessToken and _id
 */
export interface IReadCategories {
  user: IUser;
}
export const readCategories = async (props: IReadCategories) => {
  try {
    const { user } = props;
    /* Generate GET request */
    const response: AxiosResponse<ICategory[]> = await axios({
      method: "GET",
      withCredentials: true,
      url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/categories",
      headers: {
        authorization: "Bearer " + user.accessToken,
      },
    });
    const categories: ICategory[] = response.data;

    return categories;
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

/**
 * DELETE
 * An API call to the backend to delete a category!
 * @param props the user state that contains their accessToken and _id
 */
export interface IDeleteCategory {
  user: IUser;
  categoryId: string;
}
export const deleteCategory = async (props: IDeleteCategory) => {
  try {
    const { user, categoryId } = props;
    /* Generate DELETE request */
    const response: AxiosResponse<ICategory[]> = await axios({
      method: "DELETE",
      withCredentials: true,
      url: process.env.NEXT_PUBLIC_API_ENDPOINT + "/categories",
      headers: {
        authorization: "Bearer " + user.accessToken,
      },
      data: {
        categoryId: categoryId,
      },
    });
    const categories: ICategory[] = response.data;
    return categories;
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
