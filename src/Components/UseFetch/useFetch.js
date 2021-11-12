import { useState, useEffect } from "react";
import axios from "axios";

/*
 *
 * Description:
 * Own made fetch, in react you can make your own hook
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const useFetch = (query) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    const getData = async () => {
      try {
        const res = await axios.post(process.env.REACT_APP_BACK_END, {
          query: query,
          cancelToken: cancelTokenSource.token,
        });

        setData(res.data.data);
        setIsPending(false);
        setError(null);
      } catch (e) {
        setIsPending(false);
        setError(e.message);
      }
    };

    getData();

    return () => cancelTokenSource.cancel();
  }, [query]);
  return { data, isPending, error };
};

export default useFetch;
