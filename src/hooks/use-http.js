import { useState, useCallback } from "react";
//====================================================Notes=============================================================================
//Custom hook - will make fetch request configurable... for both GET and POST methods. 
//Parameters - will be used to config these changes. 
//sendRequest - function used to make the request
//applyData(data) - function used to pass data from api response, to allow us to do something with it
//return - used to return something to the component where custom hook is used.
//  custom hooks can return anything. 
//useCallback - sendRequest function will be seen a new object on re-render causing react to re-render over and over(infinite loop), 
//  wrapping useCallback around function tells react this function is the same as prev (Returns a memoized callback.), 
//  re-render only if its dependencies change
//======================================================================================================================================
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback (async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: JSON.stringify(requestConfig.body) ? JSON.stringify(requestConfig.body) : null,
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      // or - const applyData = await response.json();
      applyData(data);//passing the function name as a parameter
      //use a function to pass data

    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  },[]);

  return {isLoading, error, sendRequest}
};

export default useHttp; 