import React from "react";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {

  return ( 
      <div className="flex h-screen flex-col flex-1">
        <Header />
        <main className="hide-scrollbar flex-1 overflow-x-hidden overflow-y-auto bg-slate-300 p-6">
          {children}
        </main>
      </div> 
  );
};

export default Layout;
