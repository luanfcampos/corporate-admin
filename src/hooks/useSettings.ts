import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AppSettings } from '../types/settings';
import { useToast } from './useToast';

const STORAGE_KEY = 'admin_corp_settings';

const DEFAULT_SETTINGS: AppSettings = {
  userName: 'Admin User',
  userEmail: 'admin@corp.com',
  theme: 'light',
  tableDensity: 'normal',
  itemsPerPage: 10,
};

interface SettingsContextData {
  settings: AppSettings;
  isLoading: boolean;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  saveSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextData>({} as SettingsContextData);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();

  // Inicialização Lazy: Lê do localStorage ANTES do primeiro render para evitar flash de tema errado
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Erro ao ler configurações:', error);
    }
    return DEFAULT_SETTINGS;
  });

  // Efeito dedicado para aplicação do Tema no DOM e persistência
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove classes anteriores para garantir limpeza
    root.classList.remove('light', 'dark');
    
    // Adiciona a classe atual
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }

    // Persiste no localStorage sempre que houver mudança
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    
  }, [settings]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const saveSettings = async () => {
    try {
      // Como o useEffect já persiste automaticamente a cada mudança de estado,
      // esta função serve mais para feedback visual e simulação de chamada de API se necessário.
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      addToast('Configurações salvas e aplicadas!', 'success');
      return new Promise<void>((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      addToast('Erro ao salvar configurações.', 'error');
      return Promise.reject(error);
    }
  };

  return React.createElement(
    SettingsContext.Provider,
    { value: { settings, isLoading: false, updateSettings, saveSettings } },
    children
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};