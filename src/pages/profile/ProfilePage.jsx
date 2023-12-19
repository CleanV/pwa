import { useContext, useEffect, useState } from "react";
import { logout } from "../../common/api/auth";
import AppContext from "../../common/context/AppContext";
import DropdownMenu from "../../component/DropDown";
import { getProfile } from "../../common/api/profile";
import TabProfile from "../../component/TabProfile";
import { useNavigate } from 'react-router-dom';
import Loader from "../../component/Loader";

function ProfilePage() {
  const { setShowLoading, setShowNavbar, setNavbarButton } = useContext(AppContext);
  const [content, setContent] = useState('');
  const [isFetchingUser, setIsFetcingUser] = useState(true);
  const [user, setUser] = useState({});
  const options = ['Edit profile', 'Logout'];
  const navigate = useNavigate();

  const handleSelect = async (option) => {
    if(option == 'Logout') {
      logoutSubmit();
    } else if(option == 'Edit profile') {
      navigate('/profile/edit', { state: {user}, replace: true });
    }
  };
  
  async function getUser() {
    try {
      setIsFetcingUser(true);
      const profile = await getProfile(localStorage.getItem('id'));
      setUser(profile.data);
      setContent(profile.data.about);
      setIsFetcingUser(false);
    } catch (error) {
      setIsFetcingUser(false);
    }
  }

  useEffect(() => {
    getUser();
    setShowNavbar(true);
    setNavbarButton(<DropdownMenu options={options} onSelect={handleSelect} />);

    return function cleanup() {
      setNavbarButton(<></>);
      setShowNavbar(false);
    }
  }, []);

  async function logoutSubmit() {
    try {
      setShowLoading(true);
      await logout(localStorage.getItem('refreshToken'));
      setShowLoading(false);
      localStorage.clear();
      window.location.replace('/auth/login');
    } catch (error) {
      setShowLoading(false);
      localStorage.clear();
      window.location.replace('/auth/login');
    }
  }

  return (
    <div className="p-3">
      <center>
        {
          isFetchingUser 
            ? <Loader hideLabel={true} />
            : <img src={user.img} alt="" className="h-44 w-44 rounded-full" />
        }
        <p className="mt-5 text-lg font-semibold">{user.name}</p>
        <div className="mt-5 text-md flex">
          <div className="flex-grow"></div>
          <div className="flex-grow">
            <div className="text-sm">0</div>
            <div className="text-slate-500 text-sm">Following</div>
          </div>
          <div className="flex-grow">
            <div className="text-sm">0</div>
            <div className="text-slate-500 text-sm">Followers</div>
          </div>
          <div className="flex-grow"></div>
        </div>

        <div className="flex mt-7">
          <div className="flex-grow"></div>
          <div className="flex-grow">
            <button className="bg-green-500 rounded-lg px-3 py-2 text-white w-full">
              <i className="fa-solid fa-user-plus"></i>&emsp;Follow
            </button>
          </div>
          <div className="flex-grow"></div>
          <div className="flex-grow">
            <button className="bg-transparent border border-green-500 rounded-lg px-3 py-2 text-black w-full">
              <i className="fa-regular fa-comment"></i>&emsp;Messages
            </button>
          </div>
          <div className="flex-grow"></div>
        </div>

        <TabProfile content={content} userId={user._id} />
      </center>
    </div>
  );
}

export default ProfilePage
