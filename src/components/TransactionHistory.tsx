
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { History, Download, Filter, Search, CheckCircle, Clock, AlertCircle, DollarSign } from "lucide-react";

interface Transaction {
  id: number;
  type: 'purchase' | 'sale' | 'valuation' | 'commission';
  property?: string;
  vehicle?: string;
  amount: string;
  status: 'completed' | 'pending' | 'cancelled';
  date: string;
  buyer?: string;
  seller?: string;
  commission?: string;
}

interface TransactionHistoryProps {
  userType: 'concesionaria' | 'inmobiliaria' | 'comprador';
  onBack: () => void;
}

const TransactionHistory = ({ userType, onBack }: TransactionHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'cancelled'>('all');
  
  const [transactions] = useState<Transaction[]>(() => {
    const baseTransactions: Transaction[] = [];
    
    if (userType === 'comprador') {
      baseTransactions.push(
        {
          id: 1,
          type: 'purchase',
          property: 'Departamento 2 amb - Palermo',
          vehicle: 'Toyota Corolla 2021',
          amount: '$85,000',
          status: 'completed',
          date: '2024-01-10',
          seller: 'Inmobiliaria Central'
        },
        {
          id: 2,
          type: 'valuation',
          vehicle: 'Honda Civic 2020',
          amount: '$22,000',
          status: 'pending',
          date: '2024-01-15'
        }
      );
    } else if (userType === 'inmobiliaria') {
      baseTransactions.push(
        {
          id: 3,
          type: 'sale',
          property: 'Casa 3 amb - Belgrano',
          vehicle: 'Volkswagen Vento 2022',
          amount: '$120,000',
          status: 'completed',
          date: '2024-01-08',
          buyer: 'Carlos Ruiz',
          commission: '$6,000'
        },
        {
          id: 4,
          type: 'sale',
          property: 'Loft moderno - Puerto Madero',
          vehicle: 'Toyota Corolla 2021',
          amount: '$95,000',
          status: 'pending',
          date: '2024-01-14',
          buyer: 'María González',
          commission: '$4,750'
        }
      );
    } else if (userType === 'concesionaria') {
      baseTransactions.push(
        {
          id: 5,
          type: 'valuation',
          vehicle: 'Toyota Corolla 2021',
          amount: '$18,500',
          status: 'completed',
          date: '2024-01-12',
          commission: '$925'
        },
        {
          id: 6,
          type: 'commission',
          vehicle: 'Honda Civic 2020',
          amount: '$22,000',
          status: 'completed',
          date: '2024-01-09',
          commission: '$1,100'
        }
      );
    }
    
    return baseTransactions;
  });

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.property?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.vehicle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.buyer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.seller?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || transaction.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      default:
        return 'Desconocido';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'purchase':
        return 'Compra';
      case 'sale':
        return 'Venta';
      case 'valuation':
        return 'Valuación';
      case 'commission':
        return 'Comisión';
      default:
        return 'Otro';
    }
  };

  const totalAmount = filteredTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => {
      const amount = parseFloat(t.amount.replace(/[$,]/g, ''));
      return sum + amount;
    }, 0);

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
            <History className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Historial</h2>
            <p className="text-white/70 text-sm">{filteredTransactions.length} transacciones</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 rounded-full p-2">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Total transacciones completadas</p>
                <p className="text-white font-bold text-xl">${totalAmount.toLocaleString()}</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <Search className="w-4 h-4 text-white/70" />
            <input
              type="text"
              placeholder="Buscar transacciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder:text-white/50 outline-none"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => setFilterStatus('all')}
              size="sm"
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              className={filterStatus === 'all' ? 'bg-blue-500 text-white' : 'border-white/30 text-white hover:bg-white/10'}
            >
              Todas
            </Button>
            <Button
              onClick={() => setFilterStatus('completed')}
              size="sm"
              variant={filterStatus === 'completed' ? 'default' : 'outline'}
              className={filterStatus === 'completed' ? 'bg-green-500 text-white' : 'border-white/30 text-white hover:bg-white/10'}
            >
              Completadas
            </Button>
            <Button
              onClick={() => setFilterStatus('pending')}
              size="sm"
              variant={filterStatus === 'pending' ? 'default' : 'outline'}
              className={filterStatus === 'pending' ? 'bg-yellow-500 text-white' : 'border-white/30 text-white hover:bg-white/10'}
            >
              Pendientes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Transacciones Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8">
              <History className="w-12 h-12 text-white/50 mx-auto mb-4" />
              <p className="text-white/70">No se encontraron transacciones</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/20">
                    <TableHead className="text-white/80">Fecha</TableHead>
                    <TableHead className="text-white/80">Tipo</TableHead>
                    <TableHead className="text-white/80">Detalles</TableHead>
                    <TableHead className="text-white/80">Monto</TableHead>
                    <TableHead className="text-white/80">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="border-white/10">
                      <TableCell className="text-white/80">{transaction.date}</TableCell>
                      <TableCell className="text-white/80">{getTypeText(transaction.type)}</TableCell>
                      <TableCell className="text-white/80">
                        <div>
                          {transaction.property && (
                            <p className="text-sm">{transaction.property}</p>
                          )}
                          {transaction.vehicle && (
                            <p className="text-sm text-white/60">{transaction.vehicle}</p>
                          )}
                          {transaction.buyer && (
                            <p className="text-xs text-white/50">Comprador: {transaction.buyer}</p>
                          )}
                          {transaction.seller && (
                            <p className="text-xs text-white/50">Vendedor: {transaction.seller}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-white/80">
                        <div>
                          <p className="font-medium">{transaction.amount}</p>
                          {transaction.commission && (
                            <p className="text-xs text-green-400">Comisión: {transaction.commission}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(transaction.status)}
                          <span className="text-white/80 text-sm">{getStatusText(transaction.status)}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;
