import { useContext } from "react";
import { TagContext } from "../context/TagContext";

const useTag = () => {
  const { tags, loading, error, getTagCategories } = useContext(TagContext);
  return { tags, loading, error, getTagCategories };
};

export default useTag;
