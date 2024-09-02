'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

interface Group {
  id: string;
  name: string;
  contacts: Contact[];
}

export default function GroupInfoPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/auth/login');
      return;
    }

    const fetchGroups = async () => {
      try {
        const response = await axios.get<Group[]>('http://localhost:3000/groups', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGroups(response.data);
      } catch (error) {
        console.error('Erro ao buscar informações dos grupos:', error);
        setError('Não foi possível carregar as informações dos grupos. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-900">
        <div className="text-white text-2xl animate-pulse">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-900">
        <div className="bg-red-100 p-6 rounded-lg shadow-xl max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Erro</h1>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-900 p-6 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">Informações dos Grupos</h1>
      {groups.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.id} className="bg-white p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105">
              <h2 className="text-2xl font-semibold mb-4 text-navy-700">{group.name}</h2>
              <h3 className="text-lg font-semibold mb-2 text-navy-700">Contatos</h3>
              {group.contacts && group.contacts.length > 0 ? (
                <ul className="space-y-3">
                  {group.contacts.map((contact) => (
                    <li key={contact.id} className="bg-gray-50 p-3 rounded-md">
                      <p className="font-medium text-navy-700">{contact.name}</p>
                      <p className="text-gray-600">{contact.phone}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 italic">Sem contatos disponíveis.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-xl text-center">
          <p className="text-gray-700 text-lg">Nenhum grupo disponível.</p>
        </div>
      )}
    </div>
  );
}
