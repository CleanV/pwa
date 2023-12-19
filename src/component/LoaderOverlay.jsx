import { useContext } from "react";
import AppContext from "../common/context/AppContext";
import Loader from "./Loader";

function LoaderOverlay() {
    const { showLoading } = useContext(AppContext);

    return (
        <>
            { showLoading &&
                <div className="fixed h-screen grid h-screen place-items-center w-screen" style={{backgroundColor: "rgba(1, 1, 1, .65)", zIndex: 99999999}}>
                    <div>
                        <Loader />
                    </div>
                </div>
            }
        </>
    );
}

export default LoaderOverlay;