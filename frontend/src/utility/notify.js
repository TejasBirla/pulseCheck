import { toast } from "react-hot-toast";

export const notifySuccess = (message) => {
  toast.success(message, { className: "alert alert-success shadow-lg" });
};

export const notifyError = (message) => {
  toast.error(message, { className: "alert alert-error shadow-lg" });
};
