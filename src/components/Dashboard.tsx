
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { LogOut, Car, Home, TrendingUp, Plus } from "lucide-react";
import ConcesionariaDashboard from './dashboards/ConcesionariaDashboard';
import InmobiliariaDashboard from './dashboards/InmobiliariaDashboard';
import CompradorDashboard from './dashboards/CompradorDashboard';

interface DashboardProps {
  userType: 'concesionaria' | 'inmobiliaria' | 'comprador';
  onLogout: () => void;
}

const Dashboard = ({ userType, onLogout }: DashboardProps) => {
  const getTitle = () => {
    switch (userType) {
      case 'concesionaria':
        return 'Panel Concesionaria';
      case 'inmobiliaria':
        return 'Panel Inmobiliaria';
      case 'comprador':
        return 'Panel Comprador';
      default:
        return 'Dashboard';
    }
  };

  const getIcon = () => {
    switch (userType) {
      case 'concesionaria':
        return <Car className="w-6 h-6" />;
      case 'inmobiliaria':
        return <Home className="w-6 h-6" />;
      case 'comprador':
        return <TrendingUp className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const getGradient = () => {
    switch (userType) {
      case 'concesionaria':
        return 'from-orange-500 via-red-500 to-pink-500';
      case 'inmobiliaria':
        return 'from-green-500 via-emerald-500 to-teal-500';
      case 'comprador':
        return 'from-blue-500 via-indigo-500 to-purple-500';
      default:
        return 'from-purple-600 via-blue-600 to-cyan-500';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getGradient()}`}>
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 rounded-full p-2">
              {getIcon()}
            </div>
            <h1 className="text-white font-bold text-lg">{getTitle()}</h1>
          </div>
          <Button
            onClick={onLogout}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {userType === 'concesionaria' && <ConcesionariaDashboard />}
        {userType === 'inmobiliaria' && <InmobiliariaDashboard />}
        {userType === 'comprador' && <CompradorDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;
