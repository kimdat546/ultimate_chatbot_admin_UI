import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "boxicons";

import Auth from "views/Auth";
import AuthContextProvider from "contexts/AuthContext";
import IntentContextProvider from "contexts/IntentContext";
import ProtectedRoute from "components/routing/ProtectedRoute";

const Admin = () => {
    return (
        <AuthContextProvider>
            <IntentContextProvider>
                <Router>
                    <Switch>
                        <Route
                            exact
                            path="/login"
                            render={(props) => (
                                <Auth {...props} authRoute="login" />
                            )}
                        />
                        <ProtectedRoute />
                    </Switch>
                </Router>
            </IntentContextProvider>
        </AuthContextProvider>
    );
};

export default Admin;
