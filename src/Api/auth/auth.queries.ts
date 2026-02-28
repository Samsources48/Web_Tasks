import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "./auth.service";
import { useAuthStore } from "../../Global/store/useAuthStore";
import type { AuthResponse } from "./interfaces/auth.models";

export const useLoginMutation = () => {

    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: authService.login,
        onSuccess: (data: Partial<AuthResponse>) => {
            setAuth(data.user!, data.token!);
        },
    });
};

// export const useProfileQuery = () => {
//     const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

//     return useQuery({
//         queryKey: ['profile'],
//         queryFn: authService.getProfile,
//         enabled: isAuthenticated,
//     });
// };
