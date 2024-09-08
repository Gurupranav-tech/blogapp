import useLocalStorage from "@/lib/useLocalStorage";
import React, { createContext, useContext, useEffect, useState } from "react";
import Request from "@/lib/Requests";

const context = createContext({
  token: "",
  username: "",
  email: "",
  setUser(_email: string, _username: string) {},
  setToken(_token: string) {},
});

export function useAuth() {
  return useContext(context);
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useLocalStorage("token", "");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!token) {
      setUsername("");
      setEmail("");
      return;
    }
    Request.GET("/auth/me", { authorization: `Bearer ${token}` }).then(
      (res) => {
        setUsername(res.data.name);
        setEmail(res.data.email);
      }
    );
  }, [token]);

  const values = {
    token,
    username,
    email,
    setUser(email: string, username: string) {
      setEmail(email);
      setUsername(username);
    },
    setToken(token: string) {
      setToken(token);
    },
  };

  return <context.Provider value={values}>{children}</context.Provider>;
}
