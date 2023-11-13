import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

const GoogleAuthHandler = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const history = useHistory();
    const subjects = ['Math', 'Science', 'English', 'History', 'Art', 'Music', 'PE', 'Computer Science', 'Other'];

    useEffect(() => {
        console.log('Received code:', code);
        // Redirect with subject as a URL parameter
        history.push(`/admin/task-board/${encodeURIComponent(subjects)}`);
    }, [code, subjects, history]);


    return (
        <div>
            <h1>Google Auth Handler</h1>
        </div>
    );
}

export default GoogleAuthHandler;
