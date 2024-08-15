import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

export const useUserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found');
                setIsLoading(false);
                return;
            }

            const response = await fetch('/api/user/profile', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                setProfile(json);
            }
            setIsLoading(false);
        };

        fetchProfile();
    }, [user]);

    return { profile, isLoading, error };
};
