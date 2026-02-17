import { useState, useEffect } from 'react';
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

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  // Carregar configurações ao iniciar
  useEffect(() => {
    const loadSettings = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setSettings({ ...DEFAULT_SETTINGS, ...parsed });
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Efeito colateral: Aplicar Tema ao DOM
  useEffect(() => {
    const root = window.document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.theme]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const saveSettings = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      addToast('Configurações salvas com sucesso!', 'success');
      
      // Simula um delay pequeno para feedback visual
      return new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      addToast('Erro ao salvar configurações.', 'error');
      return Promise.reject(error);
    }
  };

  return {
    settings,
    isLoading,
    updateSettings,
    saveSettings,
  };
};
