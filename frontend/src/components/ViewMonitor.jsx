import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../contexts/AuthContext.jsx";
import { useParams } from "react-router-dom";
import {
  MoveLeft,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  Activity,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function ViewMonitor() {
  const { monitorId } = useParams();
  const {
    viewSingleMonitorController,
    monitorDetail,
    monitorHistoryController,
    monitorHistory,
    deleteMonitorController,
  } = useContext(AuthContext);

  const [historyExpanded, setHistoryExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const historyRef = useRef(null);

  useEffect(() => {
    viewSingleMonitorController(monitorId);
    monitorHistoryController(monitorId);

    const intervalId = setInterval(() => {
      monitorHistoryController(monitorId);
    }, 10_000);

    return () => clearInterval(intervalId);
  }, [monitorId]);

  // Update maxHeight whenever expanded or monitorHistory changes
  useEffect(() => {
    if (historyExpanded && historyRef.current) {
      setMaxHeight(`${historyRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [historyExpanded, monitorHistory]);

  const responseTimes = monitorHistory
    .filter((h) => h.responseTime != null)
    .map((h) => h.responseTime);

  const hasEnoughData = responseTimes.length >= 2;

  const bestResTime =
    responseTimes?.length > 0 ? Math.min(...responseTimes) : null;
  const worstResTime = hasEnoughData ? Math.max(...responseTimes) : null;
  const AvgResTime =
    responseTimes?.length > 0
      ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
      : null;

  const bestPing = monitorHistory.find((h) => h.responseTime === bestResTime);
  const worstPing = monitorHistory.find((h) => h.responseTime === worstResTime);

  const latestPing = monitorHistory[0];
  const isCurrentUp = latestPing?.status === "up";

  const totalChecks = monitorHistory.length;

  const upChecks = monitorHistory?.filter(
    (monitor) => monitor?.status === "up"
  ).length;

  const upTimePercent =
    totalChecks > 0 ? ((upChecks / totalChecks) * 100).toFixed(2) : "0.00";

  const uptimeColor =
    upTimePercent >= 99
      ? "text-green-700"
      : upTimePercent >= 95
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="max-w-225 mx-auto py-10">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-[24px] text-[#333333] font-semibold">
              {monitorDetail?.name}
            </h1>
            <p
              className={`h-3 w-3 rounded-full tooltip cursor-pointer ${
                isCurrentUp ? "bg-green-500" : "bg-red-500"
              }`}
              data-tip="Current Status"
            />
            <p />
          </div>

          <p className="text-[14px] text-gray-600">{monitorDetail?.url}</p>
        </div>

        <Link
          to="/monitors"
          className="flex items-center gap-1 cursor-pointer hover:text-primary text-gray-600"
        >
          <MoveLeft size={20} />
          Back to Monitors
        </Link>
      </div>

      {monitorHistory?.length === 0 ? (
        <p className="mt-6 text-sm text-gray-500">No history available</p>
      ) : (
        <div className="mt-6">
          <p className="text-xs text-gray-500 mb-2">
            Showing last{" "}
            <span className="font-semibold text-gray-700">
              {monitorHistory?.length}
            </span>{" "}
            checks • Most recent first
          </p>

          {/* Dropdown toggle */}
          <button
            className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-2 cursor-pointer"
            onClick={() => setHistoryExpanded((prev) => !prev)}
          >
            {historyExpanded ? "Hide History" : "Show History"}
            {historyExpanded ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {/* Smooth dropdown */}
          <div
            ref={historyRef}
            className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
            style={{ maxHeight }}
          >
            {/* Header */}
            <div className="flex justify-between px-4 py-2 text-xs font-semibold text-gray-500">
              <span>Status</span>
              <span>Response Time</span>
              <span>Checked At</span>
            </div>

            {/* Rows */}
            <div className="space-y-3 mt-2">
              {monitorHistory.map((history) => {
                const isUp = history?.status === "up";
                return (
                  <div
                    key={history._id}
                    className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-xl px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-3 w-3 rounded-full ${
                          isUp ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <span
                        className={`text-sm font-semibold ${
                          isUp ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {isUp ? "Up" : "Down"}
                      </span>
                    </div>
                    <span className="text-sm font-mono text-gray-600">
                      {history?.responseTime
                        ? `${history?.responseTime} ms`
                        : "--"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(history?.checkedAt).toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center mt-6">
            <div className="stats shadow bg-white rounded-xl p-4 flex gap-6">
              <div className="stat">
                <div className="stat-title flex items-center gap-1 text-green-600">
                  <ArrowUp size={16} /> Best Response
                </div>
                <div className="stat-value text-green-700">
                  {bestResTime} ms
                </div>
                <div className="stat-desc text-gray-500">
                  {bestPing
                    ? new Date(bestPing?.checkedAt).toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "short",
                      })
                    : ""}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title flex items-center gap-1 text-blue-600">
                  <Activity size={16} /> Average Response
                </div>
                <div className="stat-value text-blue-700">
                  {AvgResTime?.toFixed(2)} ms
                </div>
                <div className="stat-desc text-gray-500">
                  Average of last {monitorHistory?.length} checks
                </div>
              </div>

              <div className="stat">
                <div className="stat-title flex items-center gap-1 text-red-600">
                  <ArrowDown size={16} /> Worst Response
                </div>
                <div className="stat-value text-red-700">{worstResTime} ms</div>
                <div className="stat-desc text-gray-500">
                  {worstPing
                    ? new Date(worstPing.checkedAt).toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "short",
                      })
                    : ""}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title flex items-center gap-1 text-emerald-600">
                  <Activity size={16} /> Uptime
                </div>
                <div className={`stat-value ${uptimeColor}`}>
                  {upTimePercent}%
                </div>
                <div className="stat-desc text-gray-500">
                  Based on last {totalChecks} checks
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-6">
        <button
          className="
          tooltip
    flex items-center gap-2
    px-4 py-2
    cursor-pointer
    border border-red-300
    text-red-600 text-sm font-medium
    rounded-lg
    hover:bg-red-50 hover:border-red-400
    transition
  "
          data-tip="By clicking on this the monitor will be deleted. This action is irreversible."
          onClick={() => deleteMonitorController(monitorId)}
        >
          Delete Monitor
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
