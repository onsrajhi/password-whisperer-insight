
import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

interface StrengthMeterProps {
  password: string;
  onAnalysis: (analysis: any) => void;
  onStrengthChange: (strength: any) => void;
}

const StrengthMeter: React.FC<StrengthMeterProps> = ({ password, onAnalysis, onStrengthChange }) => {
  const [strength, setStrength] = useState({ score: 0, level: 'Weak', color: 'bg-red-500' });

  const calculateStrength = (pwd: string) => {
    if (!pwd) return { score: 0, level: 'None', color: 'bg-gray-500' };

    let score = 0;
    let feedback = [];

    // Length scoring
    if (pwd.length >= 8) score += 20;
    else if (pwd.length >= 6) score += 10;
    else feedback.push("Password too short");

    // Character variety
    if (/[a-z]/.test(pwd)) score += 10;
    if (/[A-Z]/.test(pwd)) score += 15;
    if (/\d/.test(pwd)) score += 15;
    if (/[^a-zA-Z\d]/.test(pwd)) score += 20;

    // Length bonus
    if (pwd.length >= 12) score += 10;
    if (pwd.length >= 16) score += 10;

    // Pattern penalties
    if (/(123|abc|password|qwerty|admin)/i.test(pwd)) score -= 20;
    if (/(.)\1{2,}/.test(pwd)) score -= 10;

    // Entropy bonus (character variety across length)
    const uniqueChars = new Set(pwd).size;
    const entropyBonus = Math.min(10, (uniqueChars / pwd.length) * 20);
    score += entropyBonus;

    score = Math.max(0, Math.min(100, score));

    let level, color, bgColor;
    if (score < 30) {
      level = 'Weak';
      color = 'text-red-400';
      bgColor = 'bg-red-500';
    } else if (score < 60) {
      level = 'Medium';
      color = 'text-yellow-400';
      bgColor = 'bg-yellow-500';
    } else if (score < 80) {
      level = 'Good';
      color = 'text-blue-400';
      bgColor = 'bg-blue-500';
    } else {
      level = 'Strong';
      color = 'text-green-400';
      bgColor = 'bg-green-500';
    }

    return { score, level, color, bgColor, feedback };
  };

  useEffect(() => {
    const analysis = calculateStrength(password);
    setStrength(analysis);
    onAnalysis(analysis);
    onStrengthChange(analysis);
  }, [password, onAnalysis, onStrengthChange]);

  const getStrengthIcon = () => {
    const iconClass = `w-5 h-5 ${strength.color}`;
    return <Shield className={iconClass} />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getStrengthIcon()}
          <span className="text-white font-medium">Password Strength</span>
        </div>
        <Badge 
          variant="outline" 
          className={`${strength.color} border-current font-semibold`}
        >
          {strength.level}
        </Badge>
      </div>
      
      <div className="space-y-2">
        <Progress 
          value={strength.score} 
          className="h-3 bg-white/10"
        />
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Strength Score</span>
          <span className={strength.color}>{strength.score}/100</span>
        </div>
      </div>

      {/* Strength indicator bars */}
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`flex-1 h-2 rounded-full transition-all duration-300 ${
              strength.score >= level * 25 
                ? strength.bgColor 
                : 'bg-white/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StrengthMeter;
