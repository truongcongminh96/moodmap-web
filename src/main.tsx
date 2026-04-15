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
          colorPrimary: "var(--accent)",
          colorText: "var(--text-strong)",
          colorTextSecondary: "var(--text-soft)",
          colorTextTertiary: "var(--text-muted)",
          colorBgContainer: "var(--card-background)",
          colorBgElevated: "var(--card-background-strong)",
          colorBorderSecondary: "var(--card-border)",
          colorFillSecondary: "var(--tile-tint)",
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
