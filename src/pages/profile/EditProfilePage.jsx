import { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../../common/context/AppContext";
import { editProfile, getProfile } from "../../common/api/profile";
import { uploadToS3 } from "../../common/api/aws";

function EditProfilePage() {
  const { setShowLoading, setShowNavbar } = useContext(AppContext);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [email, setEmail] = useState('');
  const [img, setImg] = useState('');
  const imgObj = useRef(null);

  async function getUser() {
    setShowLoading(true);
    const profile = await getProfile(localStorage.getItem('id'));
    setName(profile.data.name);
    setAbout(profile.data.about);
    setEmail(profile.data.email);
    setImg(profile.data.img);
    setShowLoading(false);
  }

  async function editSubmit(e) {
    try {
      e.preventDefault();
  
      setShowLoading(true);

      const imgProfile = await uploadToS3(imgObj.current);

      await editProfile(
        localStorage.getItem('id'),
        {
          img: imgProfile,
          about: about,
          name: name,
          email: email,
        }
      );
      
      window.location.href = '/profile';

      setShowLoading(false);
    } catch (error) {
      setShowLoading(false);
    }
  }

  function onImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
      imgObj.current = e.target.files[0];
    }
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
        <div className="text-2xl">Profile</div>
        <div className="mt-2 text-slate-400 text-xs">
          <div>Don't worry, only you can see your personal data.</div>
          <div>No one else will be able to see it.</div>
        </div>

        <div className="mt-5">
          <label htmlFor="img">
          <img className="w-44 h-44 rounded-full" src={img} alt="" />
          </label>
          
          <input type="file" id="img" className="opacity-0" onChange={onImageChange} />
        </div>

        <div className="mt-7">
          <form onSubmit={editSubmit}>
            <center>

              <div className="mb-6">
                <label htmlFor="text" className="block mb-2 ml-3 text-sm text-left">Name</label>
                <input required value={name} onChange={(e) => setName(e.target.value)} type="text" id="text" className="bg-gray-50 border border-gray-300 text-sm rounded-full block w-full p-2.5 pl-3 outline-none" placeholder="Alexander Bagus" />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 ml-3 text-sm text-left">Email</label>
                <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-sm rounded-full block w-full p-2.5 pl-3 outline-none" placeholder="example@gmail.com" />
              </div>

              <div className="mb-4">
                <label htmlFor="about" className="block mb-2 ml-3 text-sm text-left">About</label>
                <textarea required value={about} onChange={(e) => setAbout(e.target.value)} id="about" className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 pl-3 outline-none" placeholder="Aktivis muda yang pedulu lingkungan dan..." rows={3}></textarea>
              </div>

              <button className="bg-primary text-white mb-6 w-full rounded-full py-2 mt-12">
                Submit
              </button>
            </center>
          </form>
        </div>
      </center>
    </div>
  );
}

export default EditProfilePage
