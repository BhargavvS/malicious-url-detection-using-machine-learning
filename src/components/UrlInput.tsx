import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

const UrlInput = ({ onAnalyze, isAnalyzing }: UrlInputProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-lg blur-lg opacity-75 animate-pulse-glow" />
        
        <div className="relative bg-card border border-border rounded-lg p-2">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 pl-3">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to scan (e.g., https://example.com)"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-lg py-4 px-2 outline-none focus:ring-0"
              disabled={isAnalyzing}
            />
            
            <Button
              type="submit"
              disabled={!url.trim() || isAnalyzing}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold px-8 py-6 text-lg cyber-glow transition-all duration-300 hover:scale-105"
            >
              {isAnalyzing ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Search className="w-5 h-5 mr-2" />
              )}
              {isAnalyzing ? "SCANNING" : "SCAN"}
            </Button>
          </div>
        </div>
      </form>
      
      <p className="text-center text-muted-foreground text-sm mt-4">
        Powered by Machine Learning • Random Forest Classifier
      </p>
    </motion.div>
  );
};

export default UrlInput;
