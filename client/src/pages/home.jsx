import { useEffect, useState } from "react";


export default function Home(){

    const [data, setData] = useState(null);
    const apiUrl = '/api/projects';

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [apiUrl])

    return (
        <h1>{data && <p>{data[0].name}</p>}</h1>
    )
}