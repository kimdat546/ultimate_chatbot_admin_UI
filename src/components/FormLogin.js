import React, { useState, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import Modal from "components/Modal";
import AlertMessage from "components/AlertMessage";

const FormLogin = () => {
    const [isShowing, setIsShowing] = useState(false);

    function toggle() {
        setIsShowing(!isShowing);
    }

    //context
    const { loginUser } = useContext(AuthContext);

    //state
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });

    const [alert, setAlert] = useState(null);

    const { username, password } = loginForm;

    const onChangeLoginForm = (event) =>
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

    const onSubmitLoginForm = async (event) => {
        event.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success) {
                // history.push("/");
            } else {
                if (loginData.message) {
                    setAlert({
                        message: loginData.message,
                        submessage: "Please try again",
                        type: "error",
                    });
                    toggle();
                } else {
                    setAlert({
                        message: "Internal server error",
                        submessage: "Please try again",
                        type: "bug",
                    });
                    toggle();
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-[#282c31] p-[20px] min-w-[30%] rounded-[5px]">
            <Modal isShowing={isShowing}>
                <AlertMessage hide={toggle} info={alert} />
            </Modal>
            <form id="form-login">
                <h3 className="font-semibold text-[26px] text-center uppercase text-[#ffff61]">
                    Login
                </h3>
                <div className="h-[20px]"></div>
                <div className="form-group">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        className="form-control bg-transparent px-[10px] py-[5px] rounded-[30px] text-[18px] text-white border-[#ffff61] outline-none focus:border-purple-500 text-center border-[2px]"
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </div>
                <div className="h-[10px]"></div>
                <div className="form-group">
                    <input
                        className="form-control bg-transparent px-[10px] py-[5px] rounded-[30px] text-[18px] text-white border-[#ffff61] outline-none focus:border-purple-500 text-center border-[2px] mb-[20px]"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </div>
                <div className="w-full text-center">
                    <button
                        className="form-submit bg-[#ffff61] hover:bg-purple-500 hover:text-white hover:border-purple-500 min-w-[200px] px-[15px] py-[10px] rounded-[30px] text-[18px] text-black border-[#ffff61] outline-none text-center border-[2px] mb-[20px]"
                        onClick={onSubmitLoginForm}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormLogin;
