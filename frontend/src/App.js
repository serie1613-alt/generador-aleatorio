import React, { useState } from 'react';
import './App.css';
import { Toaster } from './components/ui/toaster';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Shuffle, Key } from 'lucide-react';
import NumberGenerator from './components/NumberGenerator';
import PasswordGenerator from './components/PasswordGenerator';

function App() {
  return (
    <div className="App bg-[#0a0a0a] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Generador Aleatorio
          </h1>
          <p className="text-gray-400 text-lg">
            Genera números aleatorios y contraseñas seguras fácilmente
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="numbers" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#1a1a1a] border border-gray-800 p-1">
            <TabsTrigger 
              value="numbers" 
              className="data-[state=active]:bg-[#00d9ff] data-[state=active]:text-black text-gray-400 font-semibold py-3"
            >
              <Shuffle className="mr-2" size={20} />
              Números Aleatorios
            </TabsTrigger>
            <TabsTrigger 
              value="passwords"
              className="data-[state=active]:bg-[#00d9ff] data-[state=active]:text-black text-gray-400 font-semibold py-3"
            >
              <Key className="mr-2" size={20} />
              Contraseñas Seguras
            </TabsTrigger>
          </TabsList>

          <TabsContent value="numbers">
            <NumberGenerator />
          </TabsContent>

          <TabsContent value="passwords">
            <PasswordGenerator />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Hecho con ❤️ para generar números y contraseñas de forma segura</p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
