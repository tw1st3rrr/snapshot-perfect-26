import { ReactNode } from "react";
import TabBar from "./TabBar";
import MenuButton from "./MenuButton";

interface PageLayoutProps {
  children: ReactNode;
  showMenu?: boolean;
  title?: string;
}

const PageLayout = ({ children, showMenu = true, title }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background overflow-y-auto">
      {showMenu && (
        <div className="fixed top-4 right-4 z-50">
          <MenuButton />
        </div>
      )}
      <main className="pb-24 bg-background">{children}</main>
      <TabBar />
    </div>
  );
};

export default PageLayout;
