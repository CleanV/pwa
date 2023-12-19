import { useContext, useState } from "react";
import { register } from "../../common/api/auth";
import checkUsername from "../../common/utils/check_username";
import AppContext from "../../common/context/AppContext";
import { successResponse } from "../../common/app/message";

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const { setShowLoading } = useContext(AppContext);

  async function registerSubmit(e) {
    try {
      e.preventDefault();
      
      setShowLoading(true);

      if(!checkUsername(username)) {
        setShowLoading(false);
        return;
      }

      const reg = await register(email, username);

      if(reg.message !== successResponse) {
        setShowLoading(false);
        return;
      }

      window.location.href = `/auth/verify?email=${email}`;
      
      setShowLoading(false);
    } catch (error) {
      console.error(error);
      setShowLoading(false);
    }
  }

  return (
      <div className="p-3">
        <div>
          <center>
            <h3 className="mt-24 text-xl">Create Acount</h3>
            <div className="text-gray-400 mt-3 px-12 text-sm">
              Fill your information below or register with your social account.
            </div>
          </center>
        </div>

        <div className="mt-12">
          <form onSubmit={registerSubmit}>
            <center>
              <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 ml-3 text-sm text-left">Email</label>
                  <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-sm rounded-full block w-full p-2.5 pl-3 outline-none" placeholder="ryan@gmail.com" />
              </div>
              <div className="mb-4">
                  <label htmlFor="username" className="block mb-2 ml-3 text-sm text-left">Username</label>
                  <input required value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="username" className="bg-gray-50 border border-gray-300 text-sm rounded-full block w-full p-2.5 pl-3 outline-none" placeholder="ryan_gosling_132" />
                  <p className="text-xs text-left ml-3 mt-2 text-slate-500">*No space or symbol allowed</p>
              </div>

              <div className="text-left text-xs pl-4">
                <div className="flex">
                  <div className="mx-2">
                    <input type="checkbox" />
                  </div>
                  <div className="flex-initial">
                    I want to receive emails about the product, feature  updates, events, and marketing promotions.
                  </div>
                </div>
              </div>

              <button className="bg-primary text-white mb-6 w-full rounded-full py-2 mt-12">
                Sign Up
              </button>
            </center>
          </form>

          <div className="mt-10">
            <center>
              <div className="text-gray-400 mt-3 text-xs mb-4">Or sign in with</div>
              <div>
                <button className="border rounded-full px-3 pt-1.5 pb-3">
                  <img className="inline" width={20} src="/img/apple.png" alt="" />
                </button>

                <button className="border rounded-full px-3 pt-1.5 pb-3 mx-3">
                  <img className="inline" width={20} src="/img/google.png" alt="" />
                </button>

                <button className="border rounded-full px-3 pt-1.5 pb-3">
                  <img className="inline" width={20} src="/img/facebook.png" alt="" />
                </button>
              </div>

              <div className="text-xs mt-6">
                Don't have an account? <a className="underline color-primary" href="/auth/login">Sign In</a>
              </div>
            </center>
          </div>
        </div>
      </div>
  );
}

export default RegisterPage
