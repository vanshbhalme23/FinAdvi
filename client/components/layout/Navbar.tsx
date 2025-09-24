import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Menu, LogOut, Video } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/advisors", label: "Find Advisors" },
  { to: "/resources", label: "Resources/Expenses" },
  { to: "/pricing", label: "Pricing" },
  { to: "/for-advisors", label: "For Advisors" },
  
];

export function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/80 text-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-white">
            <span className="inline-flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              ₹
            </span>
            FinAdvi
          </Link>
          <nav className="hidden gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 text-sm font-medium text-white/80 hover:text-white",
                    isActive && "text-white underline underline-offset-8",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {/* Video Call quick access */}
          <Button variant="ghost" asChild aria-label="Start Video Call">
            <Link to="/video-call" className="flex items-center gap-2">
              <Video />
              <span className="hidden sm:inline">Video Call</span>
            </Link>
          </Button>

          {!user && (
            <>
              <Button variant="ghost" asChild>
                <Link to="/auth">Sign in</Link>
              </Button>
              <Button asChild>
                <Link to="/auth?mode=signup">Get Started</Link>
              </Button>
            </>
          )}
          {user && (
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={() => navigate(user.role === "advisor" ? "/advisor" : "/dashboard")}>
                {user.role === "admin" ? "Admin" : user.role === "advisor" ? "Advisor" : "Dashboard"}
              </Button>
              <Button variant="ghost" onClick={logout}>
                <LogOut className="mr-2" /> Logout
              </Button>
            </div>
          )}
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle Menu">
          <Menu />
        </Button>
      </div>

      {open && (
        <div className="border-t bg-background md:hidden">
          <div className="container flex flex-col py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-2 py-2 text-sm font-medium text-white/80 hover:text-white",
                    isActive && "text-white underline",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Mobile video call link */}
            <Button variant="ghost" asChild>
              <Link to="/video-call" onClick={() => setOpen(false)} className="px-2 py-2 text-sm font-medium flex items-center gap-2">
                <Video /> Start Video Call
              </Link>
            </Button>

            {!user ? (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button variant="ghost" asChild>
                  <Link to="/auth" onClick={() => setOpen(false)}>Sign in</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth?mode=signup" onClick={() => setOpen(false)}>Get Started</Link>
                </Button>
              </div>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button variant="secondary" onClick={() => { setOpen(false); navigate(user.role === "advisor" ? "/advisor" : "/dashboard"); }}>
                  {user.role === "admin" ? "Admin" : user.role === "advisor" ? "Advisor" : "Dashboard"}
                </Button>
                <Button variant="ghost" onClick={() => { setOpen(false); logout(); }}>
                  <LogOut className="mr-2" /> Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
