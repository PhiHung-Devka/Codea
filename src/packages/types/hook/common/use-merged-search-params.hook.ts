import { useSearchParams } from "react-router-dom";

export function useMergedSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (updater: (params: URLSearchParams) => void) => {
    // const params = new URLSearchParams(searchParams.toString()); // clone tránh đụng state gốc
    const params = new URLSearchParams(window.location.search); // clone tránh đụng state gốc
    updater(params);
    setSearchParams(params, { replace: true });
  };

  return {
    current: searchParams,
    updateSearchParams,
  };
}
