import { useContext } from "react";
import AppContext from "../common/context/AppContext";
import Back from "../assets/svg/back.svg";

function NavigationBar() {
    const { showNavbar, navbarButton } = useContext(AppContext);

    function back() {
        history.back();
    }

    return (
        <>
            {
                showNavbar && 
                    <nav className="w-100 bg-white border-gray-200">
                        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                            <button onClick={back} className="flex items-center space-x-3 rtl:space-x-reverse">
                                <img src={Back} width={20} />
                            </button>
                            <div>
                                {navbarButton}
                            </div>
                        </div>
                    </nav>
            }
        </>
    );
}

export default NavigationBar;