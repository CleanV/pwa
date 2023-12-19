import { useContext, useEffect, useState } from "react";
import AppContext from "../../common/context/AppContext";
import { getProfile } from "../../common/api/profile";
import { useParams } from 'react-router';

function ProfileDetailPage() {
  const {id} = useParams();
  const { setShowLoading, setShowNavbar } = useContext(AppContext);
  const [user, setUser] = useState({});
  
  async function getUser() {
    setShowLoading(true);
    const profile = await getProfile(id);
    setUser(profile.data);
    setShowLoading(false);
  }

  useEffect(() => {
    getUser();
    setShowNavbar(true);

    return function cleanup() {
      setShowNavbar(false);
    }
  }, []);

  return (
    <div className="p-3">
      <center>
        <img src={user.img} alt="" className="h-44 w-44 rounded-full" />
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
        
        <center className="mt-8 text-sm">
          <button onClick={() => handleSelect(1)}>ABOUT ME</button>
          <div className="text-sm mt-4 text-slate-400 px-2">
            {user.about}
          </div>
        </center>

      </center>
    </div>
  );
}

export default ProfileDetailPage
