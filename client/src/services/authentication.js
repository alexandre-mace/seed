import { handleResponse } from '../utils/handle-response';
import { ENTRYPOINT } from '../config/entrypoint';

export const authentication = {
    login,
    logout,
    get currentUserValue () { return JSON.parse(localStorage.getItem('currentUser')) }
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
    return fetch(`${ENTRYPOINT}/authentication_token`, requestOptions)
        .then(handleResponse)
        .then(token => {
            return fetch(`${ENTRYPOINT}/users?email=${email}`)
                .then(user => {return user.json()})
                .then(user => {
                        const storedUser = user['hydra:member'][0];
                        storedUser.token = token;
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(storedUser));
                        return storedUser;
                    }
                )

        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}