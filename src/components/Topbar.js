import React from "react";
import { AppBar, Box, Button, Chip, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Topbar({ title, subtitle }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  const dashboardPath =
    user?.role === "ADMIN"
      ? "/admin"
      : user?.role === "MENTOR"
      ? "/mentor"
      : user?.role === "STUDENT"
      ? "/student"
      : "/";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background:
          "linear-gradient(90deg, #2563eb 0%, #7c3aed 55%, #ec4899 100%)",
        borderBottom: "1px solid rgba(255,255,255,.2)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            {title || "MentorConnect"}
          </Typography>
          {subtitle && (
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,.85)" }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
          <Button
            size="small"
            variant={loc.pathname === "/" ? "contained" : "outlined"}
            sx={{
              color: "#fff",
              borderColor: "rgba(255,255,255,.45)",
              bgcolor: loc.pathname === "/" ? "rgba(255,255,255,.18)" : "transparent",
            }}
            onClick={() => nav("/")}
          >
            Home
          </Button>

          {user && (
            <Button
              size="small"
              variant={loc.pathname === dashboardPath ? "contained" : "outlined"}
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,.45)",
                bgcolor: loc.pathname === dashboardPath ? "rgba(255,255,255,.18)" : "transparent",
              }}
              onClick={() => nav(dashboardPath)}
            >
              Dashboard
            </Button>
          )}

          {user?.email && (
            <Chip
              label={`${user.email} • ${user.role}`}
              sx={{
                bgcolor: "rgba(255,255,255,.18)",
                color: "#fff",
                fontWeight: 700,
              }}
            />
          )}

          {user && (
            <Button
              size="small"
              variant="contained"
              sx={{ bgcolor: "rgba(0,0,0,.22)" }}
              onClick={() => {
                logout();
                nav("/");
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}