import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import FAQ from "./pages/FAQ";
import TaskInfo from "./pages/TaskInfo";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout tabIndex={0}><Dashboard /></Layout>}
        />
        <Route
          path="/tasks"
          element={<Layout tabIndex={1}><Tasks /></Layout>}
        />
        <Route
          path="/faq"
          element={<Layout tabIndex={2}><FAQ /></Layout>}
        />
        <Route
          path="/tasks/:taskId"
          element={<Layout tabIndex={1}><TaskInfo /></Layout>}
        />
      </Routes>
    </Router>
  );
}
