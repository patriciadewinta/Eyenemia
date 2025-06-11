import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-noise"></div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;