import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Lock, 
  Smartphone, 
  Wifi, 
  Download, 
  Eye,
  RefreshCw,
  Users
} from "lucide-react";

export const SecurityBestPractices = () => {
  const practices = [
    {
      icon: Lock,
      title: "Strong Passwords",
      description: "Create unique, complex passwords for each account",
      tips: [
        "Use 12+ characters with mixed case, numbers, symbols",
        "Enable two-factor authentication everywhere",
        "Use a reputable password manager",
        "Never reuse passwords across accounts"
      ],
      priority: "Critical"
    },
    {
      icon: RefreshCw,
      title: "Software Updates",
      description: "Keep all software current with latest security patches",
      tips: [
        "Enable automatic updates when possible",
        "Update operating systems immediately",
        "Keep browsers and plugins current",
        "Remove unused software regularly"
      ],
      priority: "High"
    },
    {
      icon: Wifi,
      title: "Network Security",
      description: "Secure your internet connections and browsing habits",
      tips: [
        "Use WPA3 encryption on home WiFi",
        "Avoid public WiFi for sensitive activities",
        "Use VPN for public network access",
        "Regularly check connected devices"
      ],
      priority: "High"
    },
    {
      icon: Download,
      title: "Safe Downloads",
      description: "Be cautious about what you download and install",
      tips: [
        "Only download from official sources",
        "Scan files with antivirus before opening",
        "Read user reviews and ratings",
        "Avoid cracked or pirated software"
      ],
      priority: "Critical"
    },
    {
      icon: Eye,
      title: "Email Vigilance",
      description: "Practice safe email habits to avoid phishing",
      tips: [
        "Verify sender identity before responding",
        "Don't click suspicious links or attachments",
        "Report phishing attempts to IT",
        "Use email filters and security tools"
      ],
      priority: "Critical"
    },
    {
      icon: Smartphone,
      title: "Mobile Security",
      description: "Protect your mobile devices and data",
      tips: [
        "Use screen locks and biometric authentication",
        "Install apps only from official stores",
        "Enable remote wipe capabilities",
        "Keep mobile OS and apps updated"
      ],
      priority: "High"
    },
    {
      icon: Users,
      title: "Social Engineering",
      description: "Recognize and resist social engineering attacks",
      tips: [
        "Verify identity through independent channels",
        "Be suspicious of urgent requests",
        "Never share sensitive info over phone",
        "Question unexpected contact attempts"
      ],
      priority: "Medium"
    },
    {
      icon: Shield,
      title: "Backup & Recovery",
      description: "Prepare for security incidents and data loss",
      tips: [
        "Maintain regular, tested backups",
        "Use the 3-2-1 backup strategy",
        "Keep backups offline and encrypted",
        "Practice incident response procedures"
      ],
      priority: "Medium"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-destructive text-destructive-foreground';
      case 'High':
        return 'bg-warning text-warning-foreground';
      case 'Medium':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section id="security" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cybersecurity Best Practices
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Essential security habits to protect yourself from cyber threats
          </p>
        </div>

        {/* Security Practices Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {practices.map((practice, index) => (
            <Card key={index} className="p-6 hover:shadow-elevated transition-all duration-300 hover:scale-105 bg-card">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="bg-gradient-primary p-3 rounded-full shadow-glow">
                    <practice.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(practice.priority)}`}>
                    {practice.priority}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">{practice.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{practice.description}</p>
                </div>

                {/* Tips */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-primary">Key Tips:</h4>
                  <ul className="space-y-1">
                    {practice.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-xs text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Security Framework */}
        <div className="bg-gradient-primary rounded-2xl p-8 text-primary-foreground shadow-elevated">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">The PhishGuard Security Framework</h3>
            <p className="opacity-90 max-w-2xl mx-auto">
              Our comprehensive approach to cybersecurity combines prevention, detection, and response
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Prevent</h4>
              <p className="text-sm opacity-90">Proactive measures to stop attacks before they happen</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Detect</h4>
              <p className="text-sm opacity-90">Real-time monitoring and threat identification</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-8 w-8" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Respond</h4>
              <p className="text-sm opacity-90">Quick action to minimize damage and recover</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Learn More About Our Framework
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};