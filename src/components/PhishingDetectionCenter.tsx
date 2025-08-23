import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { PhishingDetector, PhishingResult } from "@/services/PhishingDetector";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  ExternalLink, 
  Clock,
  TrendingUp,
  AlertCircle,
  Loader2
} from "lucide-react";

export const PhishingDetectionCenter = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PhishingResult | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);
    setResult(null);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const analysisResult = await PhishingDetector.analyzeURL(url);
      
      clearInterval(progressInterval);
      setProgress(100);
      setResult(analysisResult);
      
      toast({
        title: "Analysis Complete",
        description: `URL classified as: ${analysisResult.classification}`,
        variant: analysisResult.classification === 'Safe' ? 'default' : 'destructive',
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Please check the URL format and try again",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getClassificationIcon = (classification: string) => {
    switch (classification) {
      case 'Safe':
        return <CheckCircle className="h-6 w-6 text-success" />;
      case 'Suspicious':
        return <AlertTriangle className="h-6 w-6 text-warning" />;
      case 'Phishing':
        return <AlertCircle className="h-6 w-6 text-destructive" />;
      default:
        return <Shield className="h-6 w-6" />;
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'Safe':
        return 'bg-gradient-success';
      case 'Suspicious':
        return 'bg-warning';
      case 'Phishing':
        return 'bg-gradient-danger';
      default:
        return 'bg-muted';
    }
  };

  return (
    <section id="detection" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Phishing Detection Center
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Enter any URL below to analyze it for potential phishing threats using our 
            advanced 24-feature detection system
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* URL Input Form */}
          <Card className="p-6 mb-8 shadow-card">
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="h-12 text-lg"
                    disabled={isAnalyzing}
                  />
                </div>
                <Button 
                  type="submit" 
                  variant="analyze" 
                  size="lg"
                  disabled={isAnalyzing}
                  className="h-12 px-8"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5 mr-2" />
                      Analyze URL
                    </>
                  )}
                </Button>
              </div>
              
              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Analyzing security features...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </form>
          </Card>

          {/* Results Display */}
          {result && (
            <div className="space-y-6">
              {/* Overall Result */}
              <Card className={`p-6 ${getClassificationColor(result.classification)} text-white shadow-elevated`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getClassificationIcon(result.classification)}
                    <div>
                      <h3 className="text-2xl font-bold">{result.classification}</h3>
                      <p className="opacity-90">Confidence: {result.confidence}%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-90">Overall Score</div>
                    <div className="text-3xl font-bold">{result.overallScore.toFixed(1)}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm opacity-90">
                  <ExternalLink className="h-4 w-4" />
                  <span className="truncate">{result.url}</span>
                </div>
              </Card>

              {/* Recommendations */}
              <Card className="p-6 shadow-card">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  Security Recommendations
                </h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Feature Analysis */}
              <Card className="p-6 shadow-card">
                <h4 className="text-lg font-semibold mb-6 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Detailed Feature Analysis ({result.features.length} Features)
                </h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {result.features.map((feature, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        feature.value === -1 
                          ? 'border-destructive bg-destructive/5'
                          : feature.value === 1
                          ? 'border-warning bg-warning/5'
                          : 'border-success bg-success/5'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">{feature.name}</h5>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          feature.value === -1 
                            ? 'bg-destructive text-destructive-foreground'
                            : feature.value === 1
                            ? 'bg-warning text-warning-foreground'
                            : 'bg-success text-success-foreground'
                        }`}>
                          {feature.value === -1 ? 'Risk' : feature.value === 1 ? 'Warning' : 'Safe'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Weight: {feature.weight} | Score: {feature.value * feature.weight}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};