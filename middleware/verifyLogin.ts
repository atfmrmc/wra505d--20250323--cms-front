export default defineNuxtRouteMiddleware(async () => {
    const runtimeConfig = useRuntimeConfig();
    const {getToken, getUser, setLogin} = useSessionStore();
    const {logoutUser} = userHandler();


    try {
        const response: any = await $fetch(`${runtimeConfig.public.apiBase}/api/users/${getUser().id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/ld+json',
                'Accept': 'application/ld+json',
                'Authorization': `${getToken()}`
            },
        });

        setLogin(response);

        return;
    } catch (error) {
        await logoutUser()
    }

});