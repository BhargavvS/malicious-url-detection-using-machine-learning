import { motion } from "framer-motion";
import { Shield, ShieldAlert, ShieldX, AlertTriangle, Check, X } from "lucide-react";
import { AnalysisResult, ThreatType } from "@/lib/urlAnalyzer";
import { Progress } from "@/components/ui/progress";

interface ResultDisplayProps {
  result: AnalysisResult;
  url: string;
}

const threatConfig: Record<ThreatType, { 
  icon: React.ReactNode; 
  label: string; 
  colorClass: string; 
  glowClass: string;
  bgClass: string;
  description: string;
}> = {
  benign: {
    icon: <Shield className="w-16 h-16" />,
    label: "SAFE",
    colorClass: "text-success",
    glowClass: "cyber-glow-success",
    bgClass: "bg-success/10 border-success/30",
    description: "This URL appears to be safe and legitimate.",
  },
  phishing: {
    icon: <ShieldAlert className="w-16 h-16" />,
    label: "PHISHING",
    colorClass: "text-warning",
    glowClass: "cyber-glow-warning",
    bgClass: "bg-warning/10 border-warning/30",
    description: "This URL may be attempting to steal your credentials or personal information.",
  },
  malware: {
    icon: <ShieldX className="w-16 h-16" />,
    label: "MALWARE",
    colorClass: "text-destructive",
    glowClass: "cyber-glow-danger",
    bgClass: "bg-destructive/10 border-destructive/30",
    description: "This URL may distribute malicious software.",
  },
  defacement: {
    icon: <AlertTriangle className="w-16 h-16" />,
    label: "DEFACEMENT",
    colorClass: "text-warning",
    glowClass: "cyber-glow-warning",
    bgClass: "bg-warning/10 border-warning/30",
    description: "This URL may be associated with website defacement activities.",
  },
};

const ResultDisplay = ({ result, url }: ResultDisplayProps) => {
  const config = threatConfig[result.threatType];
  const isSafe = result.threatType === 'benign';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto mt-8"
    >
      {/* Main Result Card */}
      <div className={`relative border rounded-xl p-8 ${config.bgClass}`}>
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-xl blur-xl opacity-20 ${config.colorClass.replace('text-', 'bg-')}`} />
        
        <div className="relative">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className={config.colorClass}
            >
              {config.icon}
            </motion.div>
            
            <div className="text-center md:text-left flex-1">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`font-display text-4xl font-bold ${config.colorClass} text-glow mb-2`}
              >
                {config.label}
              </motion.h2>
              <p className="text-muted-foreground text-lg break-all">
                {url}
              </p>
            </div>
            
            {/* Confidence Circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className={`relative w-28 h-28 flex items-center justify-center rounded-full border-4 ${config.colorClass.replace('text-', 'border-')} ${config.glowClass}`}
            >
              <div className="text-center">
                <span className={`font-display text-2xl font-bold ${config.colorClass}`}>
                  {result.confidence}%
                </span>
                <span className="block text-xs text-muted-foreground">CONFIDENCE</span>
              </div>
            </motion.div>
          </div>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-foreground/80 mb-8"
          >
            {config.description}
          </motion.p>
          
          {/* Risk Score Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">Risk Score</span>
              <span className={`font-display font-bold ${config.colorClass}`}>{result.riskScore}/100</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.riskScore}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-full rounded-full ${
                  result.riskScore < 35 ? 'bg-success' : 
                  result.riskScore < 65 ? 'bg-warning' : 
                  'bg-destructive'
                }`}
              />
            </div>
          </div>
          
          {/* Warnings */}
          {result.warnings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-background/50 border border-border rounded-lg p-6"
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Security Warnings
              </h3>
              <ul className="space-y-2">
                {result.warnings.map((warning, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    {warning}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
          
          {/* Safe indicators */}
          {isSafe && result.warnings.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-success/5 border border-success/20 rounded-lg p-6"
            >
              <h3 className="font-display text-lg font-semibold text-success mb-4 flex items-center gap-2">
                <Check className="w-5 h-5" />
                Security Check Passed
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  No suspicious keywords detected
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  Standard URL structure
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  No URL shortening detected
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Feature Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <FeatureCard label="URL Length" value={result.features.urlLength} />
        <FeatureCard label="Hostname Length" value={result.features.hostnameLength} />
        <FeatureCard label="Directory Depth" value={result.features.countDir} />
        <FeatureCard label="Special Chars" value={result.features.countPercent + result.features.countEqual} />
      </motion.div>
    </motion.div>
  );
};

const FeatureCard = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-card border border-border rounded-lg p-4 text-center">
    <div className="font-display text-2xl font-bold text-primary">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);

export default ResultDisplay;
