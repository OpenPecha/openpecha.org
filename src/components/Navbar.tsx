import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { X, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close the mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsResourcesOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      // We're already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = element.offsetTop - 100;
        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      }
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  const navLinks = [
    { label: "The Challenge", id: "challenge" },
    { label: "Our Solution", id: "solution" },
    {
      label: "Resources",
      id: "resources",
      isDropdown: true,
      items: [
        { label: "Datasets", href: "/datasets" },
        { label: "Models", href: "/models" },
      ],
    },
    { label: "About", id: "about" },
    { label: "Community", id: "community" },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4 md:py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          onClick={handleLogoClick}
          className="flex items-center space-x-2"
        >
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
            <img
              src="/lovable-uploads/d40b99df-a81c-4b68-8c6c-84301d427a2b.png"
              alt="OpenPecha Logo"
              className="h-8 w-8 object-contain"
            />
          </div>
          <span className="text-2xl font-cormorant font-bold text-black">
            OpenPecha
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) =>
            link.isDropdown ? (
              <div key={link.id} className="relative group">
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="text-gray-700 transition-colors duration-200 font-medium hover:opacity-80 flex items-center gap-1"
                  style={{ color: "#8f3ae9" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {link.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                {/* Dropdown on hover */}
                <div className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                    <ul className="flex flex-col w-[220px] p-2 gap-1">
                      {link.items?.map((item) => (
                        <li key={item.href}>
                          <Link to={item.href} className="block">
                            <div className="block select-none rounded-md px-4 py-3 text-sm font-medium leading-none no-underline outline-none transition-all hover:bg-purple-50 hover:text-purple-700 text-gray-700">
                              {item.label}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-700 transition-colors duration-200 font-medium hover:opacity-80"
                style={{ color: "#8f3ae9" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {link.label}
              </button>
            )
          )}
          <a
            href="https://openpecha.ideas.userback.io/p/GTHQ7iG8izB3Suu0wAmZ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 transition-colors duration-200 font-medium hover:opacity-80"
            style={{ color: "#8f3ae9" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Ideas
          </a>
          <Button
            onClick={() => scrollToSection("support")}
            className="text-white"
            style={{ backgroundColor: "#8f3ae9" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#7c2fd8")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#8f3ae9")
            }
          >
            Support Us
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-sm border-t shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <div key={link.id}>
                  {link.isDropdown ? (
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between py-2">
                        <button
                          onClick={() => scrollToSection(link.id)}
                          className="text-left font-medium text-gray-700 transition-colors flex-1"
                          style={{ color: "#8f3ae9" }}
                        >
                          {link.label}
                        </button>
                        <button
                          onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                          className="p-2 -mr-2 text-gray-700 transition-colors"
                          style={{ color: "#8f3ae9" }}
                          aria-label="Toggle resources dropdown"
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      {isResourcesOpen && (
                        <div className="pl-4 space-y-1">
                          {link.items?.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="block py-2.5 px-3 text-sm text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors font-medium"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-left transition-colors duration-200 font-medium py-2"
                      style={{ color: "#8f3ae9" }}
                    >
                      {link.label}
                    </button>
                  )}
                </div>
              ))}
              <a
                href="https://openpecha.ideas.userback.io/p/GTHQ7iG8izB3Suu0wAmZ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-left transition-colors duration-200 font-medium py-2"
                style={{ color: "#8f3ae9" }}
              >
                Ideas
              </a>
              <Button
                onClick={() => scrollToSection("support")}
                className="text-white w-full"
                style={{ backgroundColor: "#8f3ae9" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#7c2fd8")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#8f3ae9")
                }
              >
                Support Us
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
