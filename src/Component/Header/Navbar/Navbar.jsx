import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import Logo from "../Logo/Logo";

/* ---------- Lock / Unlock Icons (inline SVG) ---------- */
const LockIcon = ({ open = false, className = "w-5 h-5" }) =>
  open ? (
    // Open padlock
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  ) : (
    // Closed padlock
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );

/* ---------- Nav link style ---------- */
const navLinkClass = ({ isActive, isPending }) =>
  `relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg
   ${isPending ? "opacity-60" : ""}
   ${
     isActive
       ? "text-rose-500"
       : "text-gray-300 hover:text-white hover:bg-white/10"
   }`;

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch((error) => toast.error(error.message));
    setMenuOpen(false);
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/addProduct" className={navLinkClass}>
          Add Product
        </NavLink>
      </li>
      <li>
        <NavLink to="/myCart" className={navLinkClass}>
          My Cart
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-black text-white border-b border-gray-800">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* ---------- Left: Logo ---------- */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Logo />
        </Link>

        {/* ---------- Right: everything pushed to the far right ---------- */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">{links}</ul>

          {/* Divider */}
          <span className="hidden md:block w-px h-6 bg-gray-700 mx-2" />

          {/* Desktop auth block */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "user"}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-rose-500/60"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold">
                      {user.displayName?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-white truncate max-w-[120px]">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-400 truncate max-w-[140px]">
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg
                             bg-rose-600 hover:bg-rose-700 transition-colors
                             shadow-lg shadow-rose-600/30"
                >
                  {/* CLOSED lock because user is logged OUT after click */}
                  <LockIcon open={false} className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg
                           bg-rose-600 hover:bg-rose-700 transition-colors
                           shadow-lg shadow-rose-600/30"
              >
                {/* OPEN lock because user is logged OUT now (will open after login) */}
                <LockIcon open={false} className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger (kept on far right too) */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ---------- Mobile menu (all black) ---------- */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-black border-t border-gray-800
          ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="flex flex-col gap-1 px-4 py-4">{links}</ul>

        <div className="px-4 pb-4 border-t border-gray-800 pt-3">
          {user ? (
            <>
              <div className="flex items-center gap-3 mb-3">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-500/60"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold">
                    {user.displayName?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <div className="leading-tight">
                  <p className="text-sm font-semibold">{user.displayName}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg
                           bg-rose-600 hover:bg-rose-700 font-semibold transition-colors"
              >
                <LockIcon open={false} className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg
                         bg-rose-600 hover:bg-rose-700 font-semibold transition-colors"
            >
              <LockIcon open={false} className="w-4 h-4" />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;