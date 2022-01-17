import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { AuthReducer } from "reducers/AuthReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN } from "variables";
import setAuthToken from "utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(AuthReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    //Check authenticate user
    const loadUser = async () => {
        const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
        if (token) {
            setAuthToken(token);
            try {
                const response = await axios.get(`${apiUrl}/auth/`);
                if (response.data.success) {
                    dispatch({
                        type: "SET_AUTH",
                        payload: {
                            isAuthenticated: true,
                            user: response.data.user,
                        },
                    });
                }
            } catch (error) {
                localStorage.removeItem(LOCAL_STORAGE_TOKEN);
                setAuthToken(null);
                dispatch({
                    type: "SET_AUTH",
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        } else {
            dispatch({
                type: "SET_AUTH",
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const loginUser = async (userForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm);
            if (response.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN,
                    response.data.accessToken
                );
            }
            await loadUser();
            return response.data;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            } else return { success: false, message: "Internal server error" };
        }
    };

    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        setAuthToken(null);
        dispatch({
            type: "SET_AUTH",
            payload: {
                isAuthenticated: false,
                user: null,
            },
        });
    };

    const authContextData = { loginUser, logoutUser, authState };

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
