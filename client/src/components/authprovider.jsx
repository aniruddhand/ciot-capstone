import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({children}) {
    let [user, setUser] = useState();

    let signIn = (email, pin, cb) => {
        const body = JSON.stringify({
            email: email,
            pin: pin
        });

        const request = new Request('api/login', {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        fetch(request).then(response => {
            response.json().then(body => {
                if (response.status === 200) {
                    setUser(body);
                    cb();
                } else if (response.status === 401) {
                    setUser(null);
                    cb(body);
                }
            }, error => {
                console.log(error);
            }).catch(error => {
                console.log(error);
            });
        });
    }

    let signOut = (email, cb) => {
        const request = new Request('/api/logout', {method: 'POST', body: JSON.stringify({'email': email})});

        fetch(request).then(response => {
            setUser(null);
            cb();
        });
    }

    return <AuthContext.Provider value={{user, signIn, signOut}}>{children}</AuthContext.Provider>;
}