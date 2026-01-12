import AuthContext from "./AuthContext.jsx";
import api from "../service/api.jsx";
import { useEffect, useState } from "react";
import { notifySuccess, notifyError } from "../utility/notify.js";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [allMonitors, setAllMonitors] = useState([]);
  const [monitorDetail, setMonitorDetail] = useState(null);
  const [monitorHistory, setAllMonitorHistory] = useState([]);

  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const { data } = await api.get("/api/users/me");
      if (data?.success) {
        setAuthUser(data?.user);
      } else {
        setAuthUser(null);
      }
    } catch (error) {
      setAuthUser(null);
      console.log(error?.message);
    } finally {
      setLoadingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const signupController = async (signupData) => {
    try {
      setLoading(true);
      const { data } = await api.post("/api/users/user-signup", signupData);
      if (data?.success) {
        notifySuccess(data?.message);
        await checkAuth();
        navigate("/monitors");
      }
    } catch (error) {
      console.log("Error occur in signup user: ", error.message);
      notifyError(
        error?.response?.data?.message || "Server Error, try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const loginController = async (loginData) => {
    try {
      setLoading(true);
      const { data } = await api.post("/api/users/user-login", loginData);
      if (data?.success) {
        notifySuccess(data?.message);
        await checkAuth();
        navigate("/monitors");
      }
    } catch (error) {
      console.log("Error occur in login user: ", error.message);
      notifyError(
        error?.response?.data?.message || "Server Error, try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const logoutController = async () => {
    try {
      const { data } = await api.post(
        "/api/users/user-logout",
        {},
        { withCredentials: true }
      );
      if (data?.success) {
        notifySuccess(data?.message);
        setAuthUser(null);
        navigate("/");
      }
    } catch (error) {
      console.log("Error occur in logoutController: ", error.message);
      notifyError(
        error?.response?.data?.message || "Server Error, try again later."
      );
    }
  };

  const editUserController = async (updatedUserData) => {
    try {
      const { data } = await api.patch(
        "/api/users/user-update",
        updatedUserData
      );
      if (data?.success) {
        notifySuccess(data?.message);
        return true;
      }
    } catch (error) {
      console.log("Error occur in editUserController: ", error.message);
      notifyError(
        error?.response?.data?.message || "Server Error, try again later."
      );
      return false;
    }
  };

  const deleteUserController = async () => {
    try {
      const { data } = await api.delete("/api/users/user-delete");
      if (data?.success) {
        notifySuccess(data?.message);
        setAuthUser(null);
        navigate("/");
      }
    } catch (error) {
      console.log("Error occur in deleterUserController: ", error.message);
      notifyError(
        error?.response?.data?.message || "Server Error, try again later."
      );
    }
  };

  const allMonitorsController = async () => {
    try {
      const { data } = await api.get("/api/monitors/all-monitors");
      if (data?.success) {
        setAllMonitors(data?.monitors);
      }
    } catch (error) {
      console.log("Error occur in AllMonitorsController: ", error.message);
      notifyError(
        error?.response?.data?.message || "Server Error, try again later."
      );
    }
  };

  const addMonitorController = async (monitorData) => {
    try {
      const { data } = await api.post("/api/monitors/add-monitor", monitorData);
      if (data?.success) {
        notifySuccess(data?.message);
        setAllMonitors((prev) => [data.monitor, ...prev]);
        return true;
      }
    } catch (error) {
      console.log("Error occur in addMonitorController: ", error.message);
      notifyError(
        error?.response?.data?.message || "Server Error, try again later."
      );
      return false;
    }
  };

  const viewSingleMonitorController = async (monitorId) => {
    try {
      setMonitorDetail(null);
      const { data } = await api.get(
        `/api/monitors/single-monitor/${monitorId}`
      );
      if (data?.success) {
        setMonitorDetail(data?.monitor);
      }
    } catch (error) {
      console.log(
        "Error occur in viewSingleMonitorController: ",
        error.message
      );
      notifyError(
        error?.response?.data?.message || "Server Error, try again later."
      );
    }
  };

  const monitorHistoryController = async (monitorId) => {
    try {
      const { data } = await api.get(
        `/api/monitors/monitor-history/${monitorId}`
      );
      if (data?.success) {
        setAllMonitorHistory(data?.history);
      }
    } catch (error) {
      console.log("Error occur in monitorHistoryController: ", error.message);
      notifyError(
        error?.response?.data?.message || "Server Error, try again later."
      );
    }
  };

  const deleteMonitorController = async (monitorId) => {
    try {
      const { data } = await api.delete(
        `/api/monitors/delete-monitor/${monitorId}`
      );
      if (data?.success) {
        notifySuccess(data?.message);
        setAllMonitors((prev) =>
          prev.filter((monitor) => monitor?._id !== monitorId)
        );
        navigate("/monitors");
      }
    } catch (error) {
      console.log("Error occur in deleteMonitorController: ", error.message);
      notifyError(
        error?.response?.data?.message || "Server Error, try again later."
      );
    }
  };

  const value = {
    //User Controllers
    signupController,
    loginController,
    logoutController,
    authUser,
    loading,
    loadingAuth,
    editUserController,
    deleteUserController,

    //Monitor controllers
    allMonitorsController,
    allMonitors,
    addMonitorController,
    viewSingleMonitorController,
    monitorDetail,
    monitorHistoryController,
    monitorHistory,
    deleteMonitorController,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
