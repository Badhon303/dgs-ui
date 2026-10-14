"use client";
import Link from "@/components/Link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Search, Menu, ArrowRight } from "lucide-react";
import { navigation } from "@/data/site";
import { products } from "@/data/products";
import { projects } from "@/data/projects";
import { Dialog } from "./Dialog";
import { Media } from "./Media";
export function Navigation() {
  const path = usePathname();
  const router = useRouter();
  const [mobile, setMobile] = useState(false),
    [search, setSearch] = useState(false),
    [mega, setMega] = useState(false),
    [query, setQuery] = useState(""),
    [selected, setSelected] = useState(0);
  const progress = useRef<HTMLDivElement>(null);
  const entries = [
    ...navigation,
    { name: "Contact", href: "/contact/" },
    ...products.map((p) => ({ name: p.name, href: `/products/${p.slug}/` })),
    ...projects.map((p) => ({ name: p.title, href: `/projects/${p.slug}/` })),
  ];
  const results = entries
    .filter((e) => e.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 10);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMega(false);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((s) => !s);
      }
    };
    const scroll = () => {
      const total = document.documentElement.scrollHeight - innerHeight;
      if (progress.current)
        progress.current.style.transform = `scaleX(${total > 0 ? scrollY / total : 0})`;
    };
    document.addEventListener("keydown", key);
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => {
      document.removeEventListener("keydown", key);
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  const close = () => {
    setMobile(false);
    setMega(false);
  };
  return (
    <>
      <div ref={progress} className="scroll-progress" />
      <header className="nav-wrap">
        <nav aria-label="Main navigation" className="navbar">
          <Link href="/" className="wordmark" aria-label="DGS home">
            dgs
            <span className="brand-square" />
          </Link>
          <div className="desktop-nav">
            {navigation.map((n) => (
              <div key={n.href} className="nav-item">
                {n.href === "/products/" ? (
                  <button
                    className={path.startsWith("/products") ? "active" : ""}
                    aria-expanded={mega}
                    aria-controls="mega-menu"
                    onClick={() => setMega(!mega)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setMega(false);
                    }}
                  >
                    Systems <span className="tiny-plus">+</span>
                  </button>
                ) : (
                  <Link
                    className={
                      (n.href === "/" ? path === "/" : path.startsWith(n.href))
                        ? "active"
                        : ""
                    }
                    href={n.href}
                    onClick={close}
                  >
                    {n.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="nav-actions">
            <button
              className="icon-button search-trigger"
              onClick={() => {
                setSearch(true);
                setSelected(0);
              }}
              aria-label="Search pages, products and projects"
            >
              <Search size={18} />
              <kbd>⌘ K</kbd>
            </button>
            <Link className="button nav-cta" href="/contact/">
              Discuss your project <ArrowUpRight size={15} />
            </Link>
            <button
              className="icon-button mobile-trigger"
              aria-label="Open navigation menu"
              onClick={() => setMobile(true)}
            >
              <Menu />
            </button>
          </div>
        </nav>
        {mega && (
          <div id="mega-menu" className="mega-menu">
            <div>
              <p className="eyebrow">Find your frame</p>
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}/`}
                  onClick={close}
                >
                  {p.name}
                  <ArrowUpRight size={17} />
                </Link>
              ))}
              <Link href="/products/" onClick={close}>
                Explore every system
                <ArrowRight size={18} />
              </Link>
            </div>
            <Link
              href="/products/sliding-profiles/"
              onClick={close}
              className="mega-preview"
            >
              <Media
                id="products-05"
                contain
                alt="Sliding frame profile illustration"
              />
              <span>Details make the difference.</span>
            </Link>
          </div>
        )}
      </header>
      {mega && (
        <button
          tabIndex={-1}
          className="menu-dismiss"
          aria-label="Close systems menu"
          onClick={() => setMega(false)}
        />
      )}
      <Dialog
        open={mobile}
        onClose={() => setMobile(false)}
        label="Navigation"
        className="mobile-sheet"
      >
        <p className="eyebrow">DGS / Explore</p>
        {[
          ...navigation,
          { name: "Discuss your project", href: "/contact/" },
        ].map((n) => (
          <Link href={n.href} key={n.href} onClick={close}>
            {n.name}
            <ArrowUpRight />
          </Link>
        ))}
        <button
          className="button"
          onClick={() => {
            setMobile(false);
            setSearch(true);
          }}
        >
          Search the collection
          <Search size={18} />
        </button>
      </Dialog>
      <Dialog
        open={search}
        onClose={() => setSearch(false)}
        label="Search"
        className="command-dialog"
      >
        <p className="eyebrow">Find a system, a space, an idea.</p>
        <label className="search-field">
          <Search />
          <input
            autoFocus
            placeholder="Search DGS…"
            value={query}
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-activedescendant={
              results[selected] ? `result-${selected}` : undefined
            }
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelected((v) => (v + 1) % Math.max(1, results.length));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelected(
                  (v) => (v - 1 + results.length) % Math.max(1, results.length),
                );
              }
              if (e.key === "Enter" && results[selected]) {
                e.preventDefault();
                router.push(results[selected].href);
                setSearch(false);
              }
            }}
          />
        </label>
        <div id="search-results" role="listbox">
          {results.length ? (
            results.map((r, i) => (
              <Link
                id={`result-${i}`}
                key={r.href}
                role="option"
                aria-selected={selected === i}
                className={selected === i ? "selected" : ""}
                href={r.href}
                onClick={() => setSearch(false)}
              >
                {r.name}
                <ArrowUpRight size={18} />
              </Link>
            ))
          ) : (
            <p>No matches. Try “sliding” or “glass”.</p>
          )}
        </div>
        <small>↑ ↓ to explore · Enter to open · Esc to close</small>
      </Dialog>
    </>
  );
}

