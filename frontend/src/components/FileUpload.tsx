import React, { useState } from 'react';
import axios from 'axios';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setMessage('Por favor, selecione um arquivo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setMessage('');

    try {
      await axios.post('http://localhost:3000/groups/create-with-contacts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Arquivo carregado com sucesso!');
      setFile(null); 
      setPreview(null);
    } catch (error) {
      setMessage('Erro ao carregar o arquivo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Selecione um arquivo:</label>
          <input type="file" onChange={handleFileChange} className="mt-1 block w-full" />
        </div>
        <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded">
          {loading ? 'Carregando...' : 'Enviar'}
        </button>
      </form>
      {preview && <img src={preview as string} alt="Preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
};

export default FileUpload;
