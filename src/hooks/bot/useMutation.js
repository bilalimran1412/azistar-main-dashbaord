import React from 'react';
import { fetchWrapper } from '../../utils/fetchWrapper';

export const useMutation = (url, method = 'POST') => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const mutate = React.useCallback(
    async (body = {}, config = {}) => {
      setLoading(true);
      setError(null);
      setIsSuccess(false);
      try {
        const result = await fetchWrapper({
          url,
          method,
          body,
          ...config,
        });
        if (result.data) {
          setData(result.data);
          setIsSuccess(true);
        }
      } catch (err) {
        setError(err);
        setIsSuccess(false);
      } finally {
        setLoading(false);
      }
    },
    [url, method]
  );

  return {
    data,
    loading,
    error,
    isSuccess,
    mutate,
  };
};
