import { HideSidebarLayoutClient } from "@/components/Layouts/HideSidebarLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HideSidebarLayoutClient>{children}</HideSidebarLayoutClient>;
}
