import { useContext, useState } from "react";
import { login } from "../../common/api/auth";
import AppContext from "../../common/context/AppContext";
import { successResponse } from "../../common/app/message";

function LoginPage() {
  const { setShowLoading } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginSubmit(e) {
    try {
      e.preventDefault();
  
      setShowLoading(true);
      
      const loginData = await login(email, password);
      
      if(loginData.message !== successResponse) {
        setShowLoading(false);
        return;
      }

      localStorage.setItem('accessToken', loginData.data.accessToken);
      localStorage.setItem('refreshToken', loginData.data.refreshToken);
      localStorage.setItem('username', loginData.data.username);
      localStorage.setItem('email', loginData.data.email);
      localStorage.setItem('id', loginData.data._id);
      
      window.location.replace('/');

      setShowLoading(false);
    } catch (error) {
      setShowLoading(false);
    }
  }
  
  return (
      <div className="p-3">
        <div>
          <center>
            <h3 className="mt-24 text-xl">Sign In</h3>
            <div className="text-gray-400 mt-3 text-sm">
              Hi! Welcome back, you've missed
            </div>
          </center>
        </div>

        <div className="mt-12">
          <form onSubmit={loginSubmit}>
            <center>
              <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 ml-3 text-sm text-left">Email</label>
                  <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-sm rounded-full block w-full p-2.5 pl-3 outline-none" placeholder="example@gmail.com" />
              </div>
              <div className="mb-4">
                  <label htmlFor="password" className="block mb-2 ml-3 text-sm text-left">Password</label>
                  <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="bg-gray-50 border border-gray-300 text-sm rounded-full block w-full p-2.5 pl-3 outline-none" placeholder="Enter your password" />
              </div>

              <div className="text-right text-xs pr-6 underline color-primary">
                Forgot Password?
              </div>

              <button className="bg-primary text-white mb-6 w-full rounded-full py-2 mt-12">
                Sign In
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
                Don't have an account? <a className="underline color-primary" href="/auth/register">Sign Up</a>
              </div>
            </center>
          </div>
        </div>
      </div>
  );
}

export default LoginPage
