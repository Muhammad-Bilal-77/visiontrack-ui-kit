import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scan } from "lucide-react";

type UserRole = "admin" | "employee" | null;

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState<UserRole>(null);
  const [checking, setChecking] = useState(true);

  const getCookie = (name: string) => {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token") || getCookie("access_token");
    if (!token) {
      setLoggedIn(false);
      setRole(null);
      setChecking(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const res = await fetch("https://premier-paula-evolvoria-acf84abc.koyeb.app/core/api/user-role/", {
          method: "GET",
          headers: { Authorization: `JWT ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          const apiRole = data?.data?.role as UserRole;
          if (apiRole) {
            setRole(apiRole);
            localStorage.setItem("user_role", apiRole);
          } else {
            setRole((localStorage.getItem("user_role") as UserRole) || null);
          }
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
          setRole(null);
        }
      } catch (err) {
        // Fallback to stored role if fetch fails
        const storedRole = localStorage.getItem("user_role") as UserRole;
        if (storedRole) {
          setLoggedIn(true);
          setRole(storedRole);
        } else {
          setLoggedIn(false);
          setRole(null);
        }
      } finally {
        setChecking(false);
      }
    };

    fetchRole();
  }, []);

  const dashboardPath = role === "admin" ? "/admin" : "/employee";

  const handleLogout = () => {
    try {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_role");
      localStorage.removeItem("employee_email");
      localStorage.removeItem("employee_name");
      if (typeof document !== "undefined") {
        document.cookie = "access_token=; Max-Age=0; path=/;";
        document.cookie = "refresh_token=; Max-Age=0; path=/;";
      }
    } catch (e) {
      /* noop */
    }
    setLoggedIn(false);
    setRole(null);
    setIsMenuOpen(false);
    navigate("/login");
  };

  const AuthButtons = () => (
    <>
      <Link to="/" onClick={() => setIsMenuOpen(false)} className="w-full md:w-auto">
        <Button variant="ghost" className="w-full justify-center text-sm sm:text-base">Home</Button>
      </Link>
      <Link to="/attendance" onClick={() => setIsMenuOpen(false)} className="w-full md:w-auto">
        <Button variant="ghost" className="w-full justify-center text-sm sm:text-base">Mark Attendance</Button>
      </Link>
      {loggedIn && role && !checking && (
        <Link to={dashboardPath} onClick={() => setIsMenuOpen(false)} className="w-full md:w-auto">
          <Button variant="ghost" className="w-full justify-center text-sm sm:text-base">Dashboard</Button>
        </Link>
      )}
      {!loggedIn && (
        <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full md:w-auto">
          <Button variant="ghost" className="w-full justify-center text-sm sm:text-base">Login</Button>
        </Link>
      )}
      {!loggedIn && (
        <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full md:w-auto">
          <Button className="w-full justify-center text-sm sm:text-base">Get Started</Button>
        </Link>
      )}
      {loggedIn && !checking && (
        <Button variant="outline" onClick={handleLogout} className="w-full justify-center text-sm sm:text-base md:w-auto">
          Logout
        </Button>
      )}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Scan className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              VisionTrack
            </span>
          </Link>

          <div className="flex items-center gap-3 md:hidden">
            {!checking && loggedIn && role && (
              <span className="text-sm text-muted-foreground capitalize">{role}</span>
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? "✕" : "☰"}
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <AuthButtons />
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute left-4 right-4 mt-4 md:hidden grid gap-2 rounded-lg border bg-background p-3 shadow-lg">
            <AuthButtons />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
