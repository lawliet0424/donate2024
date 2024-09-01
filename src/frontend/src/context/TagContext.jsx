import React, { createContext, useState, useEffect } from "react";
import { mockGetTags } from "../api";
import useLoadingError from "../hooks/useLoadingError";

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const { loading, error, setLoading, setError } = useLoadingError();

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const tagData = await mockGetTags();
        setTags(tagData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [setLoading, setError]);

  const getTagCategories = () => {
    if (!tags.length) return {};
    return tags.reduce((acc, tag) => {
      acc[tag.tagClass] = tag.tagLists.map((tagItem) => ({
        id: tagItem.id,
        name: tagItem.name,
      }));
      return acc;
    }, {});
  };

  return (
    <TagContext.Provider value={{ tags, loading, error, getTagCategories }}>
      {children}
    </TagContext.Provider>
  );
};
