import { useContext } from "react";
import { TagContext } from "../context/TagContext";

const useTag = () => {
  const { tags, getTags, getTagCategories, loading, error } =
    useContext(TagContext);
  return { tags, getTags, getTagCategories, loading, error };
};

export default useTag;
