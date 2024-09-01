import { useContext } from "react";
import { InterestContext } from "../context/InterestContext";

const useInterest = () => {
  const { userInterests, toggleInterest, getUserInterests, loading, error } =
    useContext(InterestContext);
  return { userInterests, toggleInterest, getUserInterests, loading, error };
};

export default useInterest;
