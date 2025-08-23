import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  AlertTriangle, 
  Globe, 
  Clock,
  Target,
  Shield,
  Activity,
  Users
} from "lucide-react";

export const ThreatIntelligence = () => {
  const latestThreats = [
    {
      id: 1,
      title: "Banking Trojan Campaign Targets Mobile Users",
      severity: "Critical",
      category: "Mobile Malware",
      description: "New Android banking trojan discovered targeting major banking apps with sophisticated overlay attacks.",
      dateDetected: "2024-01-15",
      affectedRegions: ["North America", "Europe", "Asia"],
      indicators: ["Fake banking apps", "SMS phishing", "Overlay attacks"],
      riskLevel: 95
    },
    {
      id: 2,
      title: "Business Email Compromise Surge",
      severity: "High",
      category: "BEC Attack",
      description: "400% increase in BEC attacks targeting C-suite executives with sophisticated social engineering.",
      dateDetected: "2024-01-12",
      affectedRegions: ["Global"],
      indicators: ["CEO impersonation", "Wire transfer requests", "Urgent language"],
      riskLevel: 85
    },
    {
      id: 3,
      title: "Cryptocurrency Phishing Domains Spike",
      severity: "High",
      category: "Crypto Fraud",
      description: "Over 2,000 fake cryptocurrency exchange domains registered in the past week.",
      dateDetected: "2024-01-10",
      affectedRegions: ["Global"],
      indicators: ["Typosquatting", "Fake exchanges", "Seed phrase theft"],
      riskLevel: 80
    },
    {
      id: 4,
      title: "Tax Season Phishing Campaign",
      severity: "Medium",
      category: "Seasonal Phishing",
      description: "IRS impersonation emails targeting taxpayers with fake refund notifications.",
      dateDetected: "2024-01-08",
      affectedRegions: ["United States"],
      indicators: ["IRS spoofing", "Refund claims", "Personal info requests"],
      riskLevel: 70
    },
    {
      id: 5,
      title: "Supply Chain Attack Vector Identified",
      severity: "Critical",
      category: "Supply Chain",
      description: "New attack method compromising software update mechanisms in enterprise environments.",
      dateDetected: "2024-01-05",
      affectedRegions: ["Enterprise Global"],
      indicators: ["Update hijacking", "Code injection", "Certificate abuse"],
      riskLevel: 90
    }
  ];

  const stats = [
    { icon: TrendingUp, label: "Threats Blocked Today", value: "847,293", change: "+12%" },
    { icon: Globe, label: "Countries Protected", value: "195", change: "Global" },
    { icon: Users, label: "Users Secured", value: "2.3M", change: "+8%" },
    { icon: Activity, label: "Real-time Scans", value: "15,847", change: "Live" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const getRiskLevelColor = (level: number) => {
    if (level >= 90) return 'text-destructive';
    if (level >= 75) return 'text-warning';
    return 'text-success';
  };

  return (
    <section id="threats" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest Threat Intelligence
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay informed about the latest cybersecurity threats and attack patterns
          </p>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4 text-center bg-gradient-card hover:shadow-card transition-all duration-300">
              <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-xs text-primary font-medium">{stat.change}</div>
            </Card>
          ))}
        </div>

        {/* Threat Feed */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Active Threat Feed</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4 text-success animate-pulse" />
              <span>Live Updates</span>
            </div>
          </div>

          <div className="space-y-4">
            {latestThreats.map((threat) => (
              <Card key={threat.id} className="p-6 hover:shadow-card transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0">
                  {/* Main Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="text-lg font-semibold pr-4">{threat.title}</h4>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <Badge className={getSeverityColor(threat.severity)}>
                          {threat.severity}
                        </Badge>
                        <Badge variant="outline">{threat.category}</Badge>
                      </div>
                    </div>

                    <p className="text-muted-foreground">{threat.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Detected: {threat.dateDetected}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Globe className="h-4 w-4" />
                        <span>Regions: {threat.affectedRegions.join(", ")}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="h-4 w-4" />
                        <span className={`font-medium ${getRiskLevelColor(threat.riskLevel)}`}>
                          Risk: {threat.riskLevel}%
                        </span>
                      </div>
                    </div>

                    {/* Indicators */}
                    <div>
                      <span className="text-sm font-medium text-foreground">Key Indicators: </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {threat.indicators.map((indicator, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {indicator}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Risk Meter */}
                  <div className="flex flex-col items-center space-y-2 md:ml-6">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-muted stroke-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={`stroke-2 ${getRiskLevelColor(threat.riskLevel)}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray={`${threat.riskLevel}, 100`}
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-xs font-bold ${getRiskLevelColor(threat.riskLevel)}`}>
                          {threat.riskLevel}%
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">Risk Level</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Threat Landscape Summary */}
        <Card className="mt-12 p-8 bg-gradient-primary text-primary-foreground shadow-elevated">
          <div className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-4">PhishGuard Threat Intelligence</h3>
            <p className="opacity-90 max-w-2xl mx-auto mb-6">
              Our AI-powered threat intelligence system analyzes over 10 million data points daily 
              to identify emerging threats and protect our users in real-time.
            </p>
            <div className="flex justify-center items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="opacity-80">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="opacity-80">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">&lt;1s</div>
                <div className="opacity-80">Detection</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};