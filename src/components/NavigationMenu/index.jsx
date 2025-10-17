import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Home, ListCheck } from "lucide-react";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react/macro";
import { NavLink } from "react-router";
import { PATHS } from "/src/paths";

function RegularMenuItem({ item, handleKeyDown }) {
  return (
    <NavLink
      data-item-id={item.id}
      to={item.href}
      className="navbar-link"
      role="menuitem"
      onKeyDown={(e) => handleKeyDown(e, item.id, false)}
    >
      <item.icon className="navbar-icon" />
      {item.label}
    </NavLink>
  );
}

function DropdownMenuItem({
  handleSubmenuKeyDown,
  handleKeyDown,
  activeDropdown,
  setActiveDropdown,
  item,
}) {
  return (
    <>
      <button
        data-item-id={item.id}
        id={`menu-button-${item.id}`}
        className="navbar-button"
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={activeDropdown === item.id}
        onKeyDown={(e) => handleKeyDown(e, item.id, true)}
        onClick={() =>
          setActiveDropdown(activeDropdown === item.id ? null : item.id)
        }
        onMouseEnter={() => setActiveDropdown(item.id)}
      >
        <item.icon className="navbar-icon" />
        {item.label}
        <ChevronDown
          data-is-rotated={activeDropdown === item.id}
          className={`navbar-chevron`}
        />
      </button>

      {activeDropdown === item.id && (
        <DropDownMenu
          handleSubmenuKeyDown={handleSubmenuKeyDown}
          setActiveDropdown={setActiveDropdown}
          item={item}
        />
      )}
    </>
  );
}

function DropDownMenu({ handleSubmenuKeyDown, setActiveDropdown, item }) {
  return (
    <div
      data-submenu={item.id}
      className="navbar-dropdown"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={`menu-button-${item.id}`}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="navbar-dropdown-content">
        {item.children.map((child, index) => (
          <NavLink
            key={child.id}
            data-submenu-index={index}
            to={child.href}
            className="navbar-dropdown-item"
            role="menuitem"
            onClick={() => setActiveDropdown(null)}
            onKeyDown={(e) =>
              handleSubmenuKeyDown(e, item.id, item.children, index)
            }
          >
            {child.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const menubarRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { _ } = useLingui();

  // Configuration des éléments de navigation
  const navItems = [
    { ...PATHS.HOME, icon: Home, label: _(msg`Accueil`) },
    {
      id: "todos-dropdown",
      icon: ListCheck,
      label: _(msg`Tâches`),
      children: [
        {
          ...PATHS.TODOS,
          id: "todos-all",
          label: _(msg`Tâches`),
        },
        {
          ...PATHS.ARCHIVED_TODOS,
          id: "todos-archived",
          label: _(msg`Tâches archivées`),
        },
      ],
    },
  ];

  const focusItem = (itemId, isSubmenu = false) => {
    const selector = isSubmenu
      ? `[data-submenu="${itemId}"] .navbar-dropdown-item:first-child`
      : `[data-item-id="${itemId}"]`;
    const element = menubarRef.current?.querySelector(selector);
    element?.focus();
  };

  const focusNextItem = (currentIndex, direction) => {
    if (!menubarRef.current) return;
    const items = Array.from(
      menubarRef.current.querySelectorAll(
        '[role="menuitem"]:not([data-submenu-index])'
      )
    );
    const nextIndex = (currentIndex + direction + items.length) % items.length;
    items[nextIndex]?.focus();
  };

  const handleKeyDown = (event, itemId, hasChildren = false) => {
    const items = navItems;
    const currentIndex = items.findIndex((item) => item.id === itemId);

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusNextItem(currentIndex, 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusNextItem(currentIndex, -1);
        break;
      case "ArrowDown":
        if (hasChildren) {
          event.preventDefault();
          setActiveDropdown(itemId);
          setTimeout(() => focusItem(itemId, true), 0);
        }
        break;
      case "Enter":
      case " ":
        if (hasChildren) {
          event.preventDefault();
          setActiveDropdown(itemId);
          setTimeout(() => focusItem(itemId, true), 0);
        }
        break;
      case "Escape":
        event.preventDefault();
        setActiveDropdown(null);
        break;
      default:
        break;
    }
  };

  const handleSubmenuKeyDown = (event, parentId, children, currentIndex) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % children.length;
        menubarRef.current
          ?.querySelector(
            `[data-submenu="${parentId}"] [data-submenu-index="${nextIndex}"]`
          )
          ?.focus();
        break;
      case "ArrowUp":
        event.preventDefault();
        const prevIndex =
          (currentIndex - 1 + children.length) % children.length;
        menubarRef.current
          ?.querySelector(
            `[data-submenu="${parentId}"] [data-submenu-index="${prevIndex}"]`
          )
          ?.focus();
        break;
      case "ArrowLeft":
      case "Escape":
        event.preventDefault();
        setActiveDropdown(null);
        menubarRef.current
          ?.querySelector(`[data-item-id="${parentId}"]`)
          ?.focus();
        break;
      case "Tab":
        if (currentIndex === children.length - 1) {
          setActiveDropdown(null);
        }
        break;
      default:
        break;
    }
  };

  // Fermeture des menus au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menubarRef.current && !menubarRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('[aria-label="Toggle menu"]')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <div
          ref={menubarRef}
          className="navbar-menubar"
          role="menubar"
          aria-label="Main menu"
        >
          {navItems.map((item) => (
            <div key={item.id} className="navbar-item">
              {item.children ? (
                <DropdownMenuItem
                  handleKeyDown={handleKeyDown}
                  handleSubmenuKeyDown={handleSubmenuKeyDown}
                  item={item}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                />
              ) : (
                <RegularMenuItem item={item} handleKeyDown={handleKeyDown} />
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
