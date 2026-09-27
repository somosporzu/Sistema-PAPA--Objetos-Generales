import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary capturó un error no controlado:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#141416] text-[#ECEBED] flex items-center justify-center p-4 font-sans">
          <div className="max-w-lg w-full bg-[#1E1E22] border border-[#E02B69]/50 rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#E02B69]/20 text-[#E02B69] flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h1 className="text-xl font-bold font-serif text-[#E5CB7D]">
              Aviso de Restauración de la Forja
            </h1>

            <p className="text-sm text-stone-300">
              La aplicación encontró un conflicto con datos almacenados previamente en tu navegador.
            </p>

            {this.state.error && (
              <div className="p-3 bg-black/50 border border-white/10 rounded-lg text-left text-xs font-mono text-rose-300 overflow-x-auto max-h-32">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={this.handleReset}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#E5CB7D] hover:bg-[#F0DD9E] text-stone-900 font-bold text-sm transition-colors shadow-lg"
              >
                <RefreshCw className="w-4 h-4" />
                Reiniciar Taller con Configuración Limpia
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
