import { PROFILE_ENDPOINT } from '@/const/api';
import { Profile, profileService } from '@/services/profileService';
import useProfileStore from '@/store/useProfileStore'
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useFetchProfile = () => {
    const { fetchProfile } = useProfileStore();

    const query = useQuery<Profile, Error>({
        queryKey: [PROFILE_ENDPOINT],
        queryFn: () => profileService.getProfile(),
        staleTime: 5 * 60 * 1000,
    });

    // Necesario para no entrar en bucle
    useEffect(() => {
        query.data && fetchProfile(query.data);
    }, [query.data, fetchProfile])

    return query;
}