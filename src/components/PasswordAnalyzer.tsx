
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, Shield } from 'lucide-react';

interface PasswordAnalysisProps {
  password: string;
  analysis: any;
}

const PasswordAnalyzer: React.FC<PasswordAnalysisProps> = ({ password, analysis }) => {
  const analyzePassword = (pwd: string) => {
    const checks = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /\d/.test(pwd),
      symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
      noCommonPatterns: !/(123|abc|password|qwerty)/i.test(pwd),
      noRepeats: !/(.)\1{2,}/.test(pwd)
    };

    const suggestions = [];
    if (!checks.length) suggestions.push("Use at least 8 characters");
    if (!checks.uppercase) suggestions.push("Add uppercase letters (A-Z)");
    if (!checks.lowercase) suggestions.push("Add lowercase letters (a-z)");
    if (!checks.numbers) suggestions.push("Include numbers (0-9)");
    if (!checks.symbols) suggestions.push("Add special characters (!@#$%^&*)");
    if (!checks.noCommonPatterns) suggestions.push("Avoid common patterns like '123' or 'password'");
    if (!checks.noRepeats) suggestions.push("Avoid repeating characters");

    return { checks, suggestions };
  };

  const { checks, suggestions } = analyzePassword(password);
  const passedChecks = Object.values(checks).filter(Boolean).length;
  const totalChecks = Object.keys(checks).length;

  const CheckItem = ({ label, passed }: { label: string; passed: boolean }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
      <span className="text-gray-300">{label}</span>
      <div className="flex items-center gap-2">
        {passed ? (
          <CheckCircle className="w-5 h-5 text-green-400" />
        ) : (
          <XCircle className="w-5 h-5 text-red-400" />
        )}
        <Badge variant={passed ? "default" : "destructive"} className="text-xs">
          {passed ? "✓" : "✗"}
        </Badge>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Security Checks */}
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Security Analysis ({passedChecks}/{totalChecks} checks passed)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <CheckItem label="At least 8 characters" passed={checks.length} />
          <CheckItem label="Contains uppercase letters" passed={checks.uppercase} />
          <CheckItem label="Contains lowercase letters" passed={checks.lowercase} />
          <CheckItem label="Contains numbers" passed={checks.numbers} />
          <CheckItem label="Contains special characters" passed={checks.symbols} />
          <CheckItem label="No common patterns" passed={checks.noCommonPatterns} />
          <CheckItem label="No character repetition" passed={checks.noRepeats} />
        </CardContent>
      </Card>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Improvement Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  {suggestion}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PasswordAnalyzer;
