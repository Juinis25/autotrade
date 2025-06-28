
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Car, Calendar, Gauge, MapPin, Camera } from "lucide-react";

interface VehicleOfferFormProps {
  propertyTitle: string;
  onBack: () => void;
  onSubmit: (offer: any) => void;
}

const VehicleOfferForm = ({ propertyTitle, onBack, onSubmit }: VehicleOfferFormProps) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    kilometers: '',
    condition: 'excellent',
    color: '',
    fuel: 'gasoline',
    transmission: 'manual',
    plate: '',
    estimatedValue: '',
    additionalCash: '',
    comments: ''
  });

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que el vehículo no tenga más de 5 años
    if (parseInt(formData.year) < minYear) {
      alert(`El vehículo no puede tener más de 5 años de antigüedad. Año mínimo: ${minYear}`);
      return;
    }

    onSubmit({
      ...formData,
      propertyTitle,
      status: 'pending_valuation',
      createdAt: new Date().toISOString()
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
          <h1 className="text-white font-bold text-lg">Hacer Oferta</h1>
          <div className="w-8" />
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-4">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-white/70 text-sm">Oferta para:</p>
                <p className="text-white font-medium">{propertyTitle}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center">
                <Car className="w-5 h-5 mr-2" />
                Datos del Vehículo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/70 text-sm block mb-1">Marca</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    className="w-full bg-white/10 text-white rounded-lg px-3 py-2 outline-none placeholder:text-white/50"
                    placeholder="Toyota"
                    required
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm block mb-1">Modelo</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    className="w-full bg-white/10 text-white rounded-lg px-3 py-2 outline-none placeholder:text-white/50"
                    placeholder="Corolla"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/70 text-sm block mb-1">Año</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    min={minYear}
                    max={currentYear}
                    className="w-full bg-white/10 text-white rounded-lg px-3 py-2 outline-none placeholder:text-white/50"
                    placeholder={currentYear.toString()}
                    required
                  />
                  <p className="text-white/50 text-xs mt-1">Máximo 5 años de antigüedad</p>
                </div>
                <div>
                  <label className="text-white/70 text-sm block mb-1">Kilómetros</label>
                  <input
                    type="number"
                    value={formData.kilometers}
                    onChange={(e) => handleInputChange('kilometers', e.target.value)}
                    className="w-full bg-white/10 text-white rounded-lg px-3 py-2 outline-none placeholder:text-white/50"
                    placeholder="25000"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/70 text-sm block mb-1">Combustible</label>
                  <select
                    value={formData.fuel}
                    onChange={(e) => handleInputChange('fuel', e.target.value)}
                    className="w-full bg-white/10 text-white rounded-lg px-3 py-2 outline-none"
                  >
                    <option value="gasoline">Nafta</option>
                    <option value="diesel">Diesel</option>
                    <option value="hybrid">Híbrido</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/70 text-sm block mb-1">Transmisión</label>
                  <select
                    value={formData.transmission}
                    onChange={(e) => handleInputChange('transmission', e.target.value)}
                    className="w-full bg-white/10 text-white rounded-lg px-3 py-2 outline-none"
                  >
                    <option value="manual">Manual</option>
                    <option value="automatic">Automática</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-white/70 text-sm block mb-1">Estado</label>
                <select
                  value={formData.condition}
                  onChange={(e) => handleInputChange('condition', e.target.value)}
                  className="w-full bg-white/10 text-white rounded-lg px-3 py-2 outline-none"
                >
                  <option value="excellent">Excelente</option>
                  <option value="very_good">Muy bueno</option>
                  <option value="good">Bueno</option>
                  <option value="fair">Regular</option>
                </select>
              </div>

              <div>
                <label className="text-white/70 text-sm block mb-1">Patente</label>
                <input
                  type="text"
                  value={formData.plate}
                  onChange={(e) => handleInputChange('plate', e.target.value.toUpperCase())}
                  className="w-full bg-white/10 text-white rounded-lg px-3 py-2 outline-none placeholder:text-white/50"
                  placeholder="ABC123"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4 space-y-4">
              <div>
                <label className="text-white/70 text-sm block mb-1">Valor estimado (opcional)</label>
                <input
                  type="number"
                  value={formData.estimatedValue}
                  onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                  className="w-full bg-white/10 text-white rounded-lg px-3 py-2 outline-none placeholder:text-white/50"
                  placeholder="18500"
                />
                <p className="text-white/50 text-xs mt-1">La concesionaria hará la valuación oficial</p>
              </div>

              <div>
                <label className="text-white/70 text-sm block mb-1">Efectivo adicional</label>
                <input
                  type="number"
                  value={formData.additionalCash}
                  onChange={(e) => handleInputChange('additionalCash', e.target.value)}
                  className="w-full bg-white/10 text-white rounded-lg px-3 py-2 outline-none placeholder:text-white/50"
                  placeholder="5000"
                />
              </div>

              <div>
                <label className="text-white/70 text-sm block mb-1">Comentarios</label>
                <textarea
                  value={formData.comments}
                  onChange={(e) => handleInputChange('comments', e.target.value)}
                  className="w-full bg-white/10 text-white rounded-lg px-3 py-2 outline-none placeholder:text-white/50 min-h-[80px]"
                  placeholder="Información adicional sobre el vehículo..."
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Camera className="w-5 h-5 text-white/70" />
                <span className="text-white/70">Fotos del vehículo</span>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10"
              >
                Subir fotos
              </Button>
              <p className="text-white/50 text-xs mt-2">Recomendado: exterior, interior, tablero, documentos</p>
            </CardContent>
          </Card>

          <div className="flex space-x-3">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="flex-1 border-white/30 text-white hover:bg-white/10"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
            >
              Enviar Oferta
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleOfferForm;
