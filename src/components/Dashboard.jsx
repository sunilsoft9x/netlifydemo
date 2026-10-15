import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { currentUser, logout, updateUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [notice, setNotice] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setNotice("");
    try {
      await updateUserProfile({ displayName });
      setNotice("Profile updated successfully.");
      setIsEditing(false);
    } catch (err) {
      setNotice(err.message.replace("Firebase: ", ""));
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center text-center">
        {currentUser?.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt="User Avatar"
            className="h-20 w-20 rounded-full object-cover ring-4 ring-blue-50"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
            {currentUser?.email?.[0].toUpperCase()}
          </div>
        )}

        <h2 className="mt-4 text-xl font-bold text-slate-900">
          {currentUser?.displayName || "Workspace Member"}
        </h2>
        <p className="text-xs text-slate-500">{currentUser?.email}</p>
      </div>

      {notice && (
        <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 p-2 text-center text-xs text-blue-700">
          {notice}
        </div>
      )}

      <div className="mt-6 border-t border-slate-100 pt-4">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full py-2 text-xs font-medium text-blue-600 hover:text-blue-700 transition cursor-pointer"
          >
            Edit Display Name
          </button>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-3">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter full name"
              className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {updating ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-3 text-left font-mono text-xs text-slate-600 space-y-1">
        <p>
          <span className="font-semibold text-slate-800">UID: </span>
          <span className="break-all">{currentUser?.uid}</span>
        </p>
        <p>
          <span className="font-semibold text-slate-800">Provider: </span>
          {currentUser?.providerData[0]?.providerId || "password"}
        </p>
      </div>

      <button
        onClick={logout}
        className="mt-6 w-full rounded-lg bg-slate-900 py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-slate-800 active:scale-[0.99] cursor-pointer"
      >
        Sign Out
      </button>
    </div>
  );
}
