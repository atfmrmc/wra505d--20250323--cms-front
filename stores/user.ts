export const useUserStore = defineStore('user', () => {
    const token = ref('');
    const loggedIn = ref(false)
    const user = reactive({
        "id": "",
        "email": "",
        "firstname": "",
        "lastname": "",
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
        user.id = data.id;
        user.email = data.email;
        user.firstname = data.firstname;
        user.lastname = data.lastname;
        user.roles = data.roles;
    }

    const getUser = () => {
        return user;
    }

    const clearUser = () => {
        token.value = '';
        loggedIn.value = false;
        user.id = '';
        user.email = '';
        user.firstname = '';
        user.lastname = '';
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
        clearUser,
    }
}, {
    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
    }
});