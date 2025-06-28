
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Plus, Car, Eye, MessageSquare, CheckCircle, Clock, AlertCircle } from "lucide-react";

const InmobiliariaDashboard = () => {
  const [properties] = useState([
    { id: 1, title: 'Departamento 2 amb - Palermo', price: '$85,000', vehicleOffers: 3, status: 'active' },
    { id: 2, title: 'Casa 3 amb - Belgrano', price: '$120,000', vehicleOffers: 1, status: 'active' },
    { id: 3, title: 'Loft moderno - Puerto Madero', price: '$95,000', vehicleOffers: 5, status: 'negotiating' },
  ]);

  const [vehicleOffers] = useState([
    { 
      id: 1, 
      property: 'Depto 2 amb - Palermo', 
      vehicle: 'Toyota Corolla 2021', 
      offeredValue: '$18,500', 
      status: 'pending_valuation',
      buyer: 'Juan Pérez',
      offerDate: '2024-01-15',
      additionalCash: '$5,000'
    },
    { 
      id: 2, 
      property: 'Casa 3 amb - Belgrano', 
      vehicle: 'Honda Civic 2020', 
      offeredValue: '$22,000', 
      status: 'valuated',
      buyer: 'María González',
      offerDate: '2024-01-12',
      additionalCash: '$8,000',
      concessionaireValue: '$20,500'
    },
    { 
      id: 3, 
      property: 'Loft moderno - Puerto Madero', 
      vehicle: 'Volkswagen Vento 2022', 
      offeredValue: '$25,000', 
      status: 'accepted',
      buyer: 'Carlos Ruiz',
      offerDate: '2024-01-10',
      additionalCash: '$3,000',
      concessionaireValue: '$24,200'
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_valuation':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'valuated':
        return 'bg-blue-500/20 text-blue-400';
      case 'accepted':
        return 'bg-green-500/20 text-green-400';
      case 'rejected':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending_valuation':
        return 'Esperando valuación';
      case 'valuated':
        return 'Valuado';
      case 'accepted':
        return 'Aceptado';
      case 'rejected':
        return 'Rechazado';
      default:
        return 'Desconocido';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending_valuation':
        return <Clock className="w-4 h-4" />;
      case 'valuated':
        return <AlertCircle className="w-4 h-4" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-3">
            <div className="text-center">
              <div className="bg-blue-500 rounded-full p-2 w-8 h-8 mx-auto mb-2">
                <Home className="w-4 h-4 text-white" />
              </div>
              <p className="text-white/70 text-xs">Propiedades</p>
              <p className="text-white font-bold">12</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-3">
            <div className="text-center">
              <div className="bg-orange-500 rounded-full p-2 w-8 h-8 mx-auto mb-2">
                <Car className="w-4 h-4 text-white" />
              </div>
              <p className="text-white/70 text-xs">Ofertas</p>
              <p className="text-white font-bold">9</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-3">
            <div className="text-center">
              <div className="bg-green-500 rounded-full p-2 w-8 h-8 mx-auto mb-2">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <p className="text-white/70 text-xs">Negociando</p>
              <p className="text-white font-bold">3</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-4">
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 flex items-center justify-center">
            <Plus className="w-5 h-5 mr-2" />
            Publicar Nueva Propiedad
          </Button>
        </CardContent>
      </Card>

      {/* Vehicle Offers */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center">
            <Car className="w-5 h-5 mr-2" />
            Ofertas de Vehículos
          </CardTitle>
          <CardDescription className="text-white/60">
            Nuevas ofertas pendientes de revisión
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {vehicleOffers.map((offer) => (
            <div key={offer.id} className="bg-white/5 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-white font-medium text-sm">{offer.vehicle}</p>
                    <div className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 ${getStatusColor(offer.status)}`}>
                      {getStatusIcon(offer.status)}
                      <span>{getStatusText(offer.status)}</span>
                    </div>
                  </div>
                  <p className="text-white/70 text-xs mb-1">{offer.property}</p>
                  <p className="text-white/60 text-xs">Por: {offer.buyer} • {offer.offerDate}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-white/5 rounded-lg p-2">
                  <p className="text-white/70 text-xs">Valor estimado</p>
                  <p className="text-green-400 font-bold text-sm">{offer.offeredValue}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2">
                  <p className="text-white/70 text-xs">Efectivo adicional</p>
                  <p className="text-blue-400 font-bold text-sm">{offer.additionalCash}</p>
                </div>
              </div>

              {offer.concessionaireValue && (
                <div className="bg-blue-500/10 rounded-lg p-2 mb-3">
                  <p className="text-blue-400 text-xs">Valuación de concesionaria: <span className="font-bold">{offer.concessionaireValue}</span></p>
                </div>
              )}

              <div className="flex space-x-2">
                {offer.status === 'pending_valuation' && (
                  <>
                    <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      Ver detalles
                    </Button>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white flex-1">
                      Solicitar valuación
                    </Button>
                  </>
                )}
                
                {offer.status === 'valuated' && (
                  <>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white flex-1">
                      Aceptar
                    </Button>
                    <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white flex-1">
                      Rechazar
                    </Button>
                  </>
                )}
                
                {offer.status === 'accepted' && (
                  <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white flex-1">
                    Ver contrato
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* My Properties */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center">
            <Home className="w-5 h-5 mr-2" />
            Mis Propiedades
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {properties.map((property) => (
            <div key={property.id} className="bg-white/5 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-white font-medium text-sm">{property.title}</p>
                  <p className="text-green-400 font-bold">{property.price}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  property.status === 'active' ? 'bg-green-500/20 text-green-400' :
                  property.status === 'negotiating' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {property.status === 'active' ? 'Activa' : 
                   property.status === 'negotiating' ? 'Negociando' : 'Inactiva'}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Car className="w-4 h-4 text-orange-400" />
                  <span className="text-white/70 text-sm">{property.vehicleOffers} ofertas</span>
                </div>
                <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Eye className="w-4 h-4 mr-1" />
                  Ver
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default InmobiliariaDashboard;
