import { Category, Transaction } from "@/types";
import { useEffect, useState } from "react";

enum TargetType {
	Category = 0,
	Transaction = 1,
}

export const useModal = () => {
	const [showModal, setShowModal] = useState(false);
	// const [target, setTarget] = useState<TargetType>(0);

	// useEffect(() => {
	// 	const handleClick = () => {
	// 		setIsModalOpen(false);
	// 		console.log("Set State to False");
	// 	};
	// }, []);

	return {
		showModal,
		setShowModal,
		// target,
		// setTarget,
	};
};
