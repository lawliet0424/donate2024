import { useState } from "react";

const useLoadingError = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return { loading, error, setLoading, setError };
};

export default useLoadingError;
