import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext.jsx";
import { UserCircle } from "lucide-react";
import UpdateProfileModal from "./UpdateProfileModal.jsx";

export default function Profile() {
  const { authUser, deleteUserController } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="max-w-225 mx-auto py-10">
        <h1 className="text-[24px] text-[#333333] font-semibold">
          Your Account
        </h1>

        <div className="mt-12 flex items-center justify-between rounded-xl bg-white border border-gray-200 shadow-sm px-8 py-10">
          {/* Left */}
          <div className="flex items-center gap-5">
            <UserCircle size={65} className="text-blue-600" />

            <div className="flex flex-col gap-1 text-gray-600">
              <p className="font-medium text-gray-800">{authUser?.user}</p>
              <p>{authUser?.email}</p>
              <p className="text-sm">
                Member Since:{" "}
                {authUser?.createdAt
                  ? new Date(authUser.createdAt).toLocaleDateString([], {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "-"}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-3">
            <button
              className="
            px-5 py-2 rounded-lg border border-blue-600 text-blue-600
            hover:bg-blue-600 hover:text-white hover:border-blue-600
          transition-colors duration-200 cursor-pointer
        "
              onClick={() => setOpenModal(true)}
            >
              Edit Profile
            </button>

            <button
              className="
            px-5 py-2 rounded-lg border border-blue-600 text-blue-600
            hover:bg-blue-600 hover:text-white hover:border-blue-600
            transition-colors duration-200 cursor-pointer tooltip
            "
              data-tip="Deleting your account will permanently remove all your data, including monitors and history. This action cannot be undone."
              onClick={deleteUserController}
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>
      {openModal && (
        <UpdateProfileModal
          onClose={() => setOpenModal(false)}
          authUser={authUser}
        />
      )}
    </>
  );
}
