import { X } from "lucide-react";
import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function UpdateProfileModal({ onClose, authUser }) {
  const { editUserController } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: "",
      form: "",
    }));
  };

  const validate = () => {
    let errors = {};

    const hasAnyValue =
      formData.user.trim() || formData.email.trim() || formData.password.trim();

    if (!hasAnyValue) {
      errors.form = "Please update at least one field.";
      return errors;
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address.";
    }

    if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    const success = await editUserController(formData);
    if (success) {
      onClose();
      navigate("/login");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-6 text-center">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="add-monitor-label">USERNAME</label>
            <input
              type="text"
              name="user"
              value={formData.user}
              onChange={handleChange}
              placeholder={authUser?.user || "Enter new username"}
              className="add-monitor-input"
            />
          </div>

          {/* Email */}
          <div>
            <label className="add-monitor-label">EMAIL</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={authUser?.email || "Enter new email"}
              className="add-monitor-input"
            />
            {error.email && (
              <p className="text-sm text-red-600 mt-1">{error.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="add-monitor-label">PASSWORD</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="add-monitor-input"
            />
            {error.password && (
              <p className="text-sm text-red-600 mt-1">{error.password}</p>
            )}
          </div>

          {error.form && (
            <p className="text-sm text-red-600 text-center">{error.form}</p>
          )}

          <button
            type="submit"
            className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition cursor-pointer"
          >
            Update Profile
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center max-w-75 mx-auto w-full">
          Update only the fields you want to change. Leave others unchanged.
        </p>
      </div>
    </div>
  );
}
