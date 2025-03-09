import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { showPassword } from "../utils/functions";

const Login: React.FC = () => {
        const [values, setValues] = useState({ email: "", password: "" });
        const { login } = useAuth(); 
        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const { isAuthenticated } = useAuth();

        if (isAuthenticated) {
          return <Navigate to="/store" replace />;
        }
      
        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setLoading(true);
          setError(null);
      
          try {
            await login(values.email, values.password); 
            navigate('/store')
          } catch (err) {
            setError("Invalid credentials");
          } finally {
            setLoading(false);
          }
        };
      
        return (
          <div className="w-screen h- flex items-start justify-center">
            <form className="flex flex-col w-80 gap-4" onSubmit={handleSubmit}>
              <input
                required
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                className="border-[1px] p-3 rounded-xl"
              />
              <input
                required
                id="password"
                type="password"
                placeholder="Password"
                className="border-[1px] p-3 rounded-xl"
                value={values.password}
                onChange={(e) => setValues({ ...values, password: e.target.value })}
              />
              <p className="text-sm flex gap-1">
                <input
                  type="checkbox"
                  onClick={() =>
                    showPassword(document.getElementById("password") as HTMLInputElement)
                  }
                />
                Show Password
              </p>
              {error && <p className="text-xs text-red-600">{error}</p>}
              <button type="submit" className="bg-blue-500 text-white p-3 rounded-xl">
                {loading ? "Loading..." : "Login"}
              </button>
            </form>
          </div>
        );
      };
      

export default Login;

