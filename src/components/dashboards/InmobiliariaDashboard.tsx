
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Plus, Car, Eye, MessageSquare } from "lucide-react";

const InmobiliariaDashboard = () => {
  const [properties] = useState([
    { id: 1, title: 'Departamento 2 amb - Palermo', price: '$85,000', vehicleOffers: 3, status: 'active' },
    { id: 2, title: 'Casa 3 amb - Belgrano', price: '$120,000', vehicleOffers: 1, status: 'active' },
    { id: 3, title: 'Loft moderno - Puerto Madero', price: '$95,000', vehicleOffers: 5, status: 'negotiating' },
  ]);

  const [vehicleOffers] = useState([
    { id: 1, property: 'Depto 2 amb - Palermo', vehicle: 'Toyota Corolla 2021', offeredValue: '$18,500', status: 'pending' },
    { id: 2, property: 'Casa 3 amb - Belgrano', vehicle: 'Honda Civic 2020', offeredValue: '$22,000', status: 'valuating' },
  ]);

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

      {/* Vehicle Offers */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center">
            <Car className="w-5 h-5 mr-2" />
            Ofertas de Vehículos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {vehicleOffers.map((offer) => (
            <div key={offer.id} className="bg-white/5 rounded-lg p-3">
              <div className="mb-2">
                <p className="text-white font-medium text-sm">{offer.vehicle}</p>
                <p className="text-white/70 text-xs">{offer.property}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-green-400 font-bold">{offer.offeredValue}</p>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                    Aceptar
                  </Button>
                  <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    Ver
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default InmobiliariaDashboard;
