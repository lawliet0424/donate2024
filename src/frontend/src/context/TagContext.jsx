import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTags = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/donation/step1");
      setTags(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

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
    <TagContext.Provider
      value={{ tags, getTags, getTagCategories, loading, error }}
    >
      {children}
    </TagContext.Provider>
  );
};
