import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { AppShell } from "./app/App";
import { PreferencesProvider } from "./app/providers/PreferencesProvider";
import "./styles/tokens.css";
import "./styles/global.css";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f1115" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <PreferencesProvider>
      <AppShell>
        <Outlet />
      </AppShell>
    </PreferencesProvider>
  );
}
