import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext.jsx";
import { Activity, LogOut, User } from "lucide-react";
import { useContext } from "react";

export default function Sidebar() {
  const base = "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors";

  const { logoutController } = useContext(AuthContext);

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 min-h-screen p-4">
      <h1 className="text-xl font-bold mb-6">PulseCheck</h1>
      <nav className="flex flex-col gap-1">
        <NavLink
          to="/monitors"
          className={({ isActive }) =>
            `${base} ${
              isActive ? "bg-neutral text-neutral-content" : "hover:bg-base-300"
            }`
          }
        >
          <Activity size={18} />
          Monitors
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${base} ${
              isActive ? "bg-neutral text-neutral-content" : "hover:bg-base-300"
            }`
          }
        >
          <User size={18} />
          Profile
        </NavLink>
      </nav>

      <div className="mt-auto pt-6">
        <button
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-error hover:bg-error/10 w-full cursor-pointer"
          onClick={logoutController}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
