import { useState } from "react";

export default function Page() {
    const [showUI, hideUI] = useState(true);

    return (
        <div className="flex flex-row-reverse p-20">
            <div className="bg-purple-950 rounded-md flex flex-col w-42"
                style={{ pointerEvents: "auto" }}>
                <div className="w-full bg-purple-800 flex flex-row gap-4">
                    Cookie Sploit
                </div>
            </div>
        </div >
    );
}