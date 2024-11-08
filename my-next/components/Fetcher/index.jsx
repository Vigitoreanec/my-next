import { useEffect, useState } from "react";
import { Spiner } from "../JS-PH/Spiner";


export function Fetcher({ url, setDate, children }) {
    const
        [result, setResult] = useState(null);
    useEffect(() => {
        async function getData() {
            setResult(null);
            try {
                const
                    response = await fetch(url),
                    data = await response.json();
                if (!response.ok) throw new Error(response.status)
                setDate(data);
                setResult(true);
            } catch (error) {
                setResult(error);
            }
        }
        getData();
    }, [url]);
    if (result instanceof Error)
        return <div className="error">
            Error {result.toString()}
        </div>
    if (result) {
        return <>{children}</>
    }
    return <Spiner />
}