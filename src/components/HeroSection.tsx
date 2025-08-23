import { Button } from "@/components/ui/button";
import { Shield, TrendingDown, Users, Zap } from "lucide-react";
import heroImage from "@/assets/hero-cybersecurity.jpg";

export const HeroSection = () => {
  const stats = [
    { icon: Shield, value: "99.9%", label: "Accuracy Rate" },
    { icon: TrendingDown, value: "85%", label: "Threat Reduction" },
    { icon: Users, value: "10K+", label: "Users Protected" },
    { icon: Zap, value: "<2s", label: "Analysis Time" }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Cybersecurity analyst working with multiple monitors"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-8">
            <Shield className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Advanced AI-Powered Protection</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Protect Yourself from
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Phishing Attacks
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Advanced AI-powered phishing detection system that analyzes 24 critical security features 
            to keep you safe from cyber threats.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="cybersecurity" size="xl">
              Analyze URL Now
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <stat.icon className="h-6 w-6 text-primary-glow mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-1 h-16 bg-gradient-to-b from-transparent via-primary-glow to-transparent rounded-full"></div>
        </div>
      </div>
    </section>
  );
};