
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Shield, Key, Lock } from 'lucide-react';

const SecurityTips = () => {
  const tips = [
    {
      icon: <Key className="w-5 h-5 text-blue-400" />,
      title: "Use a mix of characters",
      description: "Combine uppercase, lowercase, numbers, and special characters for maximum security."
    },
    {
      icon: <Shield className="w-5 h-5 text-green-400" />,
      title: "Make it long",
      description: "Longer passwords are exponentially harder to crack. Aim for at least 12 characters."
    },
    {
      icon: <Lock className="w-5 h-5 text-purple-400" />,
      title: "Avoid common patterns",
      description: "Don't use dictionary words, personal information, or predictable patterns like '123456'."
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-yellow-400" />,
      title: "Use passphrases",
      description: "Consider using memorable phrases with random words, numbers, and symbols."
    }
  ];

  return (
    <Card className="bg-white/5 backdrop-blur-lg border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          Password Security Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex-shrink-0 mt-1">
                {tip.icon}
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">{tip.title}</h4>
                <p className="text-gray-400 text-sm">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityTips;
