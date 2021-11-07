import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from './authprovider';

export default function CheckSession({children}) {
    const [sessionChecked, setSessionChecked] = useState(false);

    const auth = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (!auth.user && !sessionChecked) {
            fetch('/api/session').then(response => {
                if (response.status === 200) {
                    response.json().then(body => {
                        auth.user = body;
                        setSessionChecked(true);
                    });
                } else {
                    setSessionChecked(true);
                }
            });
        }

        return () => {
            setSessionChecked(true);
        }
    }, [sessionChecked, auth]);

    if (!auth.user) {
        if (sessionChecked) {
            return (<Navigate to='/login' state={{from: location}}></Navigate>);
        } else {
            return <div></div>
        }
    }

    return children;
}