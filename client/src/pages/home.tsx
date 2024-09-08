import { useAuth } from "@/contexts/Auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { email, username, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!email || !username || !token) navigate("/login");
  }, [email]);

  return <>Home</>;
}
