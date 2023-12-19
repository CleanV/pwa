import NavigationBar from "./component/NavigationBar";
import AppContext from "./common/context/AppContext";
import { useState } from "react";
import BottomNavigation from "./component/BottomNavigation";
import Content from "./component/Content";
import LoaderOverlay from "./component/LoaderOverlay";

function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [navbarButton, setNavbarButton] = useState(<></>);
  const [showLoading, setShowLoading] = useState(false);
  const [showBottomNavbar, setShowBottomNavbar] = useState(false);

  return (
      <>
        <AppContext.Provider
          value={{
            navbarButton, 
            setNavbarButton,
            showLoading, 
            setShowLoading,
            showNavbar,
            setShowNavbar,
            showBottomNavbar, 
            setShowBottomNavbar
          }}
        >
          { <LoaderOverlay /> }
          { <NavigationBar /> }

          {<Content />}

          { <BottomNavigation /> } 
        </AppContext.Provider>
      </>
  );
}

export default App
