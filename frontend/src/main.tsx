import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./Trail";
import { ConfigProvider } from "./context/configContext";
import { UserProvider } from "./context/userContext";
import Toolkits from "./pages/toolkits";
import "./index.css";
import Landing from "./Landing";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/trail" element={<App />} />
          <Route path="/toolkits" element={<Toolkits />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </ConfigProvider>
);
