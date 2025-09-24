import Layout from "@/layout/Layout";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AuthPage() {
  const [params] = useSearchParams();
  const mode = params.get("mode") === "signup" ? "signup" : "signin";
  const nextParam = params.get("next") || "/";
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"client" | "advisor">("client");
  const navigate = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    login(email || `${name}@example.com`, name || "User", role);

    try {
      const url = new URL(nextParam, window.location.origin);
      // Only navigate within the app
      if (url.origin === window.location.origin) {
        navigate(url.pathname + url.search + url.hash);
        return;
      }
    } catch (e) {
      // ignore — fallback to root
    }

    navigate("/");
  }

  return (
    <Layout>
      <div className="container py-20">
        <div className="mx-auto max-w-md space-y-6 rounded-lg border bg-card p-6">
          <h2 className="text-2xl font-bold">{mode === "signup" ? "Create account" : "Sign in"}</h2>
          <form onSubmit={submit} className="grid gap-3">
            <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="flex gap-2">
              <Button variant={role === "client" ? "default" : "outline"} onClick={() => setRole("client")} type="button">I'm a Client</Button>
              <Button variant={role === "advisor" ? "default" : "outline"} onClick={() => setRole("advisor")} type="button">I'm an Advisor</Button>
            </div>
            <Button type="submit">{mode === "signup" ? "Create account" : "Sign in"}</Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
