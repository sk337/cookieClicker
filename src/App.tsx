import { $ } from "bun";
import React, { useState } from "react";

function clickCookie() {
  Game.ClickCookie({ preventDefault: () => { } } as MouseEvent);

}

function recordToTupleArray<T extends string | number | symbol, V>(record: Record<T, V>): Array<[T, V]> {
  return Object.entries(record) as Array<[T, V]>;
}

function removeDuplicates<T extends string | number | symbol, V>(self: Array<[T, V]>, other: Array<[T, V]>): Array<[T, V]> {
  return self.filter(([key, _value]) => {
    return !other.includes([key, _value])
  })
}


export default function Page() {
  const [isVisable, setUI] = useState(true);
  const [clicker, setClicker] = useState<Timer | false>(false);
  const [autoBuy, setAutoBuy] = useState<Timer | false>(false);
  const [giveAchivement, setGiveAchivement] = useState("");
  const [specialCookie, setSpecialCookie] = useState("");


  return (
    <div className="flex flex-row-reverse absolute top-12 left-12 z-[999]">
      <div className={`flex flex-col ${(isVisable && "w-96")} border-gray-700 border-[1px] border-solid max-h-60`}>
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
            className="h-full p-2 flex flex-col gap-2"
            style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          >
            <div className="flex flex-row gap-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={clicker ? true : false}
                  onChange={() => {
                    console.log(typeof clicker)
                    if (typeof clicker == "number") {
                      clearInterval(clicker)
                      setClicker(false)
                    } else {
                      const timer = setInterval(() => {
                        clickCookie();
                      }, 10)
                      setClicker(timer)
                    }
                  }}
                />
                <div
                  className={`w-4 h-4 border-2 border-gray-300 rounded-sm flex items-center justify-center
          ${typeof clicker === "number" ? "bg-primary text-white" : "bg-primary"}
          hover:bg-light transition-colors duration-200`}
                >
                  {typeof clicker === "number" && (
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
              <span>Auto Clicker</span>
            </div>

            <div className="flex flex-row gap-2">
              <select id="achivements" value={giveAchivement} onChange={(e) => {
                setGiveAchivement(e.target.value)
              }} className="max-w-48 rounded-none bg-dim hover:bg-primary">
                {recordToTupleArray(Game.Achievements).map(([key, _value]) => {
                  return <option value={key} key={key} className="max-w-48 overflow-scroll bg-dim hover:bg-primary" ><span className="text-[16px]">{key}</span></option>
                })}
              </select>
              <label htmlFor="achivement">
                <button
                  onClick={() => {
                    Game.Win(giveAchivement)
                  }}
                  className="bg-primary hover:bg-light transition-colors duration-200 text-white px-1 py-0.5 rounded-none"
                >
                  get achivement
                </button>
              </label>
            </div>

            <div className="flex flex-row gap-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={autoBuy ? true : false}
                  onChange={() => {
                    if (typeof autoBuy == "number") {
                      clearInterval(autoBuy)
                      setAutoBuy(false)
                    } else {
                      const timer = setInterval(() => {
                        // buy the most highest teir building that is affordable
                        let buyType: "upgrade" | "object" = "object";
                        let max = 0;
                        let maxKey = "";

                        for (const [key, value] of recordToTupleArray(Game.Objects)) {
                          if (value.price <= Game.cookies) {
                            if (value.basePrice > max) {
                              buyType = "object";
                              max = value.basePrice;
                              maxKey = key;
                            }
                          }
                        }
                        // for (const [key, value] of recordToTupleArray(Game.Upgrades)) {
                        //   if (!value.bought && value.getPrice() <= Game.cookies) {
                        //     if (value.getPrice() > max) {
                        //       buyType = "upgrade";
                        //       max = value.getPrice();
                        //       maxKey = key;
                        //     }
                        //   }
                        // }
                        if (max === 0) {
                          return;
                        }
                        if (buyType === "object") {
                          Game.Objects[maxKey].buy();
                        } else {
                          Game.Upgrades[maxKey].buy(true);
                        }

                      }, 100)
                      setAutoBuy(timer)
                    }
                  }}
                />
                <div
                  className={`w-4 h-4 border-2 border-gray-300 rounded-sm flex items-center justify-center
          ${typeof autoBuy === "number" ? "bg-primary text-white" : "bg-primary"}
          hover:bg-light transition-colors duration-200`}
                >
                  {typeof autoBuy === "number" && (
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
              <span>Auto Buy</span>
            </div>

            <div className="flex flex-row gap-2">
              <select id="cookieSpawn" value={specialCookie} onChange={(e) => {
                setSpecialCookie(e.target.value)
              }} className="max-w-48 rounded-none bg-dim hover:bg-primary">
                {recordToTupleArray(Game.shimmerTypes).map(([key, value]) => {
                  return <option value={key} key={key} className="max-w-48 overflow-scroll bg-dim hover:bg-primary" ><span className="text-[16px]">{key}</span></option>
                })}
              </select>
              <label htmlFor="cookieSpawn">
                <button
                  onClick={() => {
                    let shimmer = new Game.shimmer(specialCookie);
                    shimmer.spawnLead = 1;
                  }}
                  className="bg-primary hover:bg-light transition-colors duration-200 text-white px-1 py-0.5 rounded-none"
                >
                  Spawn Shimmer
                </button>
              </label>
            </div>

            <button className="bg-primary hover:bg-light transition-colors duration-200 text-white px-1 py-0.5 rounded-none" onClick={() => {
              if (clicker) clearInterval(clicker);
              if (autoBuy) clearInterval(autoBuy);
              document.querySelector("#self.script")?.remove();
              document.querySelector("#self.styles")?.remove();
              document.querySelector("#root")?.remove();
              const script = document.createElement("script");
              script.src = `./index.js?${Math.random()}`;
              script.type = "module";
              script.id = "self.script";
              document.body.appendChild(script);
            }}>Reload Cheat</button>

          </div>
        )}
      </div>
    </div >
  );
}
