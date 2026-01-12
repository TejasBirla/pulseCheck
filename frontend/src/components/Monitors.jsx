import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { ActivitySquareIcon, RefreshCcw, Search } from "lucide-react";
import AddMonitorModal from "./AddMonitorModal.jsx";
import MonitorRow from "./MonitorRow.jsx";

export default function Monitors() {
  const { allMonitorsController, allMonitors } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [inputData, setInputData] = useState("");
  const [debounceInput, setDebounceInput] = useState("");
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    allMonitorsController();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceInput(inputData);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputData]);

  const filteredMonitors = allMonitors.filter((monitor) =>
    monitor?.name.toLowerCase().includes(debounceInput.toLowerCase())
  );

  const refreshPage = () => {
    setSpinning(true);
    allMonitorsController();
    setTimeout(() => {
      setSpinning(false);
    }, 1000);
  };
  return (
    <>
      {allMonitors.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center gap-3">
          <ActivitySquareIcon size={37} />
          <h2 className="text-[24px] text-[#333333] font-semibold">
            Nothing is being monitored yet
          </h2>
          <p className="text-[#333333] text-[17px] max-w-85 text-center">
            Monitors check your website regularly and alert you if it becomes
            unavailable.
          </p>
          <button
            className="btn btn-primary bg-primary"
            onClick={() => setOpenModal(true)}
          >
            Add Monitor
          </button>
        </div>
      ) : (
        <div className="max-w-225 mx-auto py-10">
          <div className="flex items-center justify-between mb-10">
            <div
              className="flex items-center gap-4"
            >
              <h1 className="text-[24px] text-[#333333] font-semibold">
                Monitors
              </h1>
              <div className="tooltip" data-tip="Click to refresh the monitors.">
                <RefreshCcw
                  size={18}
                  className={`cursor-pointer transition-transform duration-1000 ${
                    spinning ? "animate-spin" : ""
                  }`}
                  onClick={refreshPage}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type="text"
                  name="search"
                  placeholder="Search..."
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  className="
                pl-9 pr-3 py-2 w-60
                rounded-lg text-[14px]
                border border-gray-300
                focus:outline-none focus:border-primary
                focus:ring-2 focus:ring-primary/30
                transition"
                />
              </div>
              <button
                className="btn btn-primary bg-primary"
                onClick={() => setOpenModal(true)}
              >
                Add Monitor
              </button>
            </div>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-gray-500 border-b border-gray-400 text-[14px]">
              <p className="w-1/2">Name</p>
              <p className="w-1/3 text-center">Status</p>
              <p className="w-1/3 text-right">Latest Check</p>
            </div>
            <div className="space-y-3 mt-4">
              {filteredMonitors.length === 0 ? (
                <p className="text-center text-gray-500 py-6">
                  No monitors match your search
                </p>
              ) : (
                filteredMonitors.map((monitor) => (
                  <MonitorRow monitor={monitor} key={monitor._id} />
                ))
              )}
            </div>
          </div>
        </div>
      )}
      {openModal && <AddMonitorModal onClose={() => setOpenModal(false)} />}
    </>
  );
}
