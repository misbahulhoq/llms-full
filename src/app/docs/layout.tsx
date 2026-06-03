import Sidebar from "@/components/layout/sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex gap-5">
      <div>
        <Sidebar />
      </div>

      <div className="flex-1">{children}</div>
    </main>
  );
};

export default Layout;
