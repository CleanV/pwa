import { useContext } from "react";
import AppContext from "../common/context/AppContext";
import { useNavigate } from 'react-router-dom';

function BottomNavigation() {
    const { showBottomNavbar } = useContext(AppContext);
    const navigate = useNavigate();

    function bookmarks() {
        navigate('/event/list', {state: {savedBy: localStorage.getItem('id')}});
    }

    return (
        <>  
            {
                showBottomNavbar &&
                <div style={{width: "95%"}} className="fixed z-50 h-16 -translate-x-1/2 shadow-lg rounded-full bottom-4 left-1/2 bg-green-500">
                    <div className="grid h-full grid-cols-4 mx-auto">
                        <a href="/" className="inline-flex flex-col items-center justify-center px-5 group">
                            <i className="fa-solid text-white text-lg fa-house"></i>
                        </a>
                        <a href="/event/create/first" className="inline-flex flex-col items-center justify-center px-5 group">
                            <i className="fa-solid text-white text-lg fa-calendar-days"></i>
                        </a>
                        <button onClick={bookmarks} className="inline-flex flex-col items-center justify-center px-5 group">
                            <i className="fa-solid text-lg fa-bookmark text-white"></i>
                        </button>
                        <a href="/profile" className="inline-flex flex-col items-center justify-center px-5 rounded-e-full group">
                            <i className="fa-solid fa-user text-white text-lg"></i>
                        </a>
                    </div>
                </div>
            }
        </>
    );
}

export default BottomNavigation;