import React from "react";
import { Github, MessageSquare, MessageCircle, Mail, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  
  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
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
  };

  const quickLinks = [
    { label: "The Challenge", id: "challenge" },
    { label: "Our Solution", id: "solution" },
    { label: "Resources", id: "resources" },
    { label: "About", id: "about" },
    { label: "Community", id: "community" },
    { label: "Support Us", id: "support" }
  ];

  const socialLinks = [
    { name: "GitHub", icon: <Github className="h-5 w-5" />, url: "https://github.com/openpecha" },
    { name: "Hugging Face", icon: <Heart className="h-5 w-5" />, url: "https://huggingface.co/openpecha" },
    { name: "Discord", icon: <MessageSquare className="h-5 w-5" />, url: "https://discord.gg/7GFpPFSTeA" },
    { name: "Forum", icon: <MessageCircle className="h-5 w-5" />, url: "https://forum.openpecha.org/" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <img 
                  src="/lovable-uploads/d40b99df-a81c-4b68-8c6c-84301d427a2b.png" 
                  alt="OpenPecha Logo" 
                  className="h-8 w-8 object-contain" 
                />
              </div>
              <span className="text-2xl font-cormorant font-bold text-white">OpenPecha</span>
            </div>
            <p className="text-gray-300 mb-4">
              Scaling wisdom by building the open-source foundation for Buddhist technology, together.
            </p>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} OpenPecha Charitable Trust
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-300 transition-colors text-left hover:opacity-80"
                    style={{color: '#08cbf2'}}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Connect With Us</h3>
            <ul className="space-y-2">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target={social.url.startsWith('http') ? "_blank" : "_self"}
                    rel={social.url.startsWith('http') ? "noopener noreferrer" : ""}
                    className="flex items-center text-gray-300 transition-colors hover:opacity-80"
                    style={{color: '#08cbf2'}}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    {social.icon}
                    <span className="ml-2">{social.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <div>
              <p className="text-gray-300 text-sm">
                <Mail className="inline h-4 w-4 mr-1" />
                hello@openpecha.org
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            OpenPecha Initiative • Building Buddhist Technology Together
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;