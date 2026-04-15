import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App";
import "antd/dist/reset.css";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#90b7ff",
          colorText: "#f7f9ff",
          colorTextSecondary: "rgba(214, 225, 255, 0.7)",
          colorBgContainer: "rgba(255, 255, 255, 0.04)",
          colorBorderSecondary: "rgba(255, 255, 255, 0.1)",
          borderRadius: 24,
          borderRadiusLG: 28,
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
        components: {
          Button: {
            controlHeight: 56,
            fontWeight: 700,
          },
          Card: {
            bodyPadding: 28,
          },
          Input: {
            controlHeight: 58,
          },
          Result: {
            titleFontSize: 26,
          },
          Tag: {
            borderRadiusSM: 999,
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
