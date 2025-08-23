import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PhishingDetectionCenter } from "@/components/PhishingDetectionCenter";
import { EducationalSection } from "@/components/EducationalSection";
import { SecurityBestPractices } from "@/components/SecurityBestPractices";
import { ThreatIntelligence } from "@/components/ThreatIntelligence";
import { KnowledgeQuiz } from "@/components/KnowledgeQuiz";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PhishingDetectionCenter />
        <EducationalSection />
        <SecurityBestPractices />
        <ThreatIntelligence />
        <KnowledgeQuiz />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
