import { useEffect, useState } from "react";


export default function Home(){

    const [data, setData] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL || '/api';

    useEffect(() => {
        fetch(`${apiUrl}/data`)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [apiUrl])

    return (
        <h1>{data && <p>{data.message}</p>}</h1>
    )
}