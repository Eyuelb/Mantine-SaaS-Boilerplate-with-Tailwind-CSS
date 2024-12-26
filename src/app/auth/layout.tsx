import React, { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className=" min-h-screen flex items-center justify-center px-6">
      {children}
    </div>
  );
};

export default Layout;
