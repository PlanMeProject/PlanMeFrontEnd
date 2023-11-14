import React, {useEffect, useState} from 'react';
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

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/authorize/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.api+json',
            },
            body: JSON.stringify({
                data: {
                    type: "AuthorizationViewSet",
                    attributes: {
                        full_url: searchUrl.toString()
                    },
                }
            }),
        }).then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text)
                });
            }
            return response.json();
        }).then(data => {
            setToken(data.data.token);
            setUserId(data.data.user_id);
        }).catch(error => {
            console.error('Error:', error);
        });
    }, [searchUrl]);

    return (
        <div></div>
    );
}

export default GoogleAuthHandler;
