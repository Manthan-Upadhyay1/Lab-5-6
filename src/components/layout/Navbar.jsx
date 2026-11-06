import { useEffect, useState } from "react";
import { useDemo } from "../../context/DemoContext";
import { NAV_LINKS, SECTION_IDS } from "../../data/content";
import { useActiveSection } from "../../hooks/useActiveSection";
import { cx } from "../../utils/helpers";
import Button from "../ui/Button";
import { CloseIcon, MenuIcon } from "../ui/Icons";
import Logo from "../ui/Logo";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const { openDemo } = useDemo();

  // Escape / outside click / resize to desktop all close the mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    const onKey = (e) => e.key === "Escape" && close();
    const onClick = (e) => !e.target.closest("[data-mobile-nav]") && close();
    const onResize = () => window.matchMedia("(min-width: 1024px)").matches && close();
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const linkState = (id) => active === id;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)]">
      <nav className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="mt-4 flex h-16 items-center justify-between rounded-2xl border border-brand-100/80 bg-white/80 px-4 shadow-[0_8px_30px_rgba(21,15,56,0.08)] backdrop-blur-xl sm:px-6">
          <Logo />

          {/* Desktop links */}
          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={linkState(link.id) ? "location" : undefined}
                className={cx(
                  "text-sm font-semibold transition-colors duration-300 hover:text-brand-600",
                  linkState(link.id) ? "nav-link-active" : "text-ink/70",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="relative flex items-center gap-3" data-mobile-nav>
            <div className="hidden items-center gap-3 lg:flex">
              <Button variant="ghost">Sign In</Button>
              <Button variant="gradient" onClick={() => openDemo()} arrow>
                Get Recommendations
              </Button>
            </div>

            <button
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-100 bg-white/70 text-ink transition-all duration-300 hover:bg-white lg:hidden"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            {menuOpen && (
              <div className="pop-in absolute right-0 top-full z-50 mt-3 w-[min(19rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-brand-100 bg-white/95 p-4 shadow-[0_12px_35px_rgba(21,15,56,0.16)] backdrop-blur-xl lg:hidden">
                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={() => setMenuOpen(false)}
                      className={cx(
                        "rounded-xl px-4 py-3 text-sm font-semibold hover:bg-brand-50 hover:text-brand-600",
                        linkState(link.id) ? "nav-link-active" : "text-ink/75",
                      )}
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="my-2 h-px bg-brand-100" />
                  <button type="button" className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-ink/80 hover:bg-brand-50">
                    Sign In
                  </button>
                  <Button
                    variant="gradient"
                    onClick={() => {
                      setMenuOpen(false);
                      openDemo();
                    }}
                    className="mt-1 w-full"
                  >
                    Get Recommendations →
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
