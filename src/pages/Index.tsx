
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, EyeOff, Lock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PasswordAnalyzer from '@/components/PasswordAnalyzer';
import StrengthMeter from '@/components/StrengthMeter';
import SecurityTips from '@/components/SecurityTips';

const Index = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState({ score: 0, level: 'Weak', color: 'bg-red-500' });
  const [analysis, setAnalysis] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            NLP Password Strength
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Classifier</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Advanced machine learning powered password analysis to help you create unbreakable passwords
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Password Input Card */}
          <Card className="bg-white/5 backdrop-blur-lg border-white/10 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-3">
                <Lock className="w-6 h-6 text-blue-400" />
                Test Your Password Strength
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  Enter your password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type your password here..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-12 h-12 text-lg"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {password && (
                <>
                  <StrengthMeter password={password} onAnalysis={setAnalysis} onStrengthChange={setStrength} />
                  <PasswordAnalyzer password={password} analysis={analysis} />
                </>
              )}
            </CardContent>
          </Card>

          {/* Security Tips */}
          <SecurityTips />

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Real-time Analysis</h3>
                <p className="text-gray-400 text-sm">
                  Get instant feedback as you type with our advanced NLP algorithms
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">ML-Powered</h3>
                <p className="text-gray-400 text-sm">
                  Machine learning models trained on millions of password patterns
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Smart Suggestions</h3>
                <p className="text-gray-400 text-sm">
                  Receive personalized tips to improve your password security
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
