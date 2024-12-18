import React, { createContext, useContext, useState, useEffect } from 'react';

// Membuat konteks
const ProspectContext = createContext();

// URL API
const API_URL = 'http://127.0.0.1:8000/api/prospect';

// Provider yang membungkus aplikasi dan menyediakan state global
export const ProspectProvider = ({ children }) => {
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil data prospect
  const fetchProspects = async () => {
  setLoading(true);
  try {
    const response = await fetch(API_URL);
    const rawData = await response.text(); // Ambil data sebagai teks mentah

    // Cek apakah data diawali dengan karakter 'x' atau karakter lain yang tidak valid
    const cleanedData = rawData.replace(/^x\d*/, ''); // Hapus awalan 'x1' jika ada

    // Parse data JSON setelah dibersihkan
    const jsonData = JSON.parse(cleanedData);
    console.log(jsonData); // Log untuk melihat data

    // Pastikan data yang diterima adalah array
    if (Array.isArray(jsonData)) {
      setProspects(jsonData);
    } else {
      setError('Format data yang diterima tidak valid');
    }
  } catch (err) {
    setError(`Gagal mengambil data prospects: ${err.message}`);
  } finally {
    setLoading(false);
  }
};


  // Fungsi untuk menambahkan prospect
  const addProspect = async (prospect) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prospect),
      });
      const data = await response.json();
      setProspects((prevProspects) => [...prevProspects, data]);
    } catch (err) {
      setError('Gagal menambahkan prospect');
    }
  };

  // Fungsi untuk memperbarui prospect
  const updateProspect = async (id, updatedProspect) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProspect),
      });
      const data = await response.json();
      setProspects((prevProspects) =>
        prevProspects.map((prospect) =>
          prospect.id === id ? data : prospect
        )
      );
    } catch (err) {
      setError('Gagal memperbarui prospect');
    }
  };

  // Fungsi untuk menghapus prospect
  const deleteProspect = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      setProspects((prevProspects) =>
        prevProspects.filter((prospect) => prospect.id !== id)
      );
    } catch (err) {
      setError('Gagal menghapus prospect');
    }
  };

  // Mengambil data prospects saat komponen pertama kali dimuat
  useEffect(() => {
    fetchProspects();
  }, []);

  return (
    <ProspectContext.Provider
      value={{
        prospects,
        addProspect,
        updateProspect,
        deleteProspect,
        loading,
        error,
      }}
    >
      {children}
    </ProspectContext.Provider>
  );
};

// Hook untuk mengakses context
export const useProspects = () => {
  return useContext(ProspectContext);
};
