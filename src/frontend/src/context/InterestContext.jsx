import React, { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";
import { mockGetUserInterests } from "../api";
import useAuth from "../hooks/useAuth";

export const InterestContext = createContext();

export const InterestProvider = ({ children }) => {
  const [userInterests, setUserInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const getUserInterests = useCallback(async () => {
    // if (user && user.donorId) {
    //   axios
    //     .get(`http://localhost:5000/user/${user.donorId}/interests`, {
    //       withCredentials: true,
    //     })
    //     .then((response) => {
    //       setUserInterests(response.data);
    //     })
    //     .catch((error) => {
    //       console.error("Failed to load user interests", error);
    //       setUserInterests([]);
    //     });
    // }
    //
    //
    // try {
    //   const interests = await mockGetUserInterests(user.donorId);
    //   setUserInterests(interests);
    // } catch (error) {
    //   console.error("Failed to load user interests", error);
    //   setUserInterests([]);
    // }

    // Check if user is logged in
    if (!user || !user.donorId) return;

    setLoading(true);
    setError(null);

    const cachedInterests = localStorage.getItem(
      `user_interests_${user.donorId}`
    );

    if (cachedInterests) {
      setUserInterests(JSON.parse(cachedInterests));
      setLoading(false);
      return;
    }

    try {
      const interests = await mockGetUserInterests(user.donorId);
      const stringifiedInterests = interests.map(String);
      localStorage.setItem(
        `user_interests_${user.donorId}`,
        JSON.stringify(stringifiedInterests)
      );
      setUserInterests(stringifiedInterests);
    } catch (error) {
      setError("Failed to load user interests");
      setUserInterests([]);
    } finally {
      setLoading(false);
    }
  }, [user, setError, setLoading]);

  const toggleInterest = async (beneficiaryId) => {
    // const request = isInterested
    //   ? axios.post(
    //       "http://localhost:5000/interest/remove",
    //       { beneficiaryId },
    //       { withCredentials: true }
    //     )
    //   : axios.post(
    //       "http://localhost:5000/interest/add",
    //       { beneficiaryId },
    //       { withCredentials: true }
    //     );

    // return request.then(() => {
    //   setUserInterests((prevInterests) => {
    //     if (isInterested) {
    //       return prevInterests.filter((id) => id !== beneficiaryId);
    //     } else {
    //       return [...prevInterests, beneficiaryId];
    //     }
    //   });
    // });
    const isInterested = userInterests.includes(beneficiaryId);
    setLoading(true);
    setError(null);

    try {
      const updatedInterests = isInterested
        ? userInterests.filter((id) => id !== beneficiaryId)
        : [...userInterests, beneficiaryId];

      setUserInterests(updatedInterests);

      if (user && user.donorId) {
        localStorage.setItem(
          `user_interests_${user.donorId}`,
          JSON.stringify(updatedInterests.map(String))
        );
      }
    } catch (error) {
      setError("Failed to toggle interest");
    } finally {
      setLoading(false);
    }
  };

  return (
    <InterestContext.Provider
      value={{
        userInterests,
        toggleInterest,
        getUserInterests,
        loading,
        error,
      }}
    >
      {children}
    </InterestContext.Provider>
  );
};
