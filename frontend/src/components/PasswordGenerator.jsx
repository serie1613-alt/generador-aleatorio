import React, { useState, useEffect } from 'react';
import { Key, Copy, Eye, EyeOff, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { useToast } from '../hooks/use-toast';
import { generatePassword, calculatePasswordStrength, copyToClipboard } from '../utils/generators';

const PasswordGenerator = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: true
  });
  const [passwords, setPasswords] = useState([]);
  const [showPasswords, setShowPasswords] = useState({});
  const [history, setHistory] = useState([]);

  const handleGenerate = (count = 1) => {
    try {
      const generated = [];
      for (let i = 0; i < count; i++) {
        const password = generatePassword(config.length, config);
        const strength = calculatePasswordStrength(password);
        generated.push({ id: Date.now() + i, password, strength });
      }
      
      setPasswords(generated);
      
      // Add to history
      const historyItem = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        config: { ...config },
        passwords: generated
      };
      setHistory([historyItem, ...history.slice(0, 9)]); // Keep last 10

      toast({
        title: '¡Generado!',
        description: `${count} contraseña${count > 1 ? 's' : ''} creada${count > 1 ? 's' : ''} exitosamente`
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleCopy = async (password) => {
    const success = await copyToClipboard(password);
    if (success) {
      toast({
        title: 'Copiado',
        description: 'Contraseña copiada al portapapeles'
      });
    }
  };

  const toggleShowPassword = (id) => {
    setShowPasswords({
      ...showPasswords,
      [id]: !showPasswords[id]
    });
  };

  const clearPasswords = () => {
    setPasswords([]);
    setShowPasswords({});
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
          <Key className="mr-2 text-[#00d9ff]" size={24} />
          Configuración
        </h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-gray-300">Longitud: {config.length}</Label>
              <span className="text-[#00d9ff] font-mono">{config.length} caracteres</span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={config.length}
              onChange={(e) => setConfig({ ...config, length: parseInt(e.target.value) })}
              className="w-full h-2 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-[#00d9ff]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between bg-[#2a2a2a] p-4 rounded-lg">
              <Label className="text-gray-300">Mayúsculas (A-Z)</Label>
              <Switch
                checked={config.uppercase}
                onCheckedChange={(checked) => setConfig({ ...config, uppercase: checked })}
                className="data-[state=checked]:bg-[#00d9ff]"
              />
            </div>

            <div className="flex items-center justify-between bg-[#2a2a2a] p-4 rounded-lg">
              <Label className="text-gray-300">Minúsculas (a-z)</Label>
              <Switch
                checked={config.lowercase}
                onCheckedChange={(checked) => setConfig({ ...config, lowercase: checked })}
                className="data-[state=checked]:bg-[#00d9ff]"
              />
            </div>

            <div className="flex items-center justify-between bg-[#2a2a2a] p-4 rounded-lg">
              <Label className="text-gray-300">Números (0-9)</Label>
              <Switch
                checked={config.numbers}
                onCheckedChange={(checked) => setConfig({ ...config, numbers: checked })}
                className="data-[state=checked]:bg-[#00d9ff]"
              />
            </div>

            <div className="flex items-center justify-between bg-[#2a2a2a] p-4 rounded-lg">
              <Label className="text-gray-300">Caracteres Especiales (!@#$%)</Label>
              <Switch
                checked={config.special}
                onCheckedChange={(checked) => setConfig({ ...config, special: checked })}
                className="data-[state=checked]:bg-[#00d9ff]"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <Button
            onClick={() => handleGenerate(1)}
            className="bg-[#00d9ff] hover:bg-[#00b8dd] text-black font-semibold py-6"
          >
            <Key className="mr-2" size={20} />
            Generar 1 Contraseña
          </Button>
          <Button
            onClick={() => handleGenerate(5)}
            variant="outline"
            className="bg-transparent border-2 border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-black font-semibold py-6"
          >
            <RefreshCw className="mr-2" size={20} />
            Generar 5 Contraseñas
          </Button>
        </div>
      </Card>

      {/* Results */}
      {passwords.length > 0 && (
        <Card className="bg-[#1a1a1a] border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Contraseñas Generadas</h3>
            <Button
              onClick={clearPasswords}
              variant="outline"
              size="sm"
              className="bg-transparent border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-500"
            >
              <Trash2 size={16} />
            </Button>
          </div>

          <div className="space-y-4">
            {passwords.map((item) => (
              <div
                key={item.id}
                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-4 hover:border-[#00d9ff] transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Input
                    type={showPasswords[item.id] ? 'text' : 'password'}
                    value={item.password}
                    readOnly
                    className="bg-[#1a1a1a] border-gray-700 text-white font-mono flex-1"
                  />
                  <Button
                    onClick={() => toggleShowPassword(item.id)}
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-gray-700 text-gray-300 hover:border-[#00d9ff] hover:text-white"
                  >
                    {showPasswords[item.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                  <Button
                    onClick={() => handleCopy(item.password)}
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-gray-700 text-gray-300 hover:border-[#00d9ff] hover:text-white"
                  >
                    <Copy size={16} />
                  </Button>
                </div>

                {/* Strength Indicator */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Fuerza:</span>
                    <span className="text-sm font-semibold" style={{ color: item.strength.color }}>
                      {item.strength.level}
                    </span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${item.strength.percentage}%`,
                        backgroundColor: item.strength.color
                      }}
                    ></div>
                  </div>
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
                <div className="text-gray-300 text-sm">
                  {item.config.length} caracteres | {item.passwords.length} contraseña{item.passwords.length > 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default PasswordGenerator;
