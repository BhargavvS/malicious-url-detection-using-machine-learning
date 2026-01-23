import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CyberBackground from "@/components/CyberBackground";
import Header from "@/components/Header";
import UrlInput from "@/components/UrlInput";
import ResultDisplay from "@/components/ResultDisplay";
import ScanAnimation from "@/components/ScanAnimation";
import { analyzeUrl, AnalysisResult } from "@/lib/urlAnalyzer";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [scannedUrl, setScannedUrl] = useState<string>("");

  const handleAnalyze = async (url: string) => {
    setIsAnalyzing(true);
    setResult(null);
    setScannedUrl(url);
    
    // Simulate analysis delay for UX
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const analysisResult = analyzeUrl(url);
    setResult(analysisResult);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen relative">
      <CyberBackground />
      
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Header />
        
        <main className="mt-8">
          <UrlInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          
          <AnimatePresence mode="wait">
            {isAnalyzing && <ScanAnimation key="scanning" />}
            {result && !isAnalyzing && (
              <ResultDisplay key="result" result={result} url={scannedUrl} />
            )}
          </AnimatePresence>
        </main>
        
        {/* Footer */}
        <footer className="mt-16 text-center text-muted-foreground text-sm border-t border-border pt-8">
          <p>
            Built with ML-based URL classification • Random Forest Classifier with 21 features
          </p>
          <p className="mt-2">
            Detects: Phishing • Malware • Defacement • Benign URLs
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
