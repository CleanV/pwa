import { useRoutes } from "react-router-dom";
import routes from "../route/route";

function Content() {
    const routing = useRoutes(routes(localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')));

    return (
        <div className="h-100">
            {routing}
        </div>
    );
}

export default Content;