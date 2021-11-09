import { useState, useEffect } from "react";
import axios from "axios";
const useFetch = (query) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    const getData = async () => {
      try {
        const res = await axios.post(process.env.REACT_APP_BACK_END, {
          query: query,
        });

        console.log('data BACK USEFFECt',res)

        const data = res.data.data;
        console.log(data, "databout");
    
        setData(data);
        setIsPending(false);
        setError(null);
      } catch (e) {
        if (e.name === "AbortError") {
          console.log("aboert");
        } else {
          setIsPending(false);
          setError(e.message);
        }
      }
    };

    getData();

    return () => abortCont.abort();
  }, [query]);
  return { data, isPending, error };
};

export default useFetch;
