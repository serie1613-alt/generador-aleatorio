# Generador Aleatorio 🎲🔐

Aplicación web moderna para generar números aleatorios y contraseñas seguras.

## ✨ Características

### 🎲 Generador de Números Aleatorios
- **Rango personalizable**: Define tu propio rango (ej: 1-56)
- **Múltiples combinaciones**: Genera varias combinaciones a la vez
- **Números únicos**: Sin repeticiones en cada combinación
- **Copia fácil**: Copia combinaciones al portapapeles
- **Historial**: Guarda las últimas 10 generaciones

### 🔐 Generador de Contraseñas Seguras
- **Longitud ajustable**: De 8 a 64 caracteres
- **Opciones configurables**:
  - Mayúsculas (A-Z)
  - Minúsculas (a-z)
  - Números (0-9)
  - Caracteres especiales (!@#$%)
- **Indicador de fuerza**: Visualiza qué tan segura es tu contraseña
- **Generar múltiples**: Crea hasta 5 contraseñas a la vez
- **Mostrar/Ocultar**: Protege tu privacidad
- **Copia al portapapeles**: Un click para copiar
- **Historial**: Revisa generaciones anteriores

## 🎨 Diseño

- Tema monocromático negro/gris moderno
- Acento cian (#00d9ff)
- Interfaz con tabs intuitiva
- Responsive design
- Animaciones suaves

## 🛠️ Tecnologías

- React 19
- Tailwind CSS
- Shadcn UI Components
- Lucide Icons
- Crypto API para generación segura

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/serie1613-alt/generador-aleatorio.git

# Instalar dependencias del frontend
cd frontend
yarn install

# Iniciar aplicación
yarn start
```

La aplicación estará disponible en `http://localhost:3000`

## 📖 Uso

### Números Aleatorios
1. Configura el rango mínimo y máximo
2. Define cuántos números por combinación
3. Elige cuántas combinaciones generar
4. Click en "Generar Combinaciones"
5. Copia las combinaciones que necesites

**Ejemplo de uso:**
- Lotería: 1-56, 6 números, 5 combinaciones
- Sorteo: 1-100, 3 números, 10 combinaciones
- Bingo: 1-75, 5 números, 20 combinaciones

### Contraseñas Seguras
1. Ajusta la longitud con el slider
2. Selecciona tipos de caracteres
3. Click en "Generar 1" o "Generar 5"
4. Revisa la fuerza de la contraseña
5. Copia la que más te guste

**Recomendaciones:**
- Mínimo 12 caracteres para buena seguridad
- Incluye todos los tipos de caracteres
- Usa contraseñas diferentes para cada servicio

## 🔒 Seguridad

Las contraseñas se generan usando `crypto.getRandomValues()`, que proporciona números aleatorios criptográficamente seguros. Ninguna contraseña se guarda en servidores, todo es local en tu navegador.

## 📧 Contacto

- GitHub: [@serie1613-alt](https://github.com/serie1613-alt)
- Email: serie1613@gmail.com

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

Hecho con ❤️ para generar números y contraseñas de forma segura
