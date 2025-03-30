import {useSessionStore} from "~/stores/session";

export const userHandler = () => {
    const runtimeConfig = useRuntimeConfig();
    const {setLogin, getToken, getUser, setUser, clearUser} = useSessionStore();
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

    const registerUser = async (credentials: any) => {
        try {
            const response: any = await $fetch(`${runtimeConfig.public.apiBase}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/ld+json',
                    'Accept': 'application/ld+json'
                },
                body: credentials
            });

            await loginUser(credentials)

            return response;
        } catch (error) {
            return error;
        }
    }

    const updateUser = async (updatedUser: any) => {
        console.log('updatedUser', updatedUser)
        try {
            const response: any = await $fetch(`${runtimeConfig.public.apiBase}/api/users/${getUser().id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `${getToken()}`,
                    'Content-Type': 'application/merge-patch+json',
                    'Accept': 'application/ld+json',
                },
                body: updatedUser
            });

            console.log('response', response)

            setUser(response);

            return;
        } catch (error) {
            await logoutUser()
            return error;
        }
    }

    const updateUserSession = async () => {
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
            return error;
        }
    }


    return {
        loginUser,
        logoutUser,
        registerUser,
        updateUser,
        updateUserSession,
    };
};
