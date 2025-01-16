"use client";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="md:p-4 lg:p-5 xl:p-6 2xl:p-7 p-3">{children}</div>;
};

export default Layout;
