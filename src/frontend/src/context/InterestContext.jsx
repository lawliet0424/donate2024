import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export const InterestContext = createContext();

export const InterestProvider = ({ children }) => {
  const [userInterests, setUserInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const getInterest = useCallback(async () => {
    if (!user || !user.donorId) return;

    setLoading(true);
    setError(null);

    try {
      // 서버에서 관심 수혜자 ID 리스트를 받아옵니다.
      const response = await axios.get("/api/interest/get", {
        withCredentials: true,
      });
      setUserInterests(response.data);
    } catch (error) {
      console.error("Failed to load user interests", error);
      setError("Failed to load user interests");
      setUserInterests([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getInterest();
  }, [getInterest]);

  const toggleInterest = async (beneficiaryId) => {
    const isInterested = userInterests.includes(beneficiaryId);
    setLoading(true);
    setError(null);

    try {
      const updatedInterests = isInterested
        ? userInterests.filter((id) => id !== beneficiaryId)
        : [...userInterests, beneficiaryId];

      // 서버에 변경된 리스트 전체를 전송합니다.
      await axios.post(
        "/api/interest/toggle",
        { interests: updatedInterests },
        { withCredentials: true }
      );

      setUserInterests(updatedInterests);
    } catch (error) {
      console.error("Failed to toggle interest", error);
      setError("Failed to toggle interest");
    } finally {
      setLoading(false);
    }
  };

  return (
    <InterestContext.Provider
      value={{
        toggleInterest,
        userInterests,
        loading,
        error,
      }}
    >
      {children}
    </InterestContext.Provider>
  );
};
