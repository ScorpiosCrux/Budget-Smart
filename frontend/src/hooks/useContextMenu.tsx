import { ICategory, ITransaction } from "@/types";
import { MouseEventHandler, useEffect, useState } from "react";

export const useContextMenu = () => {
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  const [target, setTarget] = useState<ITransaction | ICategory>();

  useEffect(() => {
    const handleClick = () => setClicked(false);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return {
    clicked,
    setClicked,
    points,
    setPoints,
    target,
    setTarget,
  };
};
