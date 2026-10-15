import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";

function MainContent() {
  const { currentUser } = useAuth();

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      {currentUser ? <Dashboard /> : <AuthForm />}
    </main>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
