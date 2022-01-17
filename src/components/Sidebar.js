import React, { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import { NavLink } from "react-router-dom";
import Logo from "assets/images/iconbot.png";

const Sidebar = ({ active }) => {
    const { logoutUser } = useContext(AuthContext);
    const logout = () => {
        logoutUser();
    };
    return (
        <div className={active ? "sidebar" : "sidebar active"}>
            <NavLink exact to="/" className="logo mb-4">
                <img src={Logo} alt="" className="w-[100px]" />
            </NavLink>
            <div className="menu_item flex flex-col flex-1 justify-start items-center">
                <NavLink
                    exact
                    to="/"
                    className="rounded-[5px] duration-300 p-2 flex m-3 w-full text-white"
                    activeClassName="active"
                >
                    <box-icon
                        name="chat"
                        type="solid"
                        color="#ffffff"
                        class="mr-[5px]"
                    ></box-icon>
                    Message
                </NavLink>
                <NavLink
                    exact
                    to="/intents"
                    className="rounded-[5px] duration-300 p-2 flex m-3 w-full text-white"
                    activeClassName="active"
                >
                    <box-icon
                        name="pencil"
                        type="solid"
                        color="#ffffff"
                        class="mr-[5px]"
                    ></box-icon>
                    Intents
                </NavLink>
            </div>
            <div className="flex flex-col w-full justify-center">
                <div className="flex mb-[10px] justify-center">
                    <a className="icon facebook relative text-black hover:text-white" href="https://www.facebook.com/kimdat546" target="_blank" rel="noopener noreferrer">
                        <div class="tooltip">Nguyen Dat</div>
                        <span className="flex items-center">
                            <box-icon
                                name="facebook"
                                type="logo"
                                class="fill-current"
                            ></box-icon>
                        </span>
                    </a>
                    <a
                        className="icon facebook relative text-black hover:text-white"
                        href="https://www.facebook.com/pmobb1808" target="_blank" rel="noopener noreferrer"
                    >
                        <div className="tooltip">Minh Ngoc</div>
                        <span className="flex items-center">
                            <box-icon
                                name="facebook"
                                type="logo"
                                class="fill-current"
                            ></box-icon>
                        </span>
                    </a>
                    <a className="icon facebook relative text-black hover:text-white" href="https://www.facebook.com/profile.php?id=100007763146449" target="_blank" rel="noopener noreferrer">
                        <div className="tooltip">Huy An</div>
                        <span className="flex items-center">
                            <box-icon
                                name="facebook"
                                type="logo"
                                class="fill-current"
                            ></box-icon>
                        </span>
                    </a>
                    <a className="icon facebook relative text-black hover:text-white" href="https://www.facebook.com/profile.php?id=100012851178576" target="_blank" rel="noopener noreferrer">
                        <div className="tooltip">Nguyen Minh</div>
                        <span className="flex items-center">
                            <box-icon
                                name="facebook"
                                type="logo"
                                class="fill-current"
                            ></box-icon>
                        </span>
                    </a>
                </div>
                <div className="h-1"></div>
                <div className="flex w-full">
                    <a className="icon icon-git github relative text-black hover:text-white my-[10px]" href="https://github.com/Fail-Capstone" target="_blank" rel="noopener noreferrer">
                        <div className="tooltip">Capstone</div>
                        <span className="flex items-center">
                            <box-icon
                                name="github"
                                type="logo"
                                class="fill-current"
                            ></box-icon>
                        </span>
                    </a>
                </div>
                <div className="h-1"></div>
            </div>
            <div className="logout w-full">
                <button
                    onClick={logout}
                    className="hover:bg-white hover:text-black text-white w-full p-[5px] rounded-[5px] flex items-center justify-center"
                >
                    <box-icon name="log-out" class="fill-current"></box-icon>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
