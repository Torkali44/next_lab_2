"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { FacebookIcon, GitHubIcon, GoogleIcon } from "@/components/OAuthIcons";

export default function AuthButtons() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (status === "loading") {
    return <div className="auth-panel text-muted">Checking session...</div>;
  }

  if (session) {
    return (
      <div className="auth-panel">
        <div className="actions-row">
          <span className="badge">Signed in as {session.user?.name || session.user?.email}</span>
          <button type="button" className="btn btn-outline" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-panel">
      <p className="text-muted">Sign in to unlock full CRUD and all products.</p>

      <form
        className="auth-form-stack"
        onSubmit={(event) => {
          event.preventDefault();
          signIn("credentials", { username, password, callbackUrl: "/products" });
        }}
      >
        <input
          className="input"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" className="btn btn-primary auth-demo-btn">
          Demo sign in
        </button>
      </form>

      <div className="auth-divider">
        <span>or continue with</span>
      </div>

      <div className="auth-oauth-list">
        <button
          type="button"
          className="oauth-btn oauth-btn-github"
          onClick={() => signIn("github")}
        >
          <GitHubIcon />
          <span>Sign in with GitHub</span>
        </button>

        <button
          type="button"
          className="oauth-btn oauth-btn-google"
          onClick={() => signIn("google")}
        >
          <GoogleIcon />
          <span>Sign in with Google</span>
        </button>

        <button
          type="button"
          className="oauth-btn oauth-btn-facebook"
          onClick={() => signIn("facebook")}
        >
          <FacebookIcon />
          <span>Sign in with Facebook</span>
        </button>
      </div>
    </div>
  );
}
