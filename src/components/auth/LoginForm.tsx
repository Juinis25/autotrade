
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Car, Home, Users } from "lucide-react";

interface LoginFormProps {
  onLogin: (type: 'concesionaria' | 'inmobiliaria' | 'comprador') => void;
  onBack: () => void;
}

const LoginForm = ({ onLogin, onBack }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'concesionaria' | 'inmobiliaria' | 'comprador' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType) {
      onLogin(userType);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-4">
      <div className="max-w-md mx-auto pt-8">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl">Iniciar Sesión</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* User Type Selection */}
            {!userType && (
              <div className="space-y-3">
                <Label className="text-white">Selecciona tu tipo de cuenta</Label>
                <div className="space-y-2">
                  <Button
                    type="button"
                    onClick={() => setUserType('concesionaria')}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white justify-start"
                  >
                    <Car className="w-4 h-4 mr-2" />
                    Concesionaria
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setUserType('inmobiliaria')}
                    className="w-full bg-green-500 hover:bg-green-600 text-white justify-start"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Inmobiliaria
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setUserType('comprador')}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white justify-start"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Comprador
                  </Button>
                </div>
              </div>
            )}

            {/* Login Form */}
            {userType && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-white">Ingresando como {userType}</Label>
                  <Button
                    type="button"
                    onClick={() => setUserType(null)}
                    variant="ghost"
                    size="sm"
                    className="text-white/70"
                  >
                    Cambiar
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-white text-purple-600 hover:bg-white/90 font-semibold">
                  Iniciar Sesión
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
