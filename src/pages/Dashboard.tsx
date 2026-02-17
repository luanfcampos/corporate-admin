import React from 'react';
import { Users, UserPlus, UserCheck, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Dados simulados para visualização do dashboard
  const stats = [
    { name: 'Total de Usuários', value: '7', icon: Users, change: '+12%', changeType: 'increase' },
    { name: 'Usuários Ativos', value: '4', icon: UserCheck, change: '+2.1%', changeType: 'increase' },
    { name: 'Novos Cadastros (Mês)', value: '2', icon: UserPlus, change: '-0.5%', changeType: 'decrease' },
    { name: 'Taxa de Retenção', value: '94.5%', icon: TrendingUp, change: '+4.3%', changeType: 'increase' },
  ];

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Visão geral das métricas da organização.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6 transition hover:shadow-md"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-1 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Exemplo de seção adicional para compor o layout */}
      <div className="mt-8 rounded-lg bg-white shadow p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Atividade Recente</h3>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Último Login</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Ana Silva logou há 2 horas</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Novo Cadastro</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Roberto Santos cadastrado pelo Admin</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Atualização de Sistema</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Deploy da versão v1.2.0 realizado com sucesso</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;