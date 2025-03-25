export const useSessionStore = defineStore('user', () => {
    const token = ref('');
    const loggedIn = ref(false)
    const user = reactive({
        "id": "",
        "email": "",
        "firstName": "",
        "lastName": "",
        "roles": [],
    });
    const setToken = (data: string) => {
        token.value = data;
    }

    const getToken = () => {
        return token.value;
    }

    const setLoggedIn = (data: boolean) => {
        loggedIn.value = data;
    }

    const getLoggedIn = () => {
        return loggedIn.value;
    }

    const setUser = (data: any) => {
        user.id = data.id ?? user.id;
        user.email = data.email;
        user.firstName = data.firstname;
        user.lastName = data.lastname;
        user.roles = data.roles;
    }

    const getUser = () => {
        return user;
    }

    /**
     * Set the login data when a users logs in
     * @param data
     */
    const setLogin = (data: any) => {
        setToken(data.token);
        setLoggedIn(true);
        setUser(data.user);
    }

    const clearUser = () => {
        token.value = '';
        loggedIn.value = false;
        user.id = '';
        user.email = '';
        user.firstName = '';
        user.lastName = '';
        user.roles = [];
    }

    return {
        token,
        loggedIn,
        user,
        setToken,
        getToken,
        setLoggedIn,
        getLoggedIn,
        setUser,
        getUser,
        setLogin,
        clearUser,
    }
}, {
    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
    }
});