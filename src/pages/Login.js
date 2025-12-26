import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Box, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Login() {
  const q = useQuery();
  const portalRole = q.get("role"); // ADMIN | MENTOR | STUDENT
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await api.post("/api/login", { email, password });
      const user = res.data;

      if (portalRole && user.role !== portalRole) {
        setErr(`This account is ${user.role}. Please use the correct portal.`);
        return;
      }

      login(user);
      if (user.role === "ADMIN") nav("/admin");
      else if (user.role === "MENTOR") nav("/mentor");
      else nav("/student");
    } catch {
      setErr("Invalid credentials. Check email/password in the users table.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f6f7fb" }}>
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              Login
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 3 }}>
              {portalRole ? `Portal: ${portalRole}` : "Select a portal from Home for a cleaner demo."}
            </Typography>

            {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}

            <form onSubmit={submit}>
              <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
              <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />
              <Button type="submit" variant="contained" fullWidth size="large">
                Sign In
              </Button>
            </form>

            <Typography variant="caption" sx={{ display: "block", mt: 2, color: "text.secondary" }}>
              Backend: http://localhost:8080
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}