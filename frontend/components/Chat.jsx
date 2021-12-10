import {useEffect} from "react";

export default function Chat({join, leave, children}) {
    useEffect(
        () => {
            join()

            return () => leave()
        },
        []
    );

    return (
        <div>
            {children}
        </div>
    )
}