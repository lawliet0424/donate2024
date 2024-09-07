import React, { createContext, useState, useEffect } from "react";
import { mockGetTags } from "../api";

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // useEffect(() => {
  //   const fetchTags = () => {
  //     setLoading(true);
  //     axios.get("/donation/step1")
  //       .then((response) => {
  //         setTags(response.data);
  //       })
  //       .catch((err) => {
  //         setError(err);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   };

  //   fetchTags();
  // }, [setLoading, setError]);

  const getTags = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await axios.get("/donation/step1"); // 실제 URL로 교체 필요
    //     setTags(response.data);
    //   } catch (err) {
    //     setError(err);
    //   } finally {
    //     setLoading(false);
    //   }
  };

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
