// import FormLogin from "components/FormLogin";
import { AuthContext } from "contexts/AuthContext";
import { useContext,useState } from "react";
import { Route, Redirect } from "react-router-dom";

import Spinner from "components/Spinner";
import Routers from "Routers";
import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [activeSidebar, setActiveSidebar] = useState(true);
    const toggleSidebar = () => {
        setActiveSidebar(!activeSidebar);
    };
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);
    if (authLoading) return <div className="h-screen"><Spinner /></div>;
    return (
        <Route
            render={(props) =>
                isAuthenticated ? (
                    <div className={`layout`}>
                        <Sidebar {...props} active={activeSidebar} />
                        <div className="main">
                            <Navbar toggle={toggleSidebar}/>
                            <div className="main-content mt-4 h-auto overflow-auto">
                                <Routers />
                            </div>
                        </div>
                    </div>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;
