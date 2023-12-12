import React from "react";
import Layout from "./components/Layout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Tasks from "./pages/Tasks.tsx";
import FAQ from "./pages/FAQ.tsx";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Layout tabIndex={0}><Dashboard/></Layout>}>
        </Route>
        <Route exact path="/tasks" element={<Layout tabIndex={1}><Tasks/></Layout>}>
        </Route>
        <Route exact path="/faq" element={<Layout tabIndex={2}><FAQ/></Layout>}>
        </Route>
      </Routes>
    </Router>
  );
}
