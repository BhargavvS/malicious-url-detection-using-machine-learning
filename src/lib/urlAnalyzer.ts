// URL Feature Extraction based on ML model from the notebook
// Features: use_of_ip, abnormal_url, count., count-www, count@, count_dir, count_embed_domain,
// short_url, count-https, count-http, count%, count?, count-, count=, url_length, hostname_length,
// sus_url, fd_length, tld_length, count-digits, count-letters

export interface UrlFeatures {
  useOfIp: number;
  abnormalUrl: number;
  countDot: number;
  countWww: number;
  countAt: number;
  countDir: number;
  countEmbedDomain: number;
  shortUrl: number;
  countHttps: number;
  countHttp: number;
  countPercent: number;
  countQuestion: number;
  countHyphen: number;
  countEqual: number;
  urlLength: number;
  hostnameLength: number;
  susUrl: number;
  fdLength: number;
  tldLength: number;
  countDigits: number;
  countLetters: number;
}

export type ThreatType = 'benign' | 'phishing' | 'malware' | 'defacement';

export interface AnalysisResult {
  threatType: ThreatType;
  confidence: number;
  features: UrlFeatures;
  riskScore: number;
  warnings: string[];
}

// Check if URL uses IP address
function useOfIp(url: string): number {
  const ipPattern = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;
  return ipPattern.test(url) ? 1 : 0;
}

// Check for abnormal URL (hostname not in URL)
function abnormalUrl(url: string): number {
  try {
    const parsed = new URL(url.startsWith('http') ? url : `http://${url}`);
    return url.includes(parsed.hostname) ? 0 : 1;
  } catch {
    return 1;
  }
}

// Count dots in URL
function countDot(url: string): number {
  return (url.match(/\./g) || []).length;
}

// Count www occurrences
function countWww(url: string): number {
  return (url.match(/www/gi) || []).length;
}

// Count @ symbols
function countAt(url: string): number {
  return (url.match(/@/g) || []).length;
}

// Count directories (slashes in path)
function countDir(url: string): number {
  try {
    const parsed = new URL(url.startsWith('http') ? url : `http://${url}`);
    return (parsed.pathname.match(/\//g) || []).length;
  } catch {
    return 0;
  }
}

// Count embedded domains (double slashes in path)
function countEmbedDomain(url: string): number {
  try {
    const parsed = new URL(url.startsWith('http') ? url : `http://${url}`);
    return (parsed.pathname.match(/\/\//g) || []).length;
  } catch {
    return 0;
  }
}

// Check for URL shortening services
function shortUrl(url: string): number {
  const shorteners = /bit\.ly|goo\.gl|shorte\.st|go2l\.ink|x\.co|ow\.ly|t\.co|tinyurl|tr\.im|is\.gd|cli\.gs|yfrog\.com|migre\.me|ff\.im|tiny\.cc|url4\.eu|twit\.ac|su\.pr|twurl\.nl|snipurl\.com|short\.to|BudURL\.com|ping\.fm|post\.ly|Just\.as|bkite\.com|snipr\.com|fic\.kr|loopt\.us|doiop\.com|short\.ie|kl\.am|wp\.me|rubyurl\.com|om\.ly|to\.ly|bit\.do|lnkd\.in|db\.tt|qr\.ae|adf\.ly|bitly\.com|cur\.lv|tinyurl\.com|ity\.im|q\.gs|po\.st|bc\.vc|twitthis\.com|u\.to|j\.mp|buzurl\.com|cutt\.us|u\.bb|yourls\.org|prettylinkpro\.com|scrnch\.me|filoops\.info|vzturl\.com|qr\.net|1url\.com|tweez\.me|v\.gd|link\.zip\.net/i;
  return shorteners.test(url) ? 1 : 0;
}

// Count https occurrences
function countHttps(url: string): number {
  return (url.match(/https/gi) || []).length;
}

// Count http occurrences
function countHttp(url: string): number {
  return (url.match(/http/gi) || []).length;
}

// Count percent signs
function countPercent(url: string): number {
  return (url.match(/%/g) || []).length;
}

// Count question marks
function countQuestion(url: string): number {
  return (url.match(/\?/g) || []).length;
}

// Count hyphens
function countHyphen(url: string): number {
  return (url.match(/-/g) || []).length;
}

// Count equal signs
function countEqual(url: string): number {
  return (url.match(/=/g) || []).length;
}

// Get hostname length
function hostnameLength(url: string): number {
  try {
    const parsed = new URL(url.startsWith('http') ? url : `http://${url}`);
    return parsed.hostname.length;
  } catch {
    return url.length;
  }
}

// Check for suspicious words
function susUrl(url: string): number {
  const suspiciousWords = /PayPal|login|signin|bank|account|update|free|lucky|service|bonus|ebayisapi|webscr|secure|verify|password|credential/i;
  return suspiciousWords.test(url) ? 1 : 0;
}

// Get first directory length
function fdLength(url: string): number {
  try {
    const parsed = new URL(url.startsWith('http') ? url : `http://${url}`);
    const pathParts = parsed.pathname.split('/').filter(p => p.length > 0);
    return pathParts.length > 0 ? pathParts[0].length : 0;
  } catch {
    return 0;
  }
}

// Get TLD length
function tldLength(url: string): number {
  try {
    const parsed = new URL(url.startsWith('http') ? url : `http://${url}`);
    const parts = parsed.hostname.split('.');
    return parts.length > 0 ? parts[parts.length - 1].length : 0;
  } catch {
    return 0;
  }
}

// Count digits
function countDigits(url: string): number {
  return (url.match(/\d/g) || []).length;
}

// Count letters
function countLetters(url: string): number {
  return (url.match(/[a-zA-Z]/g) || []).length;
}

// Extract all features from URL
export function extractFeatures(url: string): UrlFeatures {
  return {
    useOfIp: useOfIp(url),
    abnormalUrl: abnormalUrl(url),
    countDot: countDot(url),
    countWww: countWww(url),
    countAt: countAt(url),
    countDir: countDir(url),
    countEmbedDomain: countEmbedDomain(url),
    shortUrl: shortUrl(url),
    countHttps: countHttps(url),
    countHttp: countHttp(url),
    countPercent: countPercent(url),
    countQuestion: countQuestion(url),
    countHyphen: countHyphen(url),
    countEqual: countEqual(url),
    urlLength: url.length,
    hostnameLength: hostnameLength(url),
    susUrl: susUrl(url),
    fdLength: fdLength(url),
    tldLength: tldLength(url),
    countDigits: countDigits(url),
    countLetters: countLetters(url),
  };
}

// Analyze URL and classify threat type using feature-based heuristics
// (simulating Random Forest decision logic based on training data patterns)
export function analyzeUrl(url: string): AnalysisResult {
  const features = extractFeatures(url);
  const warnings: string[] = [];
  
  // Risk scoring based on feature weights (derived from ML model importance)
  let riskScore = 0;
  
  // High-risk indicators
  if (features.useOfIp) {
    riskScore += 25;
    warnings.push('URL uses IP address instead of domain name');
  }
  
  if (features.shortUrl) {
    riskScore += 15;
    warnings.push('URL uses a URL shortening service');
  }
  
  if (features.susUrl) {
    riskScore += 20;
    warnings.push('URL contains suspicious keywords');
  }
  
  if (features.countAt > 0) {
    riskScore += 20;
    warnings.push('URL contains @ symbol (potential redirect)');
  }
  
  if (features.abnormalUrl) {
    riskScore += 15;
    warnings.push('Abnormal URL structure detected');
  }
  
  // Medium-risk indicators
  if (features.urlLength > 75) {
    riskScore += 10;
    warnings.push('Unusually long URL');
  }
  
  if (features.countPercent > 2) {
    riskScore += 10;
    warnings.push('Multiple encoded characters detected');
  }
  
  if (features.countHyphen > 4) {
    riskScore += 8;
    warnings.push('Excessive hyphens in URL');
  }
  
  if (features.countDir > 5) {
    riskScore += 8;
    warnings.push('Deep directory structure');
  }
  
  if (features.countEmbedDomain > 0) {
    riskScore += 15;
    warnings.push('Embedded domain detected');
  }
  
  // Low-risk positive indicators
  if (features.countHttps > 0 && features.countHttp === 1) {
    riskScore -= 5;
  }
  
  if (features.hostnameLength < 30 && features.hostnameLength > 5) {
    riskScore -= 3;
  }
  
  // Normalize risk score
  riskScore = Math.max(0, Math.min(100, riskScore));
  
  // Classify threat type based on risk score and features
  let threatType: ThreatType;
  let confidence: number;
  
  if (riskScore < 15) {
    threatType = 'benign';
    confidence = 95 - riskScore * 2;
  } else if (riskScore < 35) {
    threatType = 'benign';
    confidence = 75 - (riskScore - 15);
  } else if (riskScore < 55) {
    // Check for phishing indicators
    if (features.susUrl || features.countAt > 0) {
      threatType = 'phishing';
      confidence = 60 + (riskScore - 35);
    } else {
      threatType = 'defacement';
      confidence = 55 + (riskScore - 35);
    }
  } else if (riskScore < 75) {
    if (features.useOfIp || features.countEmbedDomain > 0) {
      threatType = 'malware';
      confidence = 70 + (riskScore - 55);
    } else if (features.susUrl) {
      threatType = 'phishing';
      confidence = 75 + (riskScore - 55);
    } else {
      threatType = 'defacement';
      confidence = 65 + (riskScore - 55);
    }
  } else {
    // High risk - most likely malware or phishing
    if (features.useOfIp) {
      threatType = 'malware';
    } else if (features.susUrl) {
      threatType = 'phishing';
    } else {
      threatType = 'malware';
    }
    confidence = 85 + Math.min(10, (riskScore - 75) / 2.5);
  }
  
  // Ensure confidence is within bounds
  confidence = Math.max(50, Math.min(98, confidence));
  
  return {
    threatType,
    confidence: Math.round(confidence * 10) / 10,
    features,
    riskScore,
    warnings,
  };
}
