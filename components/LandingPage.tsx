"use client";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Hero Section */}
        <div className="mb-8">
          {/* Main Logo/Icon */}
          <div className="mb-6">
            <div className="text-8xl mb-4">🍷</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Fernet Barato
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Los mejores precios cerca tuyo
            </p>
          </div>

          {/* Features Preview */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center gap-3 text-gray-700">
              <span className="text-2xl">📍</span>
              <span className="text-sm font-medium">Encuentra tiendas cerca tuyo</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-700">
              <span className="text-2xl">💰</span>
              <span className="text-sm font-medium">Compara precios en tiempo real</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-700">
              <span className="text-2xl">⭐</span>
              <span className="text-sm font-medium">Datos verificados por la comunidad</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-4">
          <button
            onClick={onGetStarted}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 px-8 rounded-xl text-lg font-semibold hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            🚀 Comenzar ahora
          </button>
          
          <p className="text-xs text-gray-500">
            Inicia sesión para acceder a precios actualizados y contribuir con la comunidad
          </p>
        </div>

        {/* Footer Info */}
        {/* <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-600">100%</div>
              <div className="text-xs text-gray-600">Gratuito</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-xs text-gray-600">Disponible</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">🔐</div>
              <div className="text-xs text-gray-600">Seguro</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}