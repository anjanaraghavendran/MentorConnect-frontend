import React, { useState } from "react";
import { Box, Button, Card, CardContent, Container, Divider, TextField, Typography } from "@mui/material";
import Topbar from "../components/Topbar";
import api from "../api/api";

export default function MentorDashboard() {
  const [mentorId, setMentorId] = useState("");
  const [students, setStudents] = useState([]);
  const [perfMap, setPerfMap] = useState({});
  const [feedback, setFeedback] = useState([]);

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const load = async () => {
    if (!mentorId) return;

    // students under mentor
    const s = await api.get(`/api/admin/mentors/${mentorId}/students`);
    setStudents(s.data);

    // feedback for mentor
    const f = await api.get(`/api/mentor/${mentorId}/feedback`);
    setFeedback(f.data);

    // performance for each student
    const map = {};
    for (const st of s.data) {
      const p = await api.get(`/api/admin/performance/student/${st.studentId}`);
      map[st.studentId] = p.data;
    }
    setPerfMap(map);
  };

  const addTodo = () => {
    if (!todo.trim()) return;
    setTodos([...todos, todo.trim()]);
    setTodo("");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f7fb" }}>
      <Topbar title="Mentor Dashboard" subtitle="My students • Performance • Feedback • Productivity" />

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Card sx={{ borderRadius: 3, mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>Enter Mentor ID</Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <TextField label="Mentor ID (e.g., 2,3,4,5,6)" value={mentorId} onChange={(e) => setMentorId(e.target.value)} />
              <Button variant="contained" onClick={load}>Load My Data</Button>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.25fr .75fr" }, gap: 2 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>My Students</Typography>
              <Divider sx={{ mb: 2 }} />

              {!students.length && <Typography sx={{ color: "text.secondary" }}>Enter mentorId and click Load.</Typography>}

              {students.map((s) => (
                <Box key={s.studentId} sx={{ mb: 2, p: 1.5, borderRadius: 2, bgcolor: "#fff", border: "1px solid #eee" }}>
                  <Typography><b>#{s.studentId} {s.name}</b> • {s.department} • year {s.year}</Typography>

                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    Performance (DB)
                  </Typography>

                  {(perfMap[s.studentId] || []).map((p) => (
                    <Typography key={p.performanceId} sx={{ ml: 1 }}>
                      Sem {p.semester}: CGPA {p.cgpa} • Attendance {p.attendancePercentage}% • {p.remarks}
                    </Typography>
                  ))}
                </Box>
              ))}
            </CardContent>
          </Card>

          <Box sx={{ display: "grid", gap: 2 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>Feedback Given To Me </Typography>
                <Divider sx={{ mb: 2 }} />
                {!feedback.length && <Typography sx={{ color: "text.secondary" }}>No feedback loaded yet.</Typography>}
                {feedback.slice(0, 10).map((f) => (
                  <Box key={f.feedbackId} sx={{ mb: 1.2, p: 1.2, borderRadius: 2, bgcolor: "#fff", border: "1px solid #eee" }}>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      student #{f.studentId}
                    </Typography>
                    <Typography sx={{ fontWeight: 700 }}>{f.feedback}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>Productivity </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField size="small" label="Add task" value={todo} onChange={(e) => setTodo(e.target.value)} />
                  <Button variant="contained" onClick={addTodo}>Add</Button>
                </Box>
                <Box sx={{ mt: 2 }}>
                  {todos.map((t, i) => <Typography key={i}>✅ {t}</Typography>)}
                  {!todos.length && <Typography sx={{ color: "text.secondary" }}>Add tasks to plan mentoring sessions.</Typography>}
                </Box>

                <Typography sx={{ mt: 2, color: "text.secondary" }}>
                  Tip: review CGPA trend, then set one goal per student.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}