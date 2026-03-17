import { NavLink } from "react-router-dom";
import { useState } from "react";

const navItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: "Menu",
    path: "/admin/menu",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 6h18M3 12h18M3 18h12" />
      </svg>
    ),
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    label: "Reservations",
    path: "/admin/reservations",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
];

const HamburgerIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M6 18L18 6M6 6l12 12" />
  </svg>
);

function NavItem({ item, showLabel, onClick }) {
  return (
    <NavLink
      to={item.path}
      end={item.path === "/admin"}
      onClick={onClick}
      title={!showLabel ? item.label : undefined}
      className={({ isActive }) =>
        `group flex items-center rounded-md text-sm font-medium transition-all duration-200
         ${showLabel ? "gap-3 px-3" : "justify-center px-0"}  //  center icons when collapsed
         py-2.5
         ${isActive ? "bg-[#222222] text-(--white-color)" : "text-gray-400 hover:bg-[#1a1a1a] hover:text-(--white-color)"}`
      }
    >
      {({ isActive }) => (
        <>
          <span className={`shrink-0 transition-colors ${isActive ? "text-(--button-hover-text-color)" : "text-gray-400 group-hover:text-(--button-hover-text-color)"}`}>
            {item.icon}
          </span>
          {showLabel && <span className="whitespace-nowrap overflow-hidden">{item.label}</span>}
        </>
      )}
    </NavLink>
  );
}

// Reusable collapsible sidebar for mobile & tablet
function CollapsibleSidebar({ open, onOpen, onClose, isMobile }) {
  return (
    <>
      <aside
        className={`
          ${isMobile
            ? "md:hidden fixed top-0 left-0 h-full z-40"   // fix 1: explicit positioning for mobile
            : "hidden md:flex lg:hidden relative z-40"      // fix 2: relative keeps tablet in flow, z-40 above backdrop
          }
          flex flex-col bg-[#111111] transition-all duration-300 ease-in-out overflow-hidden
          ${open ? "w-56" : isMobile ? "w-14" : "w-16"}
        `}
      >
        {/* Header */}
        <div className={`flex items-center border-b border-white/10 shrink-0 ${open ? "justify-between px-4 py-4" : "justify-center py-4"}`}>
          {open ? (
            <>
              <span className="text-lg font-bold tracking-tight whitespace-nowrap">
                <span className="text-(--button-hover-text-color)">Bite</span>
                <span className="text-(--white-color)">Hub</span>
              </span>
              <button onClick={onClose} className="text-gray-400 hover:text-(--white-color) transition-colors p-1 ml-2" aria-label="Close sidebar">
                <CloseIcon />
              </button>
            </>
          ) : (
            <button onClick={onOpen} className="text-gray-400 hover:text-(--white-color) transition-colors p-1" aria-label="Open sidebar">
              <HamburgerIcon />
            </button>
          )}
        </div>

        {/* Nav */}
        {/* Nav */}
<nav className="flex flex-col gap-1 mt-2 px-2">  {/*  keep small px-2 for breathing room from edge */}
  {navItems.map((item) => (
    <NavItem key={item.label} item={item} showLabel={open} onClick={open && isMobile ? onClose : undefined} />
  ))}
</nav>
      </aside>

      {/* Backdrop — z-30 sits BEHIND the sidebar (z-40) on both */}
      {open && (
        <div
          onClick={onClose}
          className={`
            ${isMobile ? "md:hidden" : "hidden md:block lg:hidden"}
            fixed inset-0 bg-black/50 z-30
          `}
        />
      )}
    </>
  );
}

export default function SideBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabletOpen, setTabletOpen] = useState(false);

  return (
    <>
      {/* Mobile */}
      <CollapsibleSidebar
        open={mobileOpen}
        onOpen={() => setMobileOpen(true)}
        onClose={() => setMobileOpen(false)}
        isMobile
      />

      {/* Tablet */}
      <CollapsibleSidebar
        open={tabletOpen}
        onOpen={() => setTabletOpen(true)}
        onClose={() => setTabletOpen(false)}
        isMobile={false}
      />

      {/* Desktop */}
      <aside className="hidden lg:flex w-60 min-h-screen bg-[#111111] flex-col p-6">
        <div className="mb-8 text-2xl font-bold tracking-tight">
          <span className="text-(--button-hover-text-color)">Bite</span>
          <span className="text-(--white-color)">Hub</span>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavItem key={item.label} item={item} showLabel />
          ))}
        </nav>
      </aside>
    </>
  );
}