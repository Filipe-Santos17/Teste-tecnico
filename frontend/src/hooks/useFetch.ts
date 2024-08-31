import { useCallback, useState } from "react";
import { DataJson } from "@/@types/dataJson";

const useFetch = () => {
  const [data, setData] = useState({});
  const [load, setLoad] = useState(false);
  const [erro, setErro] = useState<boolean | string>(false);

  type returnF<T> = {
    response: Promise<Response>,
    json: T,
  }

  const request = useCallback(async (url: string, options: object): Promise<returnF<DataJson>> => {
    let response: Response | undefined;
    let json: DataJson | undefined;

    try {
      setErro(false);
      setLoad(true);

      response = await fetch(url, options);
      json = await response.json();

      if (response.ok === false) {
        if (json && json.msg) {
          setErro(json.msg)
        }
      }
    } catch (err) {
      json = undefined;
      
      if (err instanceof Error) {
        if( err.message === "Failed to fetch") err.message = "Servidor Fora do Ar"
        setErro(err.message);
      } else {
        setErro("Unknown Error")
      }

    } finally {
      setData(json ? json : {});
      setLoad(false);

      return { response, json };
    }
  }, []);

  return {
    data,
    load,
    erro,
    request
  }
};

export default useFetch;