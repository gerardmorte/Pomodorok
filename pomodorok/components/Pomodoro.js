import React from "react";

export default function Pomodoro() {
  return (
    <div className="flex gap-10">
      <div>
        <div className="text-9xl p-10 rounded-2xl border-slate-800 border-4 text-black text-center">
          25:00
        </div>
        <div className="flex mt-4 gap-2">
          <div className="text-2xl p-10 rounded-2xl border-slate-800 border-4 text-black m-1">
            START
          </div>
          <div className="text-2xl p-10 rounded-2xl border-slate-800 border-4 text-black m-1">
            PAUSE
          </div>
          <div className="text-2xl p-10 rounded-2xl border-slate-800 border-4 text-black m-1">
            NEXT
          </div>
        </div>
        <div className="text-2xl p-10 rounded-2xl border-slate-800 border-4 text-black m-1 text-center">
          1/4
        </div>
      </div>
      <div>
        <div className="flex">
          <div className="text-2xl p-10 rounded-2xl border-slate-800 border-4 text-black m-1">
            SAVE TASK
          </div>
          <div className="text-2xl p-10 rounded-2xl border-slate-800 border-4 text-black m-1">
            EDIT TASK
          </div>
        </div>
        <input
          className="text-2xl p-10 rounded-2xl border-slate-800 border-4 text-black m-1 w-full"
          type="text"
          placeholder="New task..."
        ></input>

        <div className="text-2xl p-10 rounded-2xl border-slate-800 border-4 text-black m-1 w-full">
          FINISH POMODOROK
        </div>
      </div>
    </div>
  );
}
