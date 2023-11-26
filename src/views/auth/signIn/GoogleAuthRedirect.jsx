import React, {useContext, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {SidebarContext} from "../../../contexts/SidebarContext";

const GoogleAuthHandler = () => {
    const location = useLocation();
    const searchUrl = location.search;
    // const { userToken, userId, updateUser } = useContext(SidebarContext);
    const userToken = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')


    const history = useHistory();

    useEffect(() => {
        console.log("usertoken and id:", userToken, userId);
        if (userToken !== null && userId !== null) {
            history.push(`/admin/task-board/${userToken}/${userId}`);
        }else {
            history.push(`/auth/sign-in`);
        }
    });

    useEffect(() => {
        fetch(`https://planme-3366bb9023b7.herokuapp.com/api/authorize/`, {
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
                console.log(searchUrl.toString());
                return response.text().then(text => {
                    throw new Error(text)
                });
            }
            return response.json();
        }).then(data => {
            // updateUser(data.data.token, data.data.user_id, data.data.email);
            console.log("set user token and id and email:", data.data.token, data.data.user_id, data.data.email);
            localStorage.setItem('userToken', data.data.token);
            localStorage.setItem('userId', data.data.user_id);
            localStorage.setItem('email', data.data.email);
            history.push(`/admin/task-board/${userToken}/${userId}`);
        }).catch(error => {
            console.error('Error:', error);
            history.push(`/auth/sign-in`);
        });
    }, []);

    return (
        <div></div>
    );
}

export default GoogleAuthHandler;
