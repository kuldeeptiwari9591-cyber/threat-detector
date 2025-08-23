import { Shield, Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: "About PhishGuard", href: "#about" },
    { name: "Our Mission", href: "#mission" },
    { name: "Security Team", href: "#team" },
    { name: "Careers", href: "#careers" }
  ];

  const servicesLinks = [
    { name: "URL Analysis", href: "#detection" },
    { name: "Security Training", href: "#learn" },
    { name: "Threat Intelligence", href: "#threats" },
    { name: "Enterprise Solutions", href: "#enterprise" }
  ];

  const resourcesLinks = [
    { name: "Security Blog", href: "#blog" },
    { name: "Documentation", href: "#docs" },
    { name: "API Reference", href: "#api" },
    { name: "Support Center", href: "#support" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Cookie Policy", href: "#cookies" },
    { name: "Compliance", href: "#compliance" }
  ];

  return (
    <footer className="bg-gradient-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-white/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Protected with PhishGuard</h3>
            <p className="opacity-90 mb-6 max-w-2xl mx-auto">
              Get the latest threat intelligence, security tips, and product updates delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
              />
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-white/20 p-3 rounded-lg">
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">PhishGuard</h2>
                <p className="text-sm opacity-80">Advanced Cybersecurity Protection</p>
              </div>
            </div>
            <p className="opacity-90 mb-6 max-w-sm">
              PhishGuard is a cutting-edge cybersecurity platform that protects individuals and 
              organizations from phishing attacks using advanced AI and machine learning technologies.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm opacity-90">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span>security@phishguard.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-SAFE</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="opacity-80 hover:opacity-100 transition-opacity text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="opacity-80 hover:opacity-100 transition-opacity text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {resourcesLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="opacity-80 hover:opacity-100 transition-opacity text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Legal */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 text-sm">
              {legalLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-sm opacity-80">Follow us:</span>
              <div className="flex space-x-3">
                <a href="#" className="hover:scale-110 transition-transform">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="hover:scale-110 transition-transform">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="hover:scale-110 transition-transform">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 pt-8 border-t border-white/20">
            <p className="text-sm opacity-80">
              © {currentYear} PhishGuard. All rights reserved. | 
              <span className="ml-1">Protecting the digital world, one URL at a time.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="bg-white/5 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-6 text-xs opacity-70">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>ISO 27001 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};