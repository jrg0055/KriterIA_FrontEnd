import React, { useState, useEffect } from 'react';

/**
 * Componente para verificar y mostrar la conexión con el backend
 * Aparece como ventana modal flotante en el centro
 */
function BackendConnector() {
  const [message, setMessage] = useState('Conectando con el backend...');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendInfo, setBackendInfo] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Intenta conectar con varios endpoints comunes del backend
    const checkBackendConnection = async () => {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const endpoints = [
        '/api/hello',
        '/api/health', 
        '/health',
        '/'
      ];

      setIsLoading(true);
      setError(null);

      // Intenta cada endpoint hasta encontrar uno que funcione
      for (const endpoint of endpoints) {
        try {
          console.log(`Intentando conectar con: ${API_URL}${endpoint}`);
          
          const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Respuesta del backend:', data);
            
            setMessage(data.message || data.msg || 'Conexión exitosa con el backend');
            setBackendInfo(data);
            setIsConnected(true);
            setIsLoading(false);
            return; // Sale del bucle cuando encuentra una conexión exitosa
          }
        } catch (err) {
          console.error(`Error en ${endpoint}:`, err);
          // Continúa con el siguiente endpoint
        }
      }

      // Si llegamos aquí, ningún endpoint funcionó
      setError('No se pudo conectar con el backend. Asegúrate de que esté ejecutándose en http://localhost:5000');
      setIsConnected(false);
      setIsLoading(false);
    };

    checkBackendConnection();

    // Reintenta la conexión cada 10 segundos si hay error
    const interval = setInterval(() => {
      if (!isConnected) {
        checkBackendConnection();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isConnected]);

  // Auto-ocultar después de 5 segundos si la conexión es exitosa
  useEffect(() => {
    if (isConnected) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isConnected]);

  // No renderizar si no es visible
  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Overlay oscuro de fondo */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease-out'
        }}
        onClick={() => isConnected && setIsVisible(false)}
      >
        {/* Ventana Modal */}
        <div 
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            padding: '30px',
            margin: '20px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            borderRadius: '16px',
            backgroundColor: isConnected ? '#1a3a1a' : (error ? '#3a1a1a' : '#3a3a1a'),
            border: `3px solid ${isConnected ? '#28a745' : (error ? '#dc3545' : '#ffc107')}`,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            animation: 'slideUp 0.4s ease-out',
            color: '#fff'
          }}
        >
          {/* Botón de cerrar */}
          {isConnected && (
            <button
              onClick={() => setIsVisible(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                color: '#fff',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              ×
            </button>
          )}

          <h2 style={{ 
            margin: '0 0 20px 0',
            fontSize: '24px',
            fontWeight: 'bold',
            color: isConnected ? '#4ade80' : (error ? '#f87171' : '#facc15')
          }}>
            {isConnected ? '✅ ' : (error ? '❌ ' : '⏳ ')}
            Estado del Backend
          </h2>
          
          {isLoading && !error && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: '50px',
                height: '50px',
                border: '4px solid rgba(255, 255, 255, 0.1)',
                borderTop: '4px solid #ffc107',
                borderRadius: '50%',
                margin: '0 auto 15px',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ margin: '10px 0', fontSize: '16px' }}>
                🔄 Buscando backend en http://localhost:5000...
              </p>
            </div>
          )}
          
          {isConnected && (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
              <p style={{ margin: '15px 0', fontSize: '18px', fontWeight: '600', color: '#4ade80' }}>
                📡 {message}
              </p>
              
              {backendInfo && (
                <div style={{
                  marginTop: '20px',
                  padding: '15px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}>
                  <strong style={{ color: '#4ade80' }}>Información del backend:</strong>
                  <pre style={{
                    margin: '10px 0 0 0',
                    padding: '15px',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '6px',
                    overflow: 'auto',
                    fontSize: '13px',
                    lineHeight: '1.5'
                  }}>
                    {JSON.stringify(backendInfo, null, 2)}
                  </pre>
                </div>
              )}
              
              <p style={{ 
                marginTop: '20px', 
                fontSize: '13px', 
                color: '#9ca3af',
                textAlign: 'center'
              }}>
                Esta ventana se cerrará automáticamente en 5 segundos
              </p>
            </div>
          )}

          {error && (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
              <p style={{ margin: '15px 0', color: '#f87171', fontSize: '16px' }}>
                {error}
              </p>
              <div style={{
                marginTop: '20px',
                padding: '15px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px'
              }}>
                <p style={{ margin: '10px 0', fontSize: '15px', fontWeight: 'bold' }}>
                  💡 Pasos para solucionar:
                </p>
                <ol style={{ margin: '10px 0', paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8' }}>
                  <li>Verifica que el backend esté ejecutándose</li>
                  <li>Confirma que el puerto sea el 5000</li>
                  <li>Revisa la configuración de CORS en el backend</li>
                  <li>Comprueba la consola del navegador para más detalles</li>
                </ol>
                <p style={{ margin: '15px 0 5px', fontSize: '13px', color: '#9ca3af' }}>
                  Reintentando automáticamente cada 10 segundos...
                </p>
              </div>
            </div>
          )}

          <div style={{
            marginTop: '20px',
            padding: '12px',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#9ca3af'
          }}>
            <strong>URL del Backend:</strong> {import.meta.env.VITE_API_URL || 'http://localhost:5000'}
          </div>
        </div>
      </div>

      {/* Estilos de animación */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

export default BackendConnector;
