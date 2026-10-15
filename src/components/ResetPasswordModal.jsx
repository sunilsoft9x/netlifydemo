import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function ResetPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const { resetPassword } = useAuth();

  if (!isOpen) return null;

  const handleReset = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setSubmitting(true);
    try {
      await resetPassword(email);
      setStatus({
        type: "success",
        message: "Password reset instructions sent. Please check your inbox.",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message.replace("Firebase: ", ""),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-slate-100">
        <h3 className="text-lg font-bold text-slate-900">Reset Password</h3>
        <p className="mt-1 text-xs text-slate-500 leading-relaxed">
          Enter the email associated with your account to receive a secure recovery link.
        </p>

        {status.message && (
          <div
            className={`mt-4 rounded-lg p-3 text-xs leading-relaxed ${
              status.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleReset} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
              Registered Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 active:scale-95 disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
