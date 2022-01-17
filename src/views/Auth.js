import Login from "views/Login";
import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "components/Spinner";

const Auth = ({ authRoute }) => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);
    if (authLoading) {
        return <div className="h-screen"><Spinner /></div>;
    } else if (isAuthenticated) return <Redirect to="/" />;
    else return <>{authRoute === "login" && <Login />}</>;
};

export default Auth;
