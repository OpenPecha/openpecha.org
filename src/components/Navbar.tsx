
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { X, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Close the mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
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
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = element.offsetTop - 100;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  const navLinks = [
    { label: "The Challenge", id: "challenge" },
    { label: "Our Solution", id: "solution" },
    { label: "Resources", id: "resources" },
    { label: "About", id: "about" },
    { label: "Community", id: "community" }
  ];

  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4 md:py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/" 
           onClick={handleLogoClick} 
           className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
            <img 
              src="/lovable-uploads/d40b99df-a81c-4b68-8c6c-84301d427a2b.png" 
              alt="OpenPecha Logo" 
              className="h-8 w-8 object-contain"
            />
          </div>
          <span className="text-2xl font-cormorant font-bold text-black">OpenPecha</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-gray-700 transition-colors duration-200 font-medium hover:opacity-80"
              style={{color: '#8f3ae9'}}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              {link.label}
            </button>
          ))}
          <Button 
            onClick={() => scrollToSection('support')}
            className="text-white"
            style={{backgroundColor: '#8f3ae9'}}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7c2fd8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8f3ae9'}
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
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left transition-colors duration-200 font-medium py-2"
                  style={{color: '#8f3ae9'}}
                >
                  {link.label}
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection('support')}
                className="text-white w-full"
                style={{backgroundColor: '#8f3ae9'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7c2fd8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8f3ae9'}
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
