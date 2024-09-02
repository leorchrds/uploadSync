'use client';
import { useState } from 'react';

export default function UploadContactsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Nenhum arquivo selecionado.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/contacts/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Contatos enviados com sucesso!');
        setFile(null);
      } else {
        const errorText = await response.text();
        alert(`Falha no upload: ${errorText}`);
      }
    } catch (err) {
      setError('Erro ao enviar o arquivo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleUpload}>
        <h1 className="text-2xl font-bold mb-6 text-center">Upload de Contatos</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Escolha o arquivo</label>
          <input
            type="file"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white p-2 rounded ${loading ? 'bg-blue-300 cursor-wait' : ''}`}
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Upload'}
        </button>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
}
