import FormInput from "@/components/FormInput";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Request from "@/lib/Requests";
import { useAuth } from "@/contexts/Auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type UserData = {
  email: string;
  password: string;
};

export default function Login() {
  const [formData, setFormData] = useState<UserData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const { token, email, username, setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && email && username) navigate("/");
  }, [token, email, username]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Request.POST(
        "/auth/login",
        {},
        {
          email: formData["email"],
          password: formData["password"],
        }
      );
      setToken(response.data);
      setLoading(false);
      setError("");
      toast.success("Logged In!");
    } catch (err: any) {
      setError(err.response?.data.message as any);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((p) => ({ ...p, [e.target.id.toLowerCase()]: e.target.value }));

  return (
    <div className="md:min-w-[400px] min-w-[300px] absolute top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%] border-2 border-black rounded-lg p-5">
      <form onSubmit={handleSubmit}>
        <div className="border-b-2 border-black text-center">
          <h1 className="text-4xl font-bold mb-2">Log In</h1>
        </div>
        <div className="mt-1 text-red-600">
          <p>{error}</p>
        </div>
        <div className="mt-4 grid gap-2">
          <FormInput
            value={formData["email"]}
            handleChange={handleChange}
            name="Email"
            type="email"
            required
          />
          <FormInput
            value={formData["password"]}
            handleChange={handleChange}
            name="Password"
            type="password"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: loading ? 1 : 1.1 }}
          whileTap={{ scale: loading ? 1 : 0.9 }}
          className="bg-black text-white disabled:bg-gray-600 w-full text-center rounded-lg mt-4 py-3 text-xl"
        >
          Log In
        </motion.button>
      </form>
      <p className="mt-1 text-gray-500">
        Don't have an account?{" "}
        <Link to="/signin" className="text-blue-600">
          Sign In
        </Link>
      </p>
    </div>
  );
}
