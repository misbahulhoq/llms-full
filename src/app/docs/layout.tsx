import React from "react";
import Sidebar from "@/components/layout/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-[calc(100vh-60px)] gap-5 overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">{children}</div>
    </main>
  );
};

export default Layout;
