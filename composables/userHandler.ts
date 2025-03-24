export const userHandler = () => {
    const runtimeConfig = useRuntimeConfig();
    const {setToken, setLoggedIn, setUser, clearUser} = useUserStore();
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

            console.log(response);

            setToken(response.token);

            setLoggedIn(true);

            setUser(response.user);

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

    return {
        loginUser,
        logoutUser,
    };
};
