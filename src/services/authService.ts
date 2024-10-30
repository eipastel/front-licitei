export const authService = {
    login: async (username: string, password: string): Promise<string | null> => {
        return new Promise((resolve) => {
        setTimeout(() => {
            if (username === 'admin' && password === 'password') {
                resolve('fake-jwt-token');
            } else {
                resolve(null);
            }
        }, 1000);
        });
    },
};
  