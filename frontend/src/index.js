import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import {ChakraProvider} from '@chakra-ui/react';
import theme from 'theme/theme';
import {ThemeEditorProvider} from '@hypertheme-editor/chakra-ui';
import GoogleAuthRedirect from "./views/auth/signIn/GoogleAuthRedirect";
import {SidebarProvider} from "./contexts/SidebarContext";

ReactDOM.render(
    <ChakraProvider theme={theme}>
        <React.StrictMode>
            <ThemeEditorProvider>
                <SidebarProvider>
                    <BrowserRouter>
                        <Switch>
                            <Route path={`/auth`} component={AuthLayout}/>
                            <Route path={`/google-auth`} component={GoogleAuthRedirect}/>
                            <Route path={`/admin`} component={AdminLayout}/>
                            <Route path={`/rtl`} component={RtlLayout}/>
                            <Redirect from='/' to='/auth'/>
                        </Switch>
                    </BrowserRouter>
                </SidebarProvider>
            </ThemeEditorProvider>
        </React.StrictMode>
    </ChakraProvider>,
    document.getElementById('root')
);
