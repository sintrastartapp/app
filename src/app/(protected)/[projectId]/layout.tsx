import { Sidebar } from "../components/sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="h-screen max-h-screen flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
