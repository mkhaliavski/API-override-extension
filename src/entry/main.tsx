import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import NetworkManager from "../lib/network/NetworkManager";
import { NetworkEntry } from "../lib/network/types";


const Main = () => {

    const [data, setData] = useState<NetworkEntry[]>([])

    useEffect(() => {
        NetworkManager.addViewCallback("main", (_, all) => {
            setData(all)
        })
    }, [])

    return (
        <table>
            <thead>
            <tr>
                <th>Id</th>
                <th>Url</th>
                <th>Status</th>
                <th>Response</th>
            </tr>
            </thead>
            <tbody>
            {data.map((entry) => (
                <tr key={entry.requestId}>
                    <td>{entry.requestId}</td>
                    <td>{(entry.request as any).url}</td>
                    <td>{entry.responseStatusCode}</td>
                    <td>{entry.body}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}


const root = createRoot(document.getElementById("root"));
root.render(<Main/>)


