import React, { useState } from 'react';
import { Shuffle, Copy, Trash2, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { generateMultipleCombinations, copyToClipboard } from '../utils/generators';

const NumberGenerator = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    min: 1,
    max: 56,
    count: 6,
    combinations: 5
  });
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);

  const handleGenerate = () => {
    try {
      const { min, max, count, combinations } = config;
      
      if (min >= max) {
        toast({
          title: 'Error',
          description: 'El número mínimo debe ser menor que el máximo',
          variant: 'destructive'
        });
        return;
      }

      if (count > (max - min + 1)) {
        toast({
          title: 'Error',
          description: `No puedes generar ${count} números únicos en el rango ${min}-${max}`,
          variant: 'destructive'
        });
        return;
      }

      const generated = generateMultipleCombinations(min, max, count, combinations);
      setResults(generated);
      
      // Add to history
      const historyItem = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        config: { ...config },
        results: generated
      };
      setHistory([historyItem, ...history.slice(0, 9)]); // Keep last 10

      toast({
        title: '¡Generado!',
        description: `${combinations} combinaciones creadas exitosamente`
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleCopy = async (combination) => {
    const text = combination.join(', ');
    const success = await copyToClipboard(text);
    if (success) {
      toast({
        title: 'Copiado',
        description: 'Combinación copiada al portapapeles'
      });
    }
  };

  const handleCopyAll = async () => {
    const text = results.map((combo, i) => `#${i + 1}: ${combo.join(', ')}`).join('\n');
    const success = await copyToClipboard(text);
    if (success) {
      toast({
        title: 'Copiado',
        description: 'Todas las combinaciones copiadas'
      });
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  const clearHistory = () => {
    setHistory([]);
    toast({
      title: 'Historial limpio',
      description: 'Se ha eliminado el historial'
    });
  };

  return (
    <div className="space-y-8">
      {/* Configuration */}
      <Card className="bg-[#1a1a1a] border-gray-800 p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <Shuffle className="mr-2 text-[#00d9ff]" size={24} />
          Configuración
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="text-gray-300 mb-2 block">Número Mínimo</Label>
            <Input
              type="number"
              value={config.min}
              onChange={(e) => setConfig({ ...config, min: parseInt(e.target.value) || 0 })}
              className="bg-[#2a2a2a] border-gray-700 text-white"
            />
          </div>
          
          <div>
            <Label className="text-gray-300 mb-2 block">Número Máximo</Label>
            <Input
              type="number"
              value={config.max}
              onChange={(e) => setConfig({ ...config, max: parseInt(e.target.value) || 0 })}
              className="bg-[#2a2a2a] border-gray-700 text-white"
            />
          </div>
          
          <div>
            <Label className="text-gray-300 mb-2 block">Números por Combinación</Label>
            <Input
              type="number"
              value={config.count}
              onChange={(e) => setConfig({ ...config, count: parseInt(e.target.value) || 1 })}
              className="bg-[#2a2a2a] border-gray-700 text-white"
            />
          </div>
          
          <div>
            <Label className="text-gray-300 mb-2 block">Cantidad de Combinaciones</Label>
            <Input
              type="number"
              value={config.combinations}
              onChange={(e) => setConfig({ ...config, combinations: parseInt(e.target.value) || 1 })}
              className="bg-[#2a2a2a] border-gray-700 text-white"
            />
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          className="w-full mt-6 bg-[#00d9ff] hover:bg-[#00b8dd] text-black font-semibold py-6"
        >
          <Shuffle className="mr-2" size={20} />
          Generar Combinaciones
        </Button>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <Card className="bg-[#1a1a1a] border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Resultados</h3>
            <div className="flex gap-2">
              <Button
                onClick={handleCopyAll}
                variant="outline"
                size="sm"
                className="bg-transparent border-gray-700 text-gray-300 hover:border-[#00d9ff] hover:text-white"
              >
                <Copy size={16} className="mr-2" />
                Copiar Todo
              </Button>
              <Button
                onClick={clearResults}
                variant="outline"
                size="sm"
                className="bg-transparent border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-500"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {results.map((combination, index) => (
              <div
                key={index}
                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-4 hover:border-[#00d9ff] transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-gray-400 font-mono mr-2">#{index + 1}</span>
                    {combination.map((num, i) => (
                      <Badge
                        key={i}
                        className="bg-[#00d9ff] text-black font-bold text-lg px-4 py-2"
                      >
                        {num}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    onClick={() => handleCopy(combination)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-[#00d9ff] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* History */}
      {history.length > 0 && (
        <Card className="bg-[#1a1a1a] border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <RefreshCw className="mr-2 text-[#00d9ff]" size={20} />
              Historial
            </h3>
            <Button
              onClick={clearHistory}
              variant="outline"
              size="sm"
              className="bg-transparent border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-500"
            >
              <Trash2 size={16} className="mr-2" />
              Limpiar
            </Button>
          </div>

          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-4"
              >
                <div className="text-gray-400 text-sm mb-2">{item.timestamp}</div>
                <div className="text-gray-300 text-sm mb-2">
                  Rango: {item.config.min}-{item.config.max} | {item.config.count} números | {item.config.combinations} combinaciones
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default NumberGenerator;
