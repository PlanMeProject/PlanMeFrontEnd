import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

const GoogleAuthHandler = () => {
    const location = useLocation();
    const searchUrl = location.search;
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (token) {
            history.push(`/admin/task-board/${token}/${userId}`);
        }
    }, [token, history]);


    return (
        <div>
            <h1>Google Auth Handler</h1>
        </div>
    );
}

export default GoogleAuthHandler;
