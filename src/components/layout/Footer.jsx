import { useDemo } from "../../context/DemoContext";
import { FOOTER_COLUMNS, SOCIALS } from "../../data/content";
import Button from "../ui/Button";
import Logo from "../ui/Logo";

export default function Footer() {
  const { openDemo } = useDemo();

  return (
    <footer className="bg-mesh-dark text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="dark" />
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Your AI-powered food companion, helping you discover restaurants that match your taste, budget and journey.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm transition hover:border-brand-400 hover:bg-brand-600"
                >
                  {social.short}
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">{column.title}</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-400">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="transition hover:text-coral-300">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Find Your Match</h3>
            <p className="mt-5 text-sm leading-6 text-slate-400">Ready to discover your next favourite restaurant?</p>
            <Button variant="gradient" onClick={() => openDemo()} arrow className="mt-5">
              Get Recommendations
            </Button>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10" />
        <div className="flex flex-col gap-4 pt-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 DineMate AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-slate-300">Privacy</a>
            <a href="#" className="transition hover:text-slate-300">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
