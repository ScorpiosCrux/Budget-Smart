import { ICategory, ICategoryForm, IHandleCreateCategory, IHandleDeleteCategory } from "@/types";
import { SetStateAction } from "react";
import { useAuth } from "./useAuth";
import { createCategory, deleteCategory } from "@/utils/Data";
import { FormikHelpers } from "formik";

interface IUseCategories {
	setCategories: React.Dispatch<SetStateAction<ICategory[]>>;
	setIsCategoriesLoading: React.Dispatch<SetStateAction<boolean>>;
}

export const useCategories = (props: IUseCategories) => {
	const { setCategories, setIsCategoriesLoading } = props;
	const { user, handleTokenRefresh } = useAuth();

	const handleDeleteCategory = async (props: IHandleDeleteCategory) => {
		try {
			await deleteCategory({ user, ...props, setCategories, setIsCategoriesLoading });
		} catch (error) {
			const { retry } = props;
			if (error === "Unauthorized!" && retry !== true) {
				await handleTokenRefresh();
				handleDeleteCategory({ ...props, retry: true });
			} else {
				console.log(error);
			}
		}
	};

	const handleCreateCategory = async (props: IHandleCreateCategory) => {
		try {
			await createCategory({ user, ...props, setCategories, setIsCategoriesLoading });
		} catch (error) {
			const { retry } = props;
			if (error === "Unauthorized!" && retry !== true) {
				await handleTokenRefresh();
				handleCreateCategory({ ...props, retry: true });
			} else {
				console.log(error);
			}
		}
	};

	return { handleDeleteCategory, handleCreateCategory };
};
