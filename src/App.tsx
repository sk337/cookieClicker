import React, { useState } from "react";
import { ImguiCheckbox } from "./imgui";

function LabelPair({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-row gap-2 items-center">
      {children}
      <label>{label}</label>
    </div>
  );
}

export default function Page() {
  const [isVisable, setUI] = useState(true);
  const [clicker, setClicker] = useState<Timer | false>(false);

  return (
    <div className="flex flex-row-reverse absolute top-24 right-24 z-[999]">
      <div className="flex flex-col w-72 border-gray-700 border-[1px] border-solid max-h-60">
        <div className="w-full bg-primary border-gray-700 border-b-[1px] border-solid flex flex-row gap-2 p-0.5 ps-2 items-center">
          <button
            className="rounded-full hover:bg-light h-5 w-5 flex items-center justify-center"
            onClick={() => {
              setUI(!isVisable);
            }}
          >
            {isVisable ? (
              <svg
                width="11"
                height="9"
                viewBox="0 0 11 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 0H0L5.5 9L11 0Z" fill="white" />
              </svg>
            ) : (
              <svg
                width="9"
                height="11"
                viewBox="0 0 9 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0V11L9 5.5L0 0Z" fill="white" />
              </svg>
            )}
          </button>

          <span>Cookie Sploit</span>
        </div>
        {isVisable && (
          <div
            className="h-full p-2"
            style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          >
            <LabelPair label="Auto Clicker">
              <input
                type="checkbox"
                onChange={() => {
                  if (clicker) {
                    clearInterval(clicker);
                    setClicker(false);
                  } else {
                    const timer = setInterval(() => {
                      // try to make a better way to click the cookie that will trigger the click event
                      document.getElementById("bigCookie")?.click();
                    }, 100);
                    setClicker(timer);
                  }
                }}
                value={clicker ? true : false}
              />
            </LabelPair>
          </div>
        )}
      </div>
    </div>
  );
}
