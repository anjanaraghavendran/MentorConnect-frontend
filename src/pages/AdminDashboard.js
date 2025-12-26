import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Card, CardContent, Container, Divider, MenuItem, TextField, Typography } from "@mui/material";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import api from "../api/api";

export default function AdminDashboard() {
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [feedbackAll, setFeedbackAll] = useState([]);

  const [selectedMentorId, setSelectedMentorId] = useState("");
  const [mentorStudents, setMentorStudents] = useState([]);

  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [studentPerf, setStudentPerf] = useState([]);

  const [noticeDraft, setNoticeDraft] = useState("");
  const [noticeShown, setNoticeShown] = useState("");

  const loadBase = async () => {
    const m = await api.get("/api/admin/mentors");
    const s = await api.get("/api/admin/students");
    const f = await api.get("/api/admin/feedback");
    setMentors(m.data);
    setStudents(s.data);
    setFeedbackAll(f.data);
  };

  useEffect(() => { loadBase(); }, []);

  const loadMentorStudents = async (mid) => {
    const res = await api.get(`/api/admin/mentors/${mid}/students`);
    setMentorStudents(res.data);
  };

  const loadStudentPerf = async (sid) => {
    const res = await api.get(`/api/admin/performance/student/${sid}`);
    setStudentPerf(res.data);
  };

  const avgRating = useMemo(() => {
    if (!mentors.length) return "—";
    const sum = mentors.reduce((a, m) => a + Number(m.mentorRating || 0), 0);
    return (sum / mentors.length).toFixed(2);
  }, [mentors]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f7fb" }}>
      <Topbar title="Admin Dashboard" subtitle="Manage mentors, students, feedback, and performance" />

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4,1fr)" }, gap: 2, mb: 2 }}>
          <StatCard label="Total Mentors" value={mentors.length} />
          <StatCard label="Total Students" value={students.length} />
          <StatCard label="Feedback Entries" value={feedbackAll.length} />
          <StatCard label="Avg Mentor Rating" value={avgRating} />
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.1fr .9fr" }, gap: 2 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>Mentors</Typography>
              {mentors.map((m) => (
                <Typography key={m.mentorId} sx={{ mb: .5 }}>
                  <b>#{m.mentorId}</b> {m.name} • {m.department} • rating {m.mentorRating}
                </Typography>
              ))}
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>Students</Typography>
              {students.slice(0, 12).map((s) => (
                <Typography key={s.studentId} sx={{ mb: .5 }}>
                  <b>#{s.studentId}</b> {s.name} • {s.department} • year {s.year}
                </Typography>
              ))}
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Showing 12 of {students.length}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>Mentor → Assigned Students</Typography>
              <TextField
                select
                fullWidth
                label="Select Mentor"
                value={selectedMentorId}
                onChange={(e) => {
                  setSelectedMentorId(e.target.value);
                  if (e.target.value) loadMentorStudents(e.target.value);
                }}
                sx={{ mb: 2 }}
              >
                <MenuItem value="">-- Select --</MenuItem>
                {mentors.map((m) => (
                  <MenuItem key={m.mentorId} value={m.mentorId}>
                    {m.mentorId} — {m.name} ({m.mentorRating})
                  </MenuItem>
                ))}
              </TextField>

              {mentorStudents.map((s) => (
                <Typography key={s.studentId}>
                  #{s.studentId} <b>{s.name}</b> • {s.department} • year {s.year}
                </Typography>
              ))}
              {!mentorStudents.length && <Typography sx={{ color: "text.secondary" }}>Select a mentor to view students.</Typography>}
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>Student Performance Lookup</Typography>
              <TextField
                select
                fullWidth
                label="Select Student"
                value={selectedStudentId}
                onChange={(e) => {
                  setSelectedStudentId(e.target.value);
                  if (e.target.value) loadStudentPerf(e.target.value);
                }}
                sx={{ mb: 2 }}
              >
                <MenuItem value="">-- Select --</MenuItem>
                {students.map((s) => (
                  <MenuItem key={s.studentId} value={s.studentId}>
                    {s.studentId} — {s.name}
                  </MenuItem>
                ))}
              </TextField>

              {studentPerf.map((p) => (
                <Box key={p.performanceId} sx={{ mb: 1, p: 1.2, borderRadius: 2, bgcolor: "#fff", border: "1px solid #eee" }}>
                  <Typography><b>Sem {p.semester}</b> • CGPA {p.cgpa} • Attendance {p.attendancePercentage}%</Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>{p.remarks}</Typography>
                </Box>
              ))}
              {!studentPerf.length && <Typography sx={{ color: "text.secondary" }}>Pick a student to view records.</Typography>}
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 3, gridColumn: { xs: "1", md: "1 / span 2" } }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>All Feedback</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 1.5 }}>
                {feedbackAll.slice(0, 12).map((f) => (
                  <Box key={f.feedbackId} sx={{ p: 1.5, borderRadius: 2, bgcolor: "#fff", border: "1px solid #eee" }}>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      mentor #{f.mentorId} • student #{f.studentId}
                    </Typography>
                    <Typography sx={{ fontWeight: 700 }}>{f.feedback}</Typography>
                  </Box>
                ))}
              </Box>
              <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 1 }}>
                Showing 12 of {feedbackAll.length}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 3, gridColumn: { xs: "1", md: "1 / span 2" } }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>Notice of the Day</Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <TextField
                  fullWidth
                  label="Type a notice"
                  value={noticeDraft}
                  onChange={(e) => setNoticeDraft(e.target.value)}
                />
                <Button variant="contained" onClick={() => setNoticeShown(noticeDraft)}>
                  Publish
                </Button>
                <Button variant="outlined" onClick={() => { setNoticeDraft(""); setNoticeShown(""); }}>
                  Clear
                </Button>
              </Box>

              {noticeShown && (
                <Typography sx={{ mt: 2 }}>
                  📢 <b>Notice:</b> {noticeShown}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}