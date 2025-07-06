import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          name: name.trim()
        }
      }
    });
    
    if (error) {
      setError(error.message);
    } else {
      alert("Registration complete! You can now log in.");
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-8 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="w-full p-2 border mb-4"
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="w-full p-2 border mb-4"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full p-2 border mb-4"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="w-full bg-green-600 text-white py-2">Register</button>
      <p className="mt-4 text-sm">
        Already have an account? <Link to="/login" className="text-green-600">Login here</Link>
      </p>
    </form>
  );
}
