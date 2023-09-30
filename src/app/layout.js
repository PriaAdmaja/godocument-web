import "./globals.css";
import { Montserrat } from "next/font/google";
import ReduxProvider from "./_components/reduxProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "GoDocument",
  description: "Create your pdf document",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
