import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, DollarSign, Clock, CheckCircle, AlertCircle, Bell, History } from "lucide-react";
import NotificationCenter from '../NotificationCenter';
import TransactionHistory from '../TransactionHistory';

const ConcesionariaDashboard = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'notifications' | 'history'>('dashboard');

  const [pendingValuations] = useState([
    { id: 1, vehicleBrand: 'Toyota', vehicleModel: 'Corolla', year: 2021, km: 25000, requestedBy: 'Inmobiliaria Central', status: 'pending' },
    { id: 2, vehicleBrand: 'Honda', vehicleModel: 'Civic', year: 2020, km: 35000, requestedBy: 'Propiedades del Sur', status: 'pending' },
  ]);

  const [recentLiquidations] = useState([
    { id: 1, amount: '$18,500', property: 'Depto 2 amb - Palermo', commission: '$925', status: 'completed' },
    { id: 2, amount: '$22,000', property: 'Casa 3 amb - Belgrano', commission: '$1,100', status: 'processing' },
  ]);

  if (currentView === 'notifications') {
    return <NotificationCenter userType="concesionaria" onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'history') {
    return <TransactionHistory userType="concesionaria" onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-500 rounded-full p-2">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-xs">Pendientes</p>
                <p className="text-white font-bold text-lg">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 rounded-full p-2">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-xs">Este mes</p>
                <p className="text-white font-bold text-lg">$125K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications & History */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-4">
            <Button
              onClick={() => setCurrentView('notifications')}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 flex items-center justify-center"
            >
              <Bell className="w-5 h-5 mr-2" />
              <div className="text-left">
                <p className="text-sm font-medium">Notificaciones</p>
                <p className="text-xs opacity-80">1 nueva</p>
              </div>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-4">
            <Button
              onClick={() => setCurrentView('history')}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 flex items-center justify-center"
            >
              <History className="w-5 h-5 mr-2" />
              <div className="text-left">
                <p className="text-sm font-medium">Historial</p>
                <p className="text-xs opacity-80">Ver liquidaciones</p>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Pending Valuations */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center">
            <Car className="w-5 h-5 mr-2" />
            Valuaciones Pendientes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingValuations.map((valuation) => (
            <div key={valuation.id} className="bg-white/5 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-white font-medium">{valuation.vehicleBrand} {valuation.vehicleModel}</p>
                  <p className="text-white/70 text-sm">{valuation.year} • {valuation.km.toLocaleString()} km</p>
                </div>
                <div className="bg-yellow-500/20 rounded-full p-1">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                </div>
              </div>
              <p className="text-white/60 text-xs mb-3">Solicitado por: {valuation.requestedBy}</p>
              <div className="flex space-x-2">
                <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white flex-1">
                  Valuar
                </Button>
                <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 flex-1">
                  Ver detalles
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Liquidations */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Liquidaciones Recientes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentLiquidations.map((liquidation) => (
            <div key={liquidation.id} className="bg-white/5 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-white font-medium">{liquidation.amount}</p>
                  <p className="text-white/70 text-sm">{liquidation.property}</p>
                </div>
                <div className={`rounded-full p-1 ${
                  liquidation.status === 'completed' ? 'bg-green-500/20' : 'bg-orange-500/20'
                }`}>
                  {liquidation.status === 'completed' ? 
                    <CheckCircle className="w-4 h-4 text-green-400" /> :
                    <Clock className="w-4 h-4 text-orange-400" />
                  }
                </div>
              </div>
              <p className="text-white/60 text-xs">Comisión: {liquidation.commission}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white py-3">
          Ver todas las valuaciones
        </Button>
        <Button className="bg-purple-500 hover:bg-purple-600 text-white py-3">
          Historial liquidaciones
        </Button>
      </div>
    </div>
  );
};

export default ConcesionariaDashboard;
