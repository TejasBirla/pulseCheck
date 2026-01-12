import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { X } from "lucide-react";

function AddMonitorModal({ onClose }) {
  const { addMonitorController, authUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    url: "",
    protocol: "HTTP",
    interval: 10,
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  // Detect protocol mismatch between radio and URL
  const hasProtocolConflict = (input, selectedProtocol) => {
    if (/^https:\/\//i.test(input) && selectedProtocol === "HTTP") return true;
    if (/^http:\/\//i.test(input) && selectedProtocol === "HTTPS") return true;
    return false;
  };

  // Decide final protocol (used only after validation)
  const resolveProtocol = (input, selectedProtocol) => {
    if (/^https:\/\//i.test(input)) return "HTTPS";
    if (/^http:\/\//i.test(input)) return "HTTP";
    return selectedProtocol;
  };

  // URL validation

  const isValidMonitorUrl = (input, selectedProtocol) => {
    const value = input.trim();
    if (!value) return false;

    let url;
    try {
      if (/^https?:\/\//i.test(value)) {
        url = new URL(value);
      } else {
        url = new URL(`${selectedProtocol.toLowerCase()}://${value}`);
      }
    } catch {
      return false;
    }

    const hostname = url.hostname;

    if (hostname === "localhost") return true;
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) return true;
    if (!hostname.includes(".")) return false;

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Protocol mismatch error
    if (hasProtocolConflict(formData.url, formData.protocol)) {
      setError(
        "Protocol mismatch detected. Please ensure the selected protocol matches the URL protocol."
      );
      return;
    }

    const finalProtocol = resolveProtocol(formData.url, formData.protocol);

    if (!isValidMonitorUrl(formData.url, finalProtocol)) {
      setError("Please enter a valid domain or endpoint.");
      return;
    }

    const success = await addMonitorController({
      ...formData,
      protocol: finalProtocol,
      url: formData.url.trim(),
    });

    if (success) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="mt-2 cursor-pointer" />
        </button>

        <h2 className="text-xl font-semibold mb-6 text-center">Add Monitor</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="add-monitor-label">MONITOR NAME</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Amazon, Google"
              className="validator add-monitor-input"
              required
            />
          </div>

          {/* Protocol */}
          <div>
            <label className="add-monitor-label">PROTOCOL</label>
            <div className="flex gap-6">
              {["HTTP", "HTTPS"].map((proto) => (
                <label
                  key={proto}
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <input
                    type="radio"
                    name="protocol"
                    value={proto}
                    checked={formData.protocol === proto}
                    onChange={handleChange}
                  />
                  {proto}
                </label>
              ))}
            </div>
          </div>

          {/* URL */}
          <div>
            <label className="add-monitor-label">WEBSITE URL</label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="example.com or https://example.com/health"
              className="validator add-monitor-input"
              required
            />
            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
          </div>

          {/* Interval */}
          <div>
            <label className="add-monitor-label">INTERVAL</label>
            <div className="flex gap-3 flex-wrap">
              {[10, 15, 30, 60].map((min) => (
                <button
                  key={min}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      interval: min,
                    }))
                  }
                  className={`px-4 py-2 rounded-2xl text-sm border transition
                    ${
                      formData.interval === min
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 text-gray-700 hover:border-blue-400"
                    }`}
                >
                  {min} min
                </button>
              ))}
            </div>
          </div>

          {/* Alert info */}
          <p className="text-xs text-gray-600">
            We’ll send alerts to{" "}
            <span className="font-medium">{authUser?.email}</span>
          </p>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition cursor-pointer"
          >
            Add Monitor
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMonitorModal;
