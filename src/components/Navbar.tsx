import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, Ticket, LogOut, User, Settings, Home, Film, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();

  const links = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/movies", label: "Movies", icon: Film },
    { to: "/events", label: "Events", icon: Ticket },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const userInitial = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || "U";

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";

  return (
    <nav className="sticky top-0 z-50 border-b border-red-900/40 bg-black/90 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Ticket className="h-6 w-6 text-red-500" />
          <span className="text-white">Event<span className="text-amber-400">Hub</span></span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "text-sm font-medium transition-all duration-200 hover:text-amber-400 flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                  location.pathname === link.to
                    ? "text-amber-400 bg-amber-400/10"
                    : "text-gray-300"
                )}
              >
                <Icon className={cn("h-4 w-4", link.label === "Home" ? "text-black" : "")} />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/events">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-amber-400 hover:bg-white/5">
              <Search className="h-4 w-4" />
            </Button>
          </Link>
          {!loading && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-red-800/50 bg-gradient-to-r from-red-950/60 to-black hover:from-red-900/60 hover:border-amber-500/30 transition-all duration-300 group">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-red-500/20">
                      {userInitial}
                    </div>
                    <span className="text-sm font-medium text-gray-200 group-hover:text-amber-400 transition-colors max-w-[120px] truncate">
                      {userName}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-gray-500 group-hover:text-amber-400 transition-colors" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-950 border border-red-900/40 shadow-xl shadow-black/50 p-1">
                  <div className="px-3 py-2.5 mb-1">
                    <p className="text-sm font-semibold text-white">{userName}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-red-900/30" />
                  <DropdownMenuItem 
                    onClick={() => navigate("/settings")} 
                    className="gap-2.5 cursor-pointer text-gray-300 hover:text-amber-400 hover:bg-red-950/50 rounded-md mx-1 focus:bg-red-950/50 focus:text-amber-400"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-red-900/30" />
                  <DropdownMenuItem 
                    onClick={handleSignOut} 
                    className="gap-2.5 cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded-md mx-1 focus:bg-red-950/50 focus:text-red-300"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-5">
                  Sign In
                </Button>
              </Link>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-red-900/30 bg-black/95 backdrop-blur-xl px-4 py-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2 py-2.5 px-3 text-sm font-medium rounded-lg transition-colors",
                  location.pathname === link.to
                    ? "text-amber-400 bg-amber-400/10"
                    : "text-gray-300 hover:bg-white/5"
                )}
              >
                <Icon className={cn("h-4 w-4", link.label === "Home" ? "text-black" : "")} />
                {link.label}
              </Link>
            );
          })}
          {user ? (
            <>
              <div className="border-t border-red-900/30 pt-3 mt-2">
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                    {userInitial}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{userName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full gap-2 justify-start text-gray-300 hover:text-amber-400 hover:bg-white/5" 
                  onClick={() => { navigate("/settings"); setMobileOpen(false); }}
                >
                  <Settings className="h-4 w-4" /> Settings
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full gap-2 justify-start text-red-400 hover:text-red-300 hover:bg-red-950/50" 
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </Button>
              </div>
            </>
          ) : (
            <Link to="/auth" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full mt-2">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
