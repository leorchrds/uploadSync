'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateGroupPage() {
  const [groupName, setGroupName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : null);
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('Por favor, selecione um arquivo.');
      return;
    }

    const formData = new FormData();
    formData.append('groupName', groupName);
    formData.append('file', file);

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('http://localhost:3000/groups/create-with-contacts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });
      setSuccessMessage('Grupo criado com sucesso!');
      setGroupName('');
      setFile(null);
      setFileName(null);
    } catch (error) {
      console.error('Erro ao criar grupo:', error);
      setError('Não foi possível criar o grupo. Verifique se os dados estão corretos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900 p-4">
      <div className="w-full max-w-md">
        {successMessage && (
          <div className="mb-4 p-4 bg-green-500 text-white rounded-lg shadow-lg transition-all duration-500 ease-in-out">
            <p className="text-center font-medium">{successMessage}</p>
          </div>
        )}
        <form className="bg-navy-800 p-8 rounded-lg shadow-2xl" onSubmit={handleCreateGroup}>
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">Crie o grupo e faça upload do seu arquivo</h1>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="groupName">
              Nome do Grupo
            </label>
            <input
              id="groupName"
              type="text"
              className="w-full p-3 bg-navy-700 border border-navy-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="fileInput">
              Arquivo de Contatos
            </label>
            <input
              id="fileInput"
              type="file"
              className="w-full p-3 bg-navy-700 border border-navy-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleFileChange}
              required
            />
          </div>
          {error && <p className="text-red-400 text-center mb-4">{error}</p>}
          <button
            type="submit"
            className={`w-full p-3 rounded-lg text-white font-medium ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } transition duration-200`}
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
}
