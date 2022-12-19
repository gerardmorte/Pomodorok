import React from "react";

export default function Pomodoro() {
  return (
    <div>
      <div className="flex gap-10">
        <div>
          <div className="text-9xl p-10 rounded-2xl border-white border-2 text-white text-center">
            25:00
          </div>
          <div className="flex mt-1 gap-2">
            <div className="text-2xl p-10 rounded-2xl border-white border-2 text-white mt-1 mb-1">
              START
            </div>
            <div className="text-2xl p-10 rounded-2xl border-white border-2 text-white mt-1 mb-1">
              PAUSE
            </div>
            <div className="text-2xl p-10 rounded-2xl border-white border-2 text-white mt-1 mb-1">
              NEXT
            </div>
          </div>
          <div className="text-2xl p-10 rounded-2xl border-white border-2 text-white mt-1 mb-1 text-center w-full">
            1/4
          </div>
        </div>
        <div>
          <input
            className="text-2xl p-10 rounded-2xl border-white border-2 text-white m-1 w-full"
            type="text"
            placeholder="New task..."
          ></input>
          <div className="flex">
            <div className="text-2xl p-10 rounded-2xl border-white border-2 text-white m-1">
              SAVE TASK
            </div>
            <div className="text-2xl p-10 rounded-2xl border-white border-2 text-white m-1">
              EDIT TASK
            </div>
          </div>
        </div>
      </div>
      <div className="text-2xl p-10 rounded-2xl border-white border-2 text-white m-1 w-full text-center">
        FINISH POMODOROK
      </div>
    </div>
  );
}
