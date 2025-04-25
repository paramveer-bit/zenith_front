import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

interface RootLayoutProps {
    children: React.ReactNode;
}
  
export default async function RootLayout({ children }: RootLayoutProps) {
  
   return (
     <div className="flex min-h-screen flex-col">
       <Header />
       <div className="grid flex-1 md:grid-cols-[220px_1fr]">
            <aside className="border-r bg-muted/40 md:block">
                <Navbar />
            </aside>
            {children}
        </div>
     </div>
   );
 }