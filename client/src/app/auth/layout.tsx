const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-[100vh] w-[100vw] flex items-center justify-center flex-col">
      {children}
    </div>
  );
};

export default Layout;
