import { useState } from "react";
//===============================Notes================================================
//Custom hook - will make fetch request configurable... for both GET and POST methods. 
//Parameters - will be used to config these changes. 
//return - used to return something to the component where custom hook is used.
//return - custom hooks can return anything. 
//====================================================================================
const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url, {
          method: requestConfig.method,
          headers: requestConfig.headers,
          body: JSON.stringify(requestConfig.body)
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      // or - const applyData = await response.json();
      applyData(data);
      //use a function to pass data

    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  return {isLoading, error, sendRequest}
};

export default useHttp; 