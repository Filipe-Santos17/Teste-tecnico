import { useCallback, useState } from "react";

const useFetch = () => {
  const [load, setLoad] = useState(false);
  const [erro, setErro] = useState<boolean | string>(false);

  type returnF<T> = {
    response: Promise<Response>,
    json: T,
  }

  const request = useCallback(async<T>(url: string, options: object): Promise<returnF<T>> => {
    let response: Response;
    let json: T;

    try {
      setErro(false);
      setLoad(true);

      response = await fetch(url, options);
      json = await response.json();

      if (!response.ok) {
        if (json && (json as any).msg) {
          setErro((json as any).msg)
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        if( err.message === "Failed to fetch") err.message = "Servidor Fora do Ar"
        setErro(err.message);
      } else {
        setErro("Unknown Error")
      }

    } finally {
      setLoad(false);

      return { response, json };
    }
  }, []);

  return {
    load,
    erro,
    request
  }
};

export default useFetch;