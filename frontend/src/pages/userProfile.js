import React from 'react';
import { useUserProfile } from '../hooks/useProfiles';

const Profile = () => {
    const { profile, isLoading, error } = useUserProfile();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Profile</h1>
            {profile && (
                <div>
                    <p>Name: {profile.name} {profile.familyName}</p>
                    <p>Email: {profile.email}</p>
                    <p>Number: {profile.number}</p>
                    <p>Birthday: {new Date(profile.birthday).toLocaleDateString()}</p>
                    <p>Role: {profile.role}</p>
                </div>
            )}
        </div>
    );
};

export default Profile;