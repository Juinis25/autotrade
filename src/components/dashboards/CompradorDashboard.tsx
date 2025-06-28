
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Heart, Car, Home, MapPin, Calendar } from "lucide-react";

const CompradorDashboard = () => {
  const [featuredProperties] = useState([
    { 
      id: 1, 
      title: 'Departamento 2 amb - Palermo', 
      price: '$85,000', 
      location: 'Palermo, CABA',
      acceptsVehicles: true,
      image: '/placeholder.svg'
    },
    { 
      id: 2, 
      title: 'Casa 3 amb - Belgrano', 
      price: '$120,000', 
      location: 'Belgrano, CABA',
      acceptsVehicles: true,
      image: '/placeholder.svg'
    },
    { 
      id: 3, 
      title: 'Loft moderno - Puerto Madero', 
      price: '$95,000', 
      location: 'Puerto Madero, CABA',
      acceptsVehicles: true,
      image: '/placeholder.svg'
    },
  ]);

  const [myOffers] = useState([
    { 
      id: 1, 
      property: 'Depto 2 amb - Palermo', 
      vehicleOffered: 'Toyota Corolla 2021', 
      status: 'pending',
      offerDate: '2024-01-15'
    },
    { 
      id: 2, 
      property: 'Casa 3 amb - Belgrano', 
      vehicleOffered: 'Honda Civic 2020', 
      status: 'under_review',
      offerDate: '2024-01-10'
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Search className="w-5 h-5 text-white/70" />
            <input
              type="text"
              placeholder="Buscar propiedades..."
              className="flex-1 bg-transparent text-white placeholder:text-white/50 outline-none"
            />
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-500 rounded-full p-2">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-xs">Favoritos</p>
                <p className="text-white font-bold text-lg">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-500 rounded-full p-2">
                <Car className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-xs">Mis ofertas</p>
                <p className="text-white font-bold text-lg">{myOffers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Properties */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center">
            <Home className="w-5 h-5 mr-2" />
            Propiedades Destacadas
          </CardTitle>
          <CardDescription className="text-white/60">
            Que aceptan vehículos como parte de pago
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {featuredProperties.map((property) => (
            <div key={property.id} className="bg-white/5 rounded-lg p-3">
              <div className="flex space-x-3">
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-white/70" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium text-sm mb-1">{property.title}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-3 h-3 text-white/60" />
                    <span className="text-white/60 text-xs">{property.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 font-bold">{property.price}</span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Heart className="w-3 h-3" />
                      </Button>
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                        Ofertar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* My Offers */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center">
            <Car className="w-5 h-5 mr-2" />
            Mis Ofertas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {myOffers.map((offer) => (
            <div key={offer.id} className="bg-white/5 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-white font-medium text-sm">{offer.property}</p>
                  <p className="text-white/70 text-xs">Vehículo: {offer.vehicleOffered}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  offer.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                  offer.status === 'under_review' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {offer.status === 'pending' ? 'Pendiente' :
                   offer.status === 'under_review' ? 'En revisión' : 'Aprobada'}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-white/60" />
                  <span className="text-white/60 text-xs">{offer.offerDate}</span>
                </div>
                <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Ver detalles
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="bg-green-500 hover:bg-green-600 text-white py-3">
          Explorar propiedades
        </Button>
        <Button className="bg-purple-500 hover:bg-purple-600 text-white py-3">
          Registrar mi vehículo
        </Button>
      </div>
    </div>
  );
};

export default CompradorDashboard;
