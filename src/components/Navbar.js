import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";
import Logo from "assets/images/iconbot.png";
const Navbar = ({ toggle }) => {
    const {
        authState: {
            user: { username },
        },
    } = useContext(AuthContext);
    const activeSidebar = () => {
        toggle();
    };
    // const [isActive, setIsActive] = useState(false);
    // const hoverSubMenu = () => {
    //     setIsActive(!isActive);
    // };

    return (
        <div className="navbar">
            <div className="navbar-left flex items-center flex-1">
                <div
                    className="hover:bg-white hover:text-black text-white p-[5px] rounded-[5px] flex items-center"
                    onClick={activeSidebar}
                >
                    <box-icon name="menu" class="fill-current"></box-icon>
                </div>

                {/* <div className="search-form flex relative items-center mx-3 flex-1">
                    <input
                        type="search"
                        name=""
                        className="bg-transparent text-white border-[1px] border-solid border-[#4C4C4C] rounded-[10px] outline-none h-[40px] py-[5px] pl-10 pr-3 m-0 "
                    />
                    <box-icon
                        name="search-alt"
                        rotate="90"
                        color="#ffffff"
                        class="absolute ml-3"
                    ></box-icon>
                </div> */}
            </div>
            <div className="navbar-right flex items-center">
                <div className="user_name text-white font-medium">
                    {username}
                </div>
                <div className="avatar flex items-center ml-3">
                    <img
                        className="w-[40px] h-[40px] border rounded-full border-gray-200"
                        src={Logo}
                        alt=""
                    />
                    {/* <div
                        className="flex relative"
                        onClick={hoverSubMenu}
                    >
                        <box-icon
                            name="chevron-down"
                            color="#ffffff"
                            class="ml-1"
                        ></box-icon>
                        <div
                            className={
                                isActive
                                    ? `flex flex-col absolute top-[30px] right-0 min-w-[200px] rounded-[5px] bg-[#282c31] py-[10px]`
                                    : `hidden`
                            }
                        >
                            <div className="px-[10px] py-[5px] flex items-center">
                                <box-icon
                                    name="key"
                                    color="#ffffff"
                                    class="mr-[5px]"
                                ></box-icon>
                                Change password
                            </div>
                            <div className="px-[10px] py-[5px] flex items-center">
                                <box-icon
                                    name="log-out"
                                    color="#ffffff"
                                    class="mr-[5px]"
                                ></box-icon>
                                Log out
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
