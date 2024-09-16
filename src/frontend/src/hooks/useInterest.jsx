import { useContext } from "react";
import { InterestContext } from "../context/InterestContext";

const useInterest = () => {
  const { getInterest, toggleInterest, loading, error } =
    useContext(InterestContext);
  return { getInterest, toggleInterest, loading, error };
};

export default useInterest;
