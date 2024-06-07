'use client';

import React, { useState, useEffect } from 'react';
import Header from "../components/header/header";
import { NextUIProvider } from "@nextui-org/system";
import CustomCard from '../components/customcard/customcard';
import Footer from '../components/footer/footer';
import { User } from "../interfaces/user";
import { decodeAccessToken, fetchDownloadableFiles } from './utils';

const DownloadComponentsPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const filesData = await fetchDownloadableFiles();
        setFiles(filesData);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userData = decodeAccessToken(accessToken);
    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <NextUIProvider className="min-h-screen bg-beige">
      <Header user={user} showMyAccount={true} showSponsor={false} />
      <div className="container mx-auto mt-6 flex-grow">
        <h1 className="font-bold text-3xl text-black text-center mb-4">Téléchargement des Composants</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {files.map(file => (
            <div className='place-self-center' key={file.filename}>
              <CustomCard title={file.filename} href={`/api/components?filename=${encodeURIComponent(file.filename)}`} btnText={'Télécharger'} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </NextUIProvider>
  );
};

export default DownloadComponentsPage;
