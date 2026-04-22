import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }: any) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />
        <div className="page">{children}</div>
      </div>
    </div>
  );
}
