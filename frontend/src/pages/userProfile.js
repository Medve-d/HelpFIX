import { useEffect } from 'react';
import { useProfileContext } from '../hooks/useProfilesContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const ProfilePage = () => {
  const { user, dispatch } = useProfileContext();
  const { user: authUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile', {
          headers: { Authorization: `Bearer ${authUser.token}` },
        });

        if (response.ok) {
          const json = await response.json();
          dispatch({ type: 'SET_PROFILE', payload: json });
        } else {
          // Handle the error case here
          console.error('Failed to fetch profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [authUser, dispatch, navigate]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <p>Prénom : {user.name}</p>
          <p>Nom : {user.familyName}</p>
          <p>Email : {user.email}</p>
          <p>Birthday : {user.birthday && format(parseISO(user.birthday), 'dd MMMM yyyy', { locale: fr })}</p>
          <p>Numero : +{user.number}</p>
          <p>{capitalizeFirstLetter(user.role)} depuis {user.birthday && format(parseISO(user.createdAt), 'dd MMMM yyyy', { locale: fr })}</p>
          {/* Additional profile data */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
