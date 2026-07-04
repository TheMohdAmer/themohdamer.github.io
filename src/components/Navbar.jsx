import { useEffect, useState,useRef } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [active, setActive] = useState("Frontend");
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const links = ["Home", "About", "Skills", "Projects", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      links.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const rect = section.getBoundingClientRect();

        if (rect.top <= 150 && rect.bottom >= 150) {
          setActive(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // new useEffect
  useEffect(() => {
  function handleClickOutside(event) {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#DCD6F7] dark:bg-[#000016] backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center h-18">
        <h1 className="font-bold text-2xl">Mohd Amer</h1>

        {/* Desktop */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className={`text-md ${
                active === link
                  ? "text-purple-500 font-semibold"
                  : "hover:text-purple-500"
              }`}
            >
              {link}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setOpen((prev) => !prev)}>☰</button>
        </div>
      </div>

      {open && (
        <>
          {/* Overlay : when again click -> closes */}   
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />


          {/* Mobile Menu */}
          <div
  ref={menuRef}
  className="md:hidden absolute right-0 mt-2 w-56 rounded-2xl
             bg-white/90 dark:bg-zinc-800/90
             border border-zinc-200 dark:border-zinc-700
             backdrop-blur-md shadow-xl
             p-6 text-right flex flex-col gap-6"
>
            {links.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                onClick={() => setOpen(false)}
                className="hover:text-zinc-400"
              >
                {link}
              </a>
            ))}
          </div>
        </>
      )}
    </nav>
  );
}
