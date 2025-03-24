export const myUserHandler = () => {
    const loginUser = (credentials: any) => {
        // This function will be called when the user logs in
        console.log('caca')

        return;
    }

    /**
     return async (credentials: any) => {
     const runtimeConfig = useRuntimeConfig();
     const response = await $fetch(`${runtimeConfig.public.apiBase}/api/login`, {
     method: 'POST',
     headers: {
     'Content-Type': 'application/ld+json',
     'Accept': 'application/ld+json'
     },
     body: credentials
     });

     console.log(response)

     return response;
     };
     **/
};
