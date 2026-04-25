import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Login from "./Login";
import Jobs from "./jobs";
import AddJob from "./AddJob";
import Header from "./Header";
import Footer from "./Footer";

axios.defaults.baseURL = "https://job-prep-tracker-backend.onrender.com";
axios.defaults.withCredentials = true;

/* ─── GLOBAL STYLES (inject once) ─────────────────────────────── */
const globalCSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: #f5f7fb;
    color: #1a1a1a;
    line-height: 1.5;
  }

  /* ── Panels ── */
  .jt-panel {
    background: #fff;
    border: 1px solid #e8eaed;
    border-radius: 12px;
    padding: 1.5rem;
  }

  .jt-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1rem;
    margin-bottom: 1.25rem;
    border-bottom: 1px solid #e8eaed;
  }

  .jt-panel-title {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
  }

  /* ── Section labels ── */
  .jt-section-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #6b7280;
    margin-bottom: 10px;
    margin-top: 1.25rem;
  }
  .jt-section-label:first-of-type { margin-top: 0; }

  .jt-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .jt-dot--high   { background: #ef4444; }
  .jt-dot--medium { background: #f97316; }
  .jt-dot--low    { background: #9ca3af; }

  /* ── Task cards ── */
  .jt-task-card {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.125rem;
    border: 1px solid #e8eaed;
    border-radius: 10px;
    margin-bottom: 8px;
    background: #fff;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .jt-task-card:last-child { margin-bottom: 0; }
  .jt-task-card:hover {
    border-color: #c7d2fe;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  }

  .jt-task-left  { flex: 1; min-width: 0; }
  .jt-task-right { flex-shrink: 0; text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }

  .jt-task-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 4px;
  }

  .jt-task-company { font-size: 14px; font-weight: 600; color: #111827; }

  .jt-badge {
    font-size: 11px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 6px;
  }
  .jt-badge--INTERVIEW { background: #ede9fe; color: #5b21b6; }
  .jt-badge--TEST      { background: #dbeafe; color: #1e40af; }
  .jt-badge--OTHER     { background: #dcfce7; color: #166534; }

  .jt-task-subject  { font-size: 13px; color: #4b5563; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .jt-task-snippet  { font-size: 12px; color: #9ca3af; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

  .jt-deadline { font-size: 12px; font-weight: 500; }
  .jt-deadline--HIGH   { color: #dc2626; }
  .jt-deadline--MEDIUM { color: #ea580c; }
  .jt-deadline--LOW    { color: #6b7280; }

  .jt-join-link { font-size: 12px; color: #2563eb; text-decoration: none; }
  .jt-join-link:hover { text-decoration: underline; }

  .jt-complete-btn {
    font-size: 12px; color: #16a34a;
    background: none; border: none; cursor: pointer; padding: 0;
  }
  .jt-complete-btn:hover { text-decoration: underline; }
  .jt-complete-btn:disabled { color: #9ca3af; cursor: default; }

  /* ── Sync button ── */
  .jt-sync-btn {
    background: #2563eb; color: #fff;
    border: none; border-radius: 8px;
    padding: 7px 14px; font-size: 13px; font-weight: 500;
    cursor: pointer; transition: background 0.15s;
  }
  .jt-sync-btn:hover:not(:disabled) { background: #1d4ed8; }
  .jt-sync-btn:disabled { background: #9ca3af; cursor: not-allowed; }

  /* ── Bottom grid ── */
  .jt-bottom-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1.25rem;
    align-items: start;
  }
  @media (max-width: 720px) {
    .jt-bottom-grid { grid-template-columns: 1fr; }
  }

  /* ── Status pills (jobs list) ── */
  .jt-status {
    font-size: 11px; font-weight: 500;
    padding: 3px 9px; border-radius: 100px;
    white-space: nowrap;
  }
  .jt-status--Applied   { background: #dbeafe; color: #1e40af; }
  .jt-status--Interview { background: #ede9fe; color: #5b21b6; }
  .jt-status--Offer     { background: #dcfce7; color: #166534; }
  .jt-status--Rejected  { background: #fee2e2; color: #991b1b; }

  /* ── Empty state ── */
  .jt-empty {
    text-align: center; padding: 3rem 1rem; color: #9ca3af;
  }
  .jt-empty p:first-child { font-size: 14px; margin-bottom: 4px; }
  .jt-empty p:last-child  { font-size: 12px; }
`;

if (typeof document !== "undefined" && !document.getElementById("jt-global-css")) {
  const style = document.createElement("style");
  style.id = "jt-global-css";
  style.textContent = globalCSS;
  document.head.appendChild(style);
}

/* ─── DATA FETCHING ────────────────────────────────────────────── */
const fetchTasks = async () => {
  const res = await axios.get("/api/tasks");
  return Array.isArray(res.data) ? res.data : res.data.tasks || [];
};

/* ─── TASK DASHBOARD ───────────────────────────────────────────── */
function TaskDashboard() {
  const { data: tasks = [], refetch, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  const [syncing, setSyncing] = useState(false);

  const syncGmail = async () => {
    setSyncing(true);
    try {
      const res = await axios.post("/api/tasks/sync");
      alert(`Found ${res.data.tasksFound} new tasks!`);
      refetch();
    } catch {
      alert("Sync failed. Please try again.");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="jt-panel">
      <div className="jt-panel-header">
        <span className="jt-panel-title">Upcoming tasks</span>
        <button className="jt-sync-btn" onClick={syncGmail} disabled={syncing}>
          {syncing ? "Syncing…" : "Sync Gmail"}
        </button>
      </div>

      {isLoading ? (
        <p style={{ textAlign: "center", color: "#9ca3af", padding: "2rem 0" }}>Loading tasks…</p>
      ) : (
        <TaskList tasks={tasks} onComplete={refetch} />
      )}
    </div>
  );
}

/* ─── TASK LIST ────────────────────────────────────────────────── */
function TaskList({ tasks, onComplete }) {
  const groups = [
    { key: "HIGH",   label: "Urgent — within 24h", dotClass: "jt-dot--high"   },
    { key: "MEDIUM", label: "This week",            dotClass: "jt-dot--medium" },
    { key: "LOW",    label: "Later",                dotClass: "jt-dot--low"    },
  ];

  const filtered = groups.map((g) => ({
    ...g,
    items: tasks.filter((t) => t.priority === g.key),
  })).filter((g) => g.items.length > 0);

  if (tasks.length === 0) {
    return (
      <div className="jt-empty">
        <p>No tasks found.</p>
        <p>Click "Sync Gmail" to fetch new emails.</p>
      </div>
    );
  }

  return (
    <>
      {filtered.map(({ key, label, dotClass, items }) => (
        <section key={key}>
          <div className="jt-section-label">
            <span className={`jt-dot ${dotClass}`} />
            {label}
          </div>
          {items.map((task) => (
            <TaskCard key={task.id} task={task} onComplete={onComplete} />
          ))}
        </section>
      ))}
    </>
  );
}

/* ─── TASK CARD ────────────────────────────────────────────────── */
function TaskCard({ task, onComplete }) {
  const [completing, setCompleting] = useState(false);

  const markComplete = async () => {
    setCompleting(true);
    try {
      await axios.patch(`/api/tasks/${task.id}/complete`);
      onComplete();
    } catch {
      alert("Failed to mark complete");
    } finally {
      setCompleting(false);
    }
  };

  const formatDeadline = (deadline) => {
    const diffMs = new Date(deadline) - new Date();
    const h = Math.floor(diffMs / 3_600_000);
    if (h < 0)  return "Overdue";
    if (h < 1)  return "Less than 1 hour";
    if (h < 24) return `In ${h} hour${h !== 1 ? "s" : ""}`;
    const d = Math.ceil(h / 24);
    return d === 1 ? "Tomorrow" : `In ${d} days`;
  };

  const badgeClass = `jt-badge jt-badge--${task.taskType || "OTHER"}`;

  return (
    <div className="jt-task-card">
      <div className="jt-task-left">
        <div className="jt-task-meta">
          <span className="jt-task-company">{task.companyName}</span>
          <span className={badgeClass}>{task.taskType}</span>
        </div>
        <p className="jt-task-subject">{task.subject}</p>
        {task.emailSnippet && (
          <p className="jt-task-snippet">{task.emailSnippet}</p>
        )}
      </div>

      <div className="jt-task-right">
        <span className={`jt-deadline jt-deadline--${task.priority}`}>
          {formatDeadline(task.deadline)}
        </span>

        {task.meetingLink && (
          <a
            href={task.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="jt-join-link"
          >
            Join meeting ↗
          </a>
        )}

        <button
          className="jt-complete-btn"
          onClick={markComplete}
          disabled={completing}
        >
          {completing ? "Completing…" : "✓ Mark complete"}
        </button>
      </div>
    </div>
  );
}

/* ─── DASHBOARD PAGE ───────────────────────────────────────────── */
function Dashboard() {
  const [reload, setReload] = useState(false);
  const refreshJobs = () => setReload((r) => !r);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f5f7fb" }}>
      <Header />

      <main style={{ flex: 1, maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem", width: "100%", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>Dashboard</h1>

        <TaskDashboard />

        
          {/* <AddJob onJobAdded={refreshJobs} /> */}
          
      </main>

      <Footer />
    </div>
  );
}

function JobsPage() {
  const [reload, setReload] = useState(false);
  const refreshJobs = () => setReload((r) => !r);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f5f7fb" }}>
      <Header />

      <main style={{ flex: 1, maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem", width: "100%", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Jobs</h1>

        <div className="jt-bottom-grid">
          <AddJob onJobAdded={refreshJobs} />
          <Jobs key={reload} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ─── APP ROUTER ───────────────────────────────────────────────── */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<JobsPage />} />  {/* NEW ROUTE */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
