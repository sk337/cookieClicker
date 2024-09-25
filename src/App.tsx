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
  const [checked, setChecked] = useState(false);
  function toggleCheck() {
    setChecked(!checked);
  }
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
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                checked={checked}
                onChange={() => {}}
              />
              <div
                className={`w-4 h-4 border-2 border-gray-300 rounded-sm flex items-center justify-center
          ${checked ? "bg-primary text-white" : "bg-primary"}
          hover:bg-light transition-colors duration-200`}
              >
                {checked && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-3 h-3"
                    scale={4}
                  >
                    <path d="M5 12l5 5L20 7" strokeWidth="4" />
                  </svg>
                )}
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
