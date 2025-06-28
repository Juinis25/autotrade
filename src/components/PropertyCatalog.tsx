
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, MapPin, Car, Heart, ArrowLeft } from "lucide-react";

interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  type: string;
  rooms: number;
  bathrooms: number;
  area: string;
  acceptsVehicles: boolean;
  image: string;
  description: string;
  realEstateAgent: string;
}

interface PropertyCatalogProps {
  onBack: () => void;
}

const PropertyCatalog = ({ onBack }: PropertyCatalogProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const [properties] = useState<Property[]>([
    {
      id: 1,
      title: 'Departamento moderno en Palermo',
      price: '$85,000',
      location: 'Palermo, CABA',
      type: 'Departamento',
      rooms: 2,
      bathrooms: 1,
      area: '55m²',
      acceptsVehicles: true,
      image: '/placeholder.svg',
      description: 'Hermoso departamento con balcón y excelente ubicación',
      realEstateAgent: 'Inmobiliaria Central'
    },
    {
      id: 2,
      title: 'Casa familiar en Belgrano',
      price: '$120,000',
      location: 'Belgrano, CABA',
      type: 'Casa',
      rooms: 3,
      bathrooms: 2,
      area: '85m²',
      acceptsVehicles: true,
      image: '/placeholder.svg',
      description: 'Casa con jardín y garage para 2 autos',
      realEstateAgent: 'Propiedades del Sur'
    },
    {
      id: 3,
      title: 'Loft en Puerto Madero',
      price: '$95,000',
      location: 'Puerto Madero, CABA',
      type: 'Loft',
      rooms: 1,
      bathrooms: 1,
      area: '42m²',
      acceptsVehicles: true,
      image: '/placeholder.svg',
      description: 'Loft moderno con vista al río',
      realEstateAgent: 'Madero Properties'
    }
  ]);

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || property.type.toLowerCase() === filterType;
    return matchesSearch && matchesFilter && property.acceptsVehicles;
  });

  if (selectedProperty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-4">
        <div className="max-w-md mx-auto">
          <Button
            onClick={() => setSelectedProperty(null)}
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al catálogo
          </Button>
          
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-6">
            <div className="h-48 bg-white/20 rounded-t-lg flex items-center justify-center">
              <MapPin className="w-12 h-12 text-white/70" />
            </div>
            <CardContent className="p-4">
              <h2 className="text-white font-bold text-xl mb-2">{selectedProperty.title}</h2>
              <p className="text-green-400 font-bold text-2xl mb-3">{selectedProperty.price}</p>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center bg-white/5 rounded-lg p-2">
                  <p className="text-white/70 text-xs">Habitaciones</p>
                  <p className="text-white font-bold">{selectedProperty.rooms}</p>
                </div>
                <div className="text-center bg-white/5 rounded-lg p-2">
                  <p className="text-white/70 text-xs">Baños</p>
                  <p className="text-white font-bold">{selectedProperty.bathrooms}</p>
                </div>
                <div className="text-center bg-white/5 rounded-lg p-2">
                  <p className="text-white/70 text-xs">Área</p>
                  <p className="text-white font-bold">{selectedProperty.area}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-white/70 text-sm mb-2">Ubicación</p>
                <p className="text-white">{selectedProperty.location}</p>
              </div>

              <div className="mb-4">
                <p className="text-white/70 text-sm mb-2">Descripción</p>
                <p className="text-white">{selectedProperty.description}</p>
              </div>

              <div className="mb-6">
                <p className="text-white/70 text-sm mb-2">Inmobiliaria</p>
                <p className="text-white">{selectedProperty.realEstateAgent}</p>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <Car className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">Acepta vehículos como parte de pago</span>
              </div>

              <div className="flex space-x-3">
                <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                  Hacer oferta con vehículo
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-white font-bold text-xl">Catálogo</h1>
          <div className="w-8" />
        </div>

        {/* Search and Filter */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-6">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <Search className="w-4 h-4 text-white/70" />
              <input
                type="text"
                placeholder="Buscar propiedades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder:text-white/50 outline-none"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <Filter className="w-4 h-4 text-white/70" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="flex-1 bg-white/10 text-white rounded-lg px-3 py-2 outline-none"
              >
                <option value="all">Todos los tipos</option>
                <option value="departamento">Departamentos</option>
                <option value="casa">Casas</option>
                <option value="loft">Lofts</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Properties List */}
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-4">
                <div className="flex space-x-3">
                  <div className="w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-white/70" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{property.title}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-3 h-3 text-white/60" />
                      <span className="text-white/60 text-xs">{property.location}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-green-400 font-bold text-lg">{property.price}</span>
                      <span className="text-white/70 text-xs">{property.rooms} amb</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Car className="w-3 h-3 text-green-400" />
                      <span className="text-green-400 text-xs">Acepta vehículos</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="bg-blue-500 hover:bg-blue-600 text-white flex-1"
                        onClick={() => setSelectedProperty(property)}
                      >
                        Ver detalles
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        <Heart className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6 text-center">
              <p className="text-white/70">No se encontraron propiedades que coincidan con tu búsqueda.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PropertyCatalog;
