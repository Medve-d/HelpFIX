import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import RestrictePage from '../pages/restrictePage'; 


const MembershipWrapper = ({ children }) => {
  const { user, role} = useAuthContext();  
 
  if (role === 'prestataire' && user.membershipStatus === 'none') {
    return <RestrictePage />;  
  }

 
  return children;
};

export default MembershipWrapper;
