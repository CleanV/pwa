import Lottie from "lottie-react";
import EmailAnimation from "../../assets/lottie/email.json";
import AppContext from "../../common/context/AppContext";
import { useContext, useEffect, useState } from "react";

function VerifyPage() {
  const { setShowNavbar } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const queryParameters = new URLSearchParams(location.search);
  
  useEffect(() => {
    setEmail(queryParameters.get("email"));
    setShowNavbar(true);

    return function cleanup() {
      setShowNavbar(false);
    };
  }, []);

  return (
    <div className="p-3">
      <div>
        <center>
          <h3 className="mt-20 text-xl">Verify Account</h3>
          <div className="text-gray-400 mt-3 text-sm">
            <div>Please open the email we just sent to email</div>
            <div className="color-primary underline">{email}</div>
          </div>
        </center>
      </div>

      {<Lottie animationData={EmailAnimation} loop={true} />} 

      <div>
        <center>
          <div className="text-gray-400 mt-3 text-sm">
            <div>Didn't receive email?</div>
            <div className="color-primary underline">Resend</div>
          </div>
        </center>
      </div>
    </div>
  );
}

export default VerifyPage
