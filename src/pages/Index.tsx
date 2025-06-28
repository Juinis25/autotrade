
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Home, Users, TrendingUp } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'register' | 'dashboard'>('landing');
  const [userType, setUserType] = useState<'concesionaria' | 'inmobiliaria' | 'comprador' | null>(null);

  const handleLogin = (type: 'concesionaria' | 'inmobiliaria' | 'comprador') => {
    setUserType(type);
    setCurrentView('dashboard');
  };

  if (currentView === 'login') {
    return <LoginForm onLogin={handleLogin} onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'register') {
    return <RegisterForm onRegister={handleLogin} onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'dashboard' && userType) {
    return <Dashboard userType={userType} onLogout={() => {
      setCurrentView('landing');
      setUserType(null);
    }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="bg-white/20 backdrop-blur-lg rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Car className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AutoTrade</h1>
          <p className="text-white/80 text-lg">Intercambia vehículos por propiedades</p>
        </div>

        {/* Features Cards */}
        <div className="space-y-4 mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-500 rounded-full p-3">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Para Inmobiliarias</h3>
                  <p className="text-white/70 text-sm">Acepta vehículos como forma de pago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 rounded-full p-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Para Compradores</h3>
                  <p className="text-white/70 text-sm">Usa tu vehículo para comprar propiedades</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-500 rounded-full p-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Liquidación Rápida</h3>
                  <p className="text-white/70 text-sm">Procesamos tu vehículo al instante</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={() => setCurrentView('login')}
            className="w-full bg-white text-purple-600 hover:bg-white/90 font-semibold py-3 text-lg"
          >
            Iniciar Sesión
          </Button>
          <Button 
            onClick={() => setCurrentView('register')}
            variant="outline"
            className="w-full border-white text-white hover:bg-white/10 font-semibold py-3 text-lg"
          >
            Registrarse
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            Plataforma segura para intercambio de vehículos por propiedades
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
