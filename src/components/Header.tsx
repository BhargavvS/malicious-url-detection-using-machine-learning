import { motion } from "framer-motion";
import { Shield, Terminal } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-12"
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-primary/10 border border-primary/30 mb-6 cyber-glow"
      >
        <Shield className="w-10 h-10 text-primary" />
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="font-display text-5xl md:text-6xl font-black gradient-text mb-4"
      >
        URL THREAT SCANNER
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6"
      >
        Advanced ML-powered URL analysis to detect phishing, malware, and defacement threats
      </motion.p>
      
      {/* Tech badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-3 flex-wrap"
      >
        <Badge icon={<Terminal className="w-3 h-3" />} text="Random Forest ML" />
        <Badge icon={<Shield className="w-3 h-3" />} text="21 Security Features" />
        <Badge text="96.7% Accuracy" />
      </motion.div>
    </motion.header>
  );
};

const Badge = ({ icon, text }: { icon?: React.ReactNode; text: string }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary border border-border rounded-full text-xs text-muted-foreground">
    {icon}
    {text}
  </span>
);

export default Header;
