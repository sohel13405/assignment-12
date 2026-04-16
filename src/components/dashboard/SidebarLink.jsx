import { NavLink } from "react-router";

export const SidebarLink = ({ to, icon, text, open }) => {
  return (
    <NavLink
      to={to}
      className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/10"
    >
      {icon}
      {open && <span>{text}</span>}
    </NavLink>
  );
};