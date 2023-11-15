import { useState } from 'react';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);

  const makeFetch = async (url: string) => {
    setIsLoading(true);
    const response = await fetch(url);
    const json = await response.json();
    setIsLoading(false);
    return json;
  };
  return {
    makeFetch, isLoading,
  };
}

export default useFetch;
