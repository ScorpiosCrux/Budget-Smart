import { Category, ITransaction } from "@/types";
import { useEffect, useState } from "react";

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
