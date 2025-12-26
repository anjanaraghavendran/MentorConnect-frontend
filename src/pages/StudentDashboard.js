import React, { useState } from "react";
import { Box, Button, Card, CardContent, Container, Divider, TextField, Typography } from "@mui/material";
import Topbar from "../components/Topbar";
import api from "../api/api";

export default function StudentDashboard() {
  const [studentId, setStudentId] = useState("");
  const [mentorId, setMentorId] = useState("");
  const [performance, setPerformance] = useState([]);

  const [feedbackText, setFeedbackText] = useState("");
  const [lastSubmitted, setLastSubmitted] = useState(null);

  const loadPerformance = async () => {
    if (!studentId) return;
    const res = await api.get(`/api/admin/performance/student/${studentId}`);
    setPerformance(res.data);
  };

  const submitFeedback = async () => {
    if (!studentId || !mentorId || !feedbackText.trim()) return;

    const res = await api.post("/api/student/feedback", {
      mentorId: Number(mentorId),
      studentId: Number(studentId),
      feedback: feedbackText,
    });

    setLastSubmitted(res.data);
    setFeedbackText("");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f7fb" }}>
      <Topbar title="Student Dashboard" subtitle="My performance • Feedback • Tips" />

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>Load My Performance</Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <TextField label="Student ID (e.g., 5..29)" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
                <Button variant="contained" onClick={loadPerformance}>Fetch</Button>
              </Box>

              <Divider sx={{ my: 2 }} />

              {performance.map((p) => (
                <Box key={p.performanceId} sx={{ mb: 1.2, p: 1.2, borderRadius: 2, bgcolor: "#fff", border: "1px solid #eee" }}>
                  <Typography><b>Semester {p.semester}</b></Typography>
                  <Typography>CGPA: {p.cgpa} • Attendance: {p.attendancePercentage}%</Typography>
                  <Typography sx={{ color: "text.secondary" }}>{p.remarks}</Typography>
                </Box>
              ))}
              {!performance.length && <Typography sx={{ color: "text.secondary" }}>Enter your studentId to view records.</Typography>}
            </CardContent>
          </Card>

          <Box sx={{ display: "grid", gap: 2 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>Give Feedback to Mentor (DB)</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                  For demo: enter your mentorId (from mentor table) and submit feedback.
                </Typography>

                <TextField fullWidth label="Mentor ID (e.g., 2..6)" value={mentorId} onChange={(e) => setMentorId(e.target.value)} sx={{ mb: 1.5 }} />
                <TextField
                  fullWidth
                  label="Feedback"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  sx={{ mb: 1.5 }}
                />
                <Button variant="contained" onClick={submitFeedback}>
                  Submit Feedback
                </Button>

                {lastSubmitted && (
                  <Typography sx={{ mt: 2, color: "text.secondary" }}>
                    ✅ Saved to DB (feedbackId: {lastSubmitted.feedbackId})
                  </Typography>
                )}
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>Tips & Quote </Typography>
                <Typography sx={{ fontStyle: "italic" }}>
                  “Small progress each day adds up to big results.”
                </Typography>
                <Typography sx={{ mt: 1, color: "text.secondary" }}>
                  Tip: Focus on attendance consistency + revise weak topics weekly.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}