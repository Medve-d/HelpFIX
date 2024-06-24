import React from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footComp';

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
