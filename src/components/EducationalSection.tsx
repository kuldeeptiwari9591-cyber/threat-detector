import { Card } from "@/components/ui/card";
import { 
  AlertTriangle, 
  Eye, 
  Link, 
  Mail, 
  Shield, 
  Smartphone,
  Globe,
  CreditCard
} from "lucide-react";

export const EducationalSection = () => {
  const phishingSigns = [
    {
      icon: AlertTriangle,
      title: "Urgent or Threatening Language",
      description: "Messages that create false urgency like 'Account will be closed in 24 hours'",
      example: "Your account has been compromised. Click here immediately!"
    },
    {
      icon: Eye,
      title: "Poor Grammar and Spelling",
      description: "Professional companies rarely send emails with obvious spelling mistakes",
      example: "Youre accunt needs varification imediatly"
    },
    {
      icon: Link,
      title: "Suspicious URLs",
      description: "Hover over links to see where they actually go before clicking",
      example: "paypaI.com (using capital 'i' instead of 'l')"
    },
    {
      icon: Mail,
      title: "Generic Greetings",
      description: "Phishing emails often use generic greetings instead of your name",
      example: "\"Dear Customer\" instead of \"Dear John Smith\""
    },
    {
      icon: CreditCard,
      title: "Requests for Sensitive Information",
      description: "Legitimate companies never ask for passwords or SSN via email",
      example: "Please verify your password and credit card details"
    },
    {
      icon: Smartphone,
      title: "Unsolicited Attachments",
      description: "Be cautious of unexpected attachments, especially executable files",
      example: "Invoice.exe or Document.zip from unknown senders"
    },
    {
      icon: Globe,
      title: "Mismatched Domains",
      description: "Check if the sender's domain matches the company they claim to represent",
      example: "amazon-security@gmail.com instead of @amazon.com"
    },
    {
      icon: Shield,
      title: "Too Good to Be True Offers",
      description: "Extremely generous offers or prizes are often phishing attempts",
      example: "You've won $10,000! Click here to claim your prize!"
    }
  ];

  return (
    <section id="learn" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learn to Identify Phishing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Recognize the warning signs of phishing attempts to protect yourself and your organization
          </p>
        </div>

        {/* Common Phishing Signs */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Common Phishing Signs</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {phishingSigns.map((sign, index) => (
              <Card key={index} className="p-6 hover:shadow-card transition-all duration-300 hover:scale-105 bg-gradient-card">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="bg-gradient-primary p-3 rounded-full shadow-glow">
                    <sign.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-lg">{sign.title}</h4>
                  <p className="text-muted-foreground text-sm">{sign.description}</p>
                  <div className="bg-destructive/10 p-3 rounded-lg border border-destructive/20 w-full">
                    <p className="text-xs text-destructive font-medium">Example:</p>
                    <p className="text-xs italic mt-1">"{sign.example}"</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Prevention Tips */}
        <div className="bg-gradient-card rounded-2xl p-8 shadow-card">
          <h3 className="text-2xl font-semibold mb-6 text-center">Prevention Tips</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-primary">✅ Do This</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                  <span>Verify sender identity through official channels</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                  <span>Use two-factor authentication on all accounts</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                  <span>Keep software and browsers updated</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                  <span>Use reputable antivirus software</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                  <span>Check URLs carefully before clicking</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-destructive">❌ Don't Do This</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <span>Click suspicious links or attachments</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <span>Share personal information via email</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <span>Download software from unknown sources</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <span>Use the same password for multiple accounts</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <span>Ignore security warnings from browsers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};