import {useSessionStore} from "~/stores/session";

export const userHandler = () => {
    const runtimeConfig = useRuntimeConfig();
    const {setLogin, getToken, getUser, setLoggedIn, setUser, clearUser} = useSessionStore();
    const loginUser = async (credentials: any) => {
        try {
            const response: any = await $fetch(`${runtimeConfig.public.apiBase}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/ld+json',
                    'Accept': 'application/ld+json'
                },
                body: credentials
            });

            setLogin(response);

            await navigateTo('/')

            return;
        } catch (error) {
            return error;
        }
    };

    const logoutUser = async () => {
        clearUser();
        await navigateTo('/login');
    }

    const updateUser = async () => {
        try {
            const response: any = await $fetch(`${runtimeConfig.public.apiBase}/api/users/${getUser().id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/ld+json',
                    'Accept': 'application/ld+json',
                    'Authorization': `${getToken()}`
                },
            });
            
            setUser(response);

            return;
        } catch (error) {
            await logoutUser()
        }
    }

    return {
        loginUser,
        logoutUser,
        updateUser,
    };
};
