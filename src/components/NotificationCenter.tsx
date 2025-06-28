
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle, Clock, AlertCircle, X, Car, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: number;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: 'offer' | 'valuation' | 'transaction' | 'system';
}

interface NotificationCenterProps {
  userType: 'concesionaria' | 'inmobiliaria' | 'comprador';
  onBack: () => void;
}

const NotificationCenter = ({ userType, onBack }: NotificationCenterProps) => {
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    // Notificaciones específicas por tipo de usuario
    const baseNotifications: Notification[] = [];
    
    if (userType === 'comprador') {
      baseNotifications.push(
        {
          id: 1,
          type: 'success',
          title: 'Oferta aceptada',
          message: 'Tu oferta por el departamento en Palermo ha sido aceptada. La concesionaria ya está valuando tu vehículo.',
          timestamp: '2024-01-15 14:30',
          read: false,
          category: 'offer'
        },
        {
          id: 2,
          type: 'info',
          title: 'Valuación completada',
          message: 'Tu Toyota Corolla 2021 ha sido valuado en $18,500. Revisa los detalles.',
          timestamp: '2024-01-14 10:15',
          read: true,
          category: 'valuation'
        }
      );
    } else if (userType === 'inmobiliaria') {
      baseNotifications.push(
        {
          id: 3,
          type: 'warning',
          title: 'Nueva oferta recibida',
          message: 'Recibiste una nueva oferta de vehículo para la casa en Belgrano. Requiere tu aprobación.',
          timestamp: '2024-01-16 09:45',
          read: false,
          category: 'offer'
        },
        {
          id: 4,
          type: 'success',
          title: 'Transacción completada',
          message: 'La venta del loft en Puerto Madero se ha completado exitosamente.',
          timestamp: '2024-01-13 16:20',
          read: true,
          category: 'transaction'
        }
      );
    } else if (userType === 'concesionaria') {
      baseNotifications.push(
        {
          id: 5,
          type: 'info',
          title: 'Solicitud de valuación',
          message: 'Nueva solicitud de valuación para Honda Civic 2020. Pendiente de revisión.',
          timestamp: '2024-01-16 11:30',
          read: false,
          category: 'valuation'
        },
        {
          id: 6,
          type: 'success',
          title: 'Liquidación procesada',
          message: 'Se ha procesado la liquidación de $22,000 por la transacción del vehículo.',
          timestamp: '2024-01-12 14:45',
          read: true,
          category: 'transaction'
        }
      );
    }
    
    return baseNotifications;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (category: string) => {
    switch (category) {
      case 'offer':
      case 'valuation':
        return <Car className="w-4 h-4" />;
      case 'transaction':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-400 bg-green-500/20';
      case 'warning':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'error':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-blue-400 bg-blue-500/20';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast({
      title: "Notificación eliminada",
      description: "La notificación ha sido eliminada correctamente."
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "Todas las notificaciones marcadas como leídas",
      description: `${unreadCount} notificaciones marcadas como leídas.`
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-white/10"
        >
          ← Volver
        </Button>
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 rounded-full p-2">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Notificaciones</h2>
            {unreadCount > 0 && (
              <p className="text-white/70 text-sm">{unreadCount} sin leer</p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      {unreadCount > 0 && (
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-4">
            <Button
              onClick={markAllAsRead}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Marcar todas como leídas
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-white/50 mx-auto mb-4" />
              <p className="text-white/70">No tienes notificaciones</p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`bg-white/10 backdrop-blur-lg border-white/20 ${
                !notification.read ? 'ring-2 ring-blue-400/50' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`rounded-full p-2 ${getTypeColor(notification.type)}`}>
                    {getIcon(notification.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-white font-medium text-sm">
                          {notification.title}
                          {!notification.read && (
                            <span className="ml-2 w-2 h-2 bg-blue-400 rounded-full inline-block"></span>
                          )}
                        </h3>
                        <p className="text-white/70 text-xs">{notification.timestamp}</p>
                      </div>
                      <Button
                        onClick={() => deleteNotification(notification.id)}
                        variant="ghost"
                        size="sm"
                        className="text-white/60 hover:text-white hover:bg-white/10 p-1"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-white/80 text-sm mb-3">{notification.message}</p>
                    <div className="flex space-x-2">
                      {!notification.read && (
                        <Button
                          onClick={() => markAsRead(notification.id)}
                          size="sm"
                          variant="outline"
                          className="border-white/30 text-white hover:bg-white/10"
                        >
                          Marcar como leída
                        </Button>
                      )}
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
