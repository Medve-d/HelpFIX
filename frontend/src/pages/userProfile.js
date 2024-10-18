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
    <div className="profile-container">
      <h1 className="profile-title">Profile Page</h1>
      {user ? (
        <div className="profile-card">
          <div className="profile-info">
            <p className="info-item">
              <strong>Prénom:</strong> {user.name}
            </p>
            <p className="info-item">
              <strong>Nom:</strong> {user.familyName}
            </p>
            <p className="info-item">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="info-item">
              <strong>Birthday:</strong>{' '}
              {user.birthday && format(parseISO(user.birthday), 'dd MMMM yyyy', { locale: fr })}
            </p>
            <p className="info-item">
              <strong>Numéro:</strong> +{user.number}
            </p>
            <p className="info-item">
              <strong>{capitalizeFirstLetter(user.role)} depuis{' '}</strong> 
              {user.createdAt && format(parseISO(user.createdAt), 'dd MMMM yyyy', { locale: fr })}
            </p>
          </div>
        </div>
      ) : (
        <p className="loading-text">Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;