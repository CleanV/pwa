import { useContext, useEffect, useState } from "react";
import { verify } from "../../common/api/auth";
import AppContext from "../../common/context/AppContext";
import { successResponse } from "../../common/app/message";

function CreatePasswordPage() {
  const { setShowNavbar, setShowLoading } = useContext(AppContext);
  const [repeatPassword, setRepeatPassword] = useState('');
  const [password, setPassword] = useState('');
  const queryParameters = new URLSearchParams(location.search);

  useEffect(() => {
    setShowNavbar(true);

    return function cleanup() {
      setShowNavbar(false);
    };
  }, []);

  async function createPassword(e) {
    try {
      e.preventDefault();

      setShowLoading(true);
      
      const ver = await verify(password, repeatPassword, queryParameters.get('code'));
      console.log(ver);

      if(ver.message !== successResponse) {
        setShowLoading(false);
        return;
      }

      window.location.replace('/auth/login');
      
      setShowLoading(false);
    } catch (error) {
      setShowLoading(false);
    }
  }

  return (
    <div className="p-3">
        <div>
          <center>
            <h3 className="mt-20 text-xl">New Password</h3>
            <div className="text-gray-400 mt-3 px-12 text-sm">
              Your new password must be different from previously used passwords.
            </div>
          </center>
        </div>

        <div className="mt-12">
          <form onSubmit={createPassword}>
            <center>
              <div className="mb-6">
                  <label htmlFor="password" className="block mb-2 ml-3 text-sm text-left">Password</label>
                  <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" id="password" className="bg-gray-50 border border-gray-300 text-sm rounded-full block w-full p-2.5 pl-3 outline-none" placeholder="New password" />
              </div>
              <div className="mb-4">
                  <label htmlFor="repeat-password" className="block mb-2 ml-3 text-sm text-left">Repeat Password</label>
                  <input value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} type="password" id="repeat-password" className="bg-gray-50 border border-gray-300 text-sm rounded-full block w-full p-2.5 pl-3 outline-none" placeholder="Repeat password" />
              </div>

              <button className="bg-primary text-white mb-6 w-full rounded-full py-2 mt-12">
                Create New Password
              </button>
            </center>
          </form>
        </div>
      </div>
  );
}

export default CreatePasswordPage
