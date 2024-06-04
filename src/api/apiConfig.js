const apiConfig = {
    user: {
        getList: {
            baseURL: '/users',
            method: 'GET',
        },
        getById: {
            baseURL: '/users/:id',
            method: 'GET',
        },
        update: {
            baseURL: '/users/:id',
            method: 'PUT',
        },
    }
}

export default apiConfig;