export const adminProtectionHandler = () => {
    const {getUser} = useSessionStore();
    const {updateUserSession} = userHandler();

    const isAdmin = () => {
        updateUserSession();
        return getUser().roles.includes('ROLE_ADMIN');
    }
    const isSuperAdmin = () => {
        updateUserSession();
        return getUser().roles.includes('ROLE_SUPERADMIN');
    }

    const adminProtection = async () => {
        if (!isAdmin() && !isSuperAdmin()) {
            await navigateTo('/');
        }
    }

    const superAdminProtection = async () => {
        if (!isSuperAdmin()) {
            await navigateTo('/');
        }
    }

    return {
        adminProtection,
        superAdminProtection
    }
}