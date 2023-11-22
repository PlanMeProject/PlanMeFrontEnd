import React, {useContext, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {SidebarContext} from "../../../contexts/SidebarContext";

const GoogleAuthHandler = () => {
    const location = useLocation();
    const searchUrl = location.search;
    const { userToken, userId, updateUser } = useContext(SidebarContext);

    const history = useHistory();

    useEffect(() => {
        if (userToken && userId) {
            history.push(`/admin/task-board/${userToken}/${userId}`);
        }
    }, [userToken, userId, history]);

    useEffect(() => {
        fetch(`https://planme-ff1a0ca44046.herokuapp.com/api/authorize/`, {
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
            updateUser(data.data.token, data.data.user_id, data.data.email);
        }).catch(error => {
            console.error('Error:', error);
        });
    }, [searchUrl, updateUser]);

    return (
        <div></div>
    );
}

export default GoogleAuthHandler;
