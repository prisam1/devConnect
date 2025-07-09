// import { useState, useEffect, useCallback } from "react";
// import { Download } from "lucide-react";
// import { IMAGES } from "../constants/Images";

// const navLinks = [
//   { id: "home", label: "Home" },
//   { id: "about", label: "About" },
//   { id: "skills", label: "Skills" },
//   { id: "experience", label: "Experience" },
//   { id: "work", label: "Projects" },
//   { id: "contact", label: "Contact" },
// ];

// export const Header = () => {
//   const [activeLink, setActiveLink] = useState("home");

//   const handleScroll = useCallback(() => {
//     const scrollY = window.scrollY;
//     const offsets = navLinks.map(({ id }) => {
//       const el = document.getElementById(id);
//       if (!el) return { id, offsetTop: Infinity };
//       return { id, offsetTop: el.offsetTop };
//     });

//     const current = offsets
//       .filter((section) => scrollY >= section.offsetTop - 80)
//       .sort((a, b) => b.offsetTop - a.offsetTop)[0];

//     if (current && current.id !== activeLink) {
//       setActiveLink(current.id);
//     }
//   }, [activeLink]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);


//   return (
//     <div className="flex bg-slate-950 lg:h-[95.5px] h-[44.5px] lg:px-7 px-3 justify-between items-center">
//       <a
//         href="#home"
//         onClick={() => setActiveLink("home")}
//         className="lg:flex flex-row items-center gap-2 hidden md:block"
//       >
//         <img
//           src={IMAGES.pritam}
//           alt="react"
//           className="lg:w-[50px] lg:h-[50px] bg-white rounded-full lg:border-2  border-blue-500"
//         />
//         <h1 className="text-white lg:text-3xl font-semibold">Portfolio</h1>
//       </a>
//       <div className="flex flex-row gap-5 lg:min-w-0 min-w-full justify-center">
//         {navLinks.map(({ id, label }) => (
//           <a
//             key={id}
//             href={`#${id}`}
//             onClick={() => setActiveLink(id)}
//             className={`nav-link lg:text-2xl text-sm group transition-colors ${activeLink === id ? "text-purple-600" : "text-white"
//               } hover:text-purple-500`}
//           >
//             {label}
//           </a>
//         ))}
//       </div>
//       <button
//         onClick={() => window.open("/Pritam_resume.pdf", "_blank")}
//         className="animate-bounce lg:flex flex-col text-white items-center hidden md:block"
//       >
//         <Download size={40} absoluteStrokeWidth={true} />
//         Download Resume
//       </button>
//     </div>
//   );
// };

import { useState, useEffect, useCallback } from "react";
import { Download, Menu, X } from "lucide-react";
import { IMAGES } from "../constants/Images";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const Header = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const offsets = navLinks.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return { id, offsetTop: Infinity };
      return { id, offsetTop: el.offsetTop };
    });

    const current = offsets
      .filter((section) => scrollY >= section.offsetTop - 100)
      .sort((a, b) => b.offsetTop - a.offsetTop)[0];

    if (current && current.id !== activeLink) {
      setActiveLink(current.id);
    }
  }, [activeLink]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleNavClick = (id: string) => {
    setActiveLink(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="flex bg-slate-950 lg:h-[95.5px] h-[80px] lg:px-7 px-4 items-center justify-between">
      {/* Logo */}
      <a href="#home" className="flex items-center gap-2" onClick={() => setActiveLink("home")}>
        <img
          src={IMAGES.pritam}
          alt="logo"
          className="w-[50px] h-[50px] rounded-full border-2 border-blue-500 bg-white"
        />
        <h1 className="text-white text-xl lg:text-2xl font-semibold">Portfolio</h1>
      </a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => handleNavClick(id)}
            className={`relative text-lg hover:text-purple-400 transition duration-300 
              ${activeLink === id ? "text-purple-500 font-bold" : "text-white"}
            `}
          >
            {label}
            {/* {activeLink === id && (
              <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-purple-500"></span>
            )} */}
          </a>
        ))}
      </nav>

      {/* Download Button */}
      <div className="hidden md:flex items-center gap-2">
        <button
          onClick={() => window.open("/Pritam_resume.pdf", "_blank")}
          className="flex items-center gap-2 text-white px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 rounded-lg shadow hover:scale-105 transition"
        >
          <Download size={18} className="animate-bounce"/>
          Resume
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-slate-900 flex flex-col items-center py-4 gap-4 z-40">
          {navLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => handleNavClick(id)}
              className="text-white text-lg hover:text-purple-400 transition"
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => window.open("/Pritam_resume.pdf", "_blank")}
            className="text-white px-4 py-2 bg-purple-700 rounded hover:opacity-90"
          >
            Download Resume
          </button>
        </div>
      )}
    </header>
  );
};
