import { Link } from "react-router-dom";

export default function MonitorRow({ monitor }) {
  const isUp = monitor.status === "up";

  return (
    <Link to={`/monitors/${monitor?._id}`}>
      <div className="bg-gray-50 rounded-xl px-4 py-4 flex items-center hover:bg-gray-100 transition cursor-pointer mb-3">
        {/* Name */}
        <div className="w-1/2 flex flex-col gap-1">
          <p className="text-[15px] font-semibold text-gray-900">
            {monitor.name}
          </p>
          <p className="text-[13px] text-gray-500 truncate">{monitor.url}</p>
        </div>

        {/* Status */}
        <div className="w-1/3 flex justify-center">
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isUp ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                isUp ? "text-green-700" : "text-red-700"
              }`}
            >
              {isUp ? "Up" : "Down"}
            </span>
          </div>
        </div>

        {/* Latest Check */}
        <div className="w-1/3 text-right text-sm text-gray-500">
          {monitor.lastPing
            ? new Date(monitor.lastPing).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Never"}
        </div>
      </div>
    </Link>
  );
}
