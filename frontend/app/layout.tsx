import "./globals.css";
import AuthWrapper from "@/components/AuthWrapper";

export const metadata = {
  title: "RJS Homes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AuthWrapper>{children}</AuthWrapper>
      </body>
    </html>
  );
}
