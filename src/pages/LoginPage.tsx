import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-8 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Log in</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="w-full p-2 border mb-4"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full p-2 border mb-4"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-full bg-blue-600 text-white py-2">Log in</button>
        <p className="mt-4 text-sm">
            Don't have an account? <a href="/register" className="text-blue-600">Register here</a>
        </p>
    </form>
  );
}
