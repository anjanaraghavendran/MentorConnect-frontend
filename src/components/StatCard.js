import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function StatCard({ label, value, sub }) {
  return (
    <Card sx={{ borderRadius: 3, border: "1px solid #e8e8f0" }}>
      <CardContent>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {label}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5 }}>
          {value}
        </Typography>
        {sub && (
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            {sub}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}