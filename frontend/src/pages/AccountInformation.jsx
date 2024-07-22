import React from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/footComp';

function AccountInformation() {
  return (
      <>
      <Navbar />
      <div className="App-body">
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
      </>
  );
}

export default AccountInformation;
