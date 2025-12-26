import React from "react";
import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";

export default function Home() {
  const nav = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f7fb" }}>
      <Topbar title="MentorConnect" subtitle="Mentoring • Performance Tracking • Feedback Loop" />

      <Box
        sx={{
          py: 6,
          background:
            "radial-gradient(1200px 600px at 20% 10%, rgba(59,130,246,.25) 0%, rgba(124,58,237,.15) 35%, rgba(236,72,153,.10) 65%, transparent 70%)",
        }}
      >
        <Container maxWidth="lg">
          <Card
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              border: "1px solid #e9e9f3",
              boxShadow: "0 12px 40px rgba(20,20,43,.10)",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h3" sx={{ fontWeight: 900 }}>
                MentorConnect
              </Typography>

              <Typography sx={{ mt: 1.5, color: "text.secondary", fontSize: "1.08rem", maxWidth: 900 }}>
                A full-stack mentoring platform that assigns students to mentors, tracks semester performance, and enables
                feedback-driven improvement — with admin visibility across mentors, students, and progress.
              </Typography>

              <Box sx={{ mt: 4, display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2 }}>
                <Card sx={{ borderRadius: 3, border: "1px solid #eef0ff" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                      Student Portal
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
                      View performance records and submit mentor feedback.
                    </Typography>
                    <Button sx={{ mt: 2 }} fullWidth variant="contained" onClick={() => nav("/login?role=STUDENT")}>
                      Continue as Student →
                    </Button>
                  </CardContent>
                </Card>

                <Card sx={{ borderRadius: 3, border: "1px solid #eef0ff" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                      Mentor Portal
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
                      See assigned students, review performance, and view feedback.
                    </Typography>
                    <Button
                      sx={{ mt: 2 }}
                      fullWidth
                      variant="contained"
                      color="secondary"
                      onClick={() => nav("/login?role=MENTOR")}
                    >
                      Continue as Mentor →
                    </Button>
                  </CardContent>
                </Card>

                <Card sx={{ borderRadius: 3, border: "1px solid #eef0ff" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                      Admin Portal
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
                      Full visibility: mentors, students, feedback, and performance.
                    </Typography>
                    <Button sx={{ mt: 2 }} fullWidth variant="outlined" onClick={() => nav("/login?role=ADMIN")}>
                      Continue as Admin →
                    </Button>
                  </CardContent>
                </Card>
              </Box>

              <Typography variant="caption" sx={{ display: "block", mt: 3, color: "text.secondary" }}>
                Login uses your MySQL <b>users</b> table via <code>/api/login</code>.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}