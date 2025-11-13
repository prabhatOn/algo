import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { CustomizerContextProvider } from "./components/context/CustomizerContext";
import { AuthProvider } from "./app/AuthProvider";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ToastProvider from "./contexts/ToastContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <CustomizerContextProvider>
        <BrowserRouter>
          <AuthProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </AuthProvider>
        </BrowserRouter>
      </CustomizerContextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
