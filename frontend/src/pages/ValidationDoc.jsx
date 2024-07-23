import React from 'react';
import DocumentList from '../components/DocumentList';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/footComp';

export default function ValidationDocuments() {
  return (
    <>
    <Navbar />
      <DocumentList />
    <Footer />
    </>
  );
};

