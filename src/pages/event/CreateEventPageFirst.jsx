import AppContext from "../../common/context/AppContext";
import { useContext, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';

function CreateEventPageFirst() {
  const { setShowNavbar } = useContext(AppContext);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const title = useRef(null);
  const img = useRef(null);
  const desc = useRef(null);
  const about = useRef(null);

  useEffect(() => {
    setShowNavbar(true);

    return function cleanup() {
      setShowNavbar(false);
    }; 
  }, []);

  async function submit(e) {
    e.preventDefault();
    navigate('/event/create/second', { state: {image: img.current, startDate, title: title.current.value, desc: desc.current.value, about: about.current.value}, replace: true });
  }

  function onImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      img.current = e.target.files[0];
    }
  }

  return (
    <div className="p-3 h-screen">
      <center>
        <div className="mt-3">
          <div className="text-2xl">Event Registration</div>
          <p className="text-slate-500 text-sm">Create an event</p>
        </div>
      </center>

      <form className="mt-3 text-sm py-4" onSubmit={submit}>
        <div className="px-3 mb-6">
          <div className="mb-3">Thumbnail Photo</div>
          <div>
            <input onChange={onImageChange} required type="file" accept="image/*" />
            {
              image != null &&
              <img className="w-full h-44 object-cover mt-3" src={image}/>
            }
          </div>
        </div>

        <div className="px-3 mb-6">
          <div className="mb-3">Event Title</div>
          <div><input ref={title} required type="text" placeholder="Pembersihan Pantai Ancol" className="border border-slate-400 rounded-full w-full py-2 px-4" /></div>
        </div>

        <div className="px-3 mb-6">
          <div className="mb-3">Event Description</div>
          <div>
            <textarea ref={desc} required className="border border-slate-400 rounded-xl w-full py-2 px-4" placeholder="Aksi sosial untuk pembersihan pantai ancol..." cols="30" rows="2"></textarea>
          </div>
        </div>

        <div className="px-3 mb-6">
          <div className="mb-3">About The Event</div>
          <div>
            <textarea ref={about} required className="border border-slate-400 rounded-xl w-full py-2 px-4" placeholder="Kerja bakti membersihkan pantai di Ancol..." cols="30" rows="4"></textarea>
          </div>
        </div>

        <div className="px-3 mb-6">
          <div className="mb-3">Date</div>
          <div className="text-black">
            <DatePicker required wrapperClassName="w-full" showIcon={true} icon={<i className="fa-solid fa-calendar-days"></i>} className="text-black border border-slate-400 rounded-xl w-full py-2 px-4" selected={startDate} onChange={(date) => setStartDate(date)} showTimeInput dateFormat="Pp" />
          </div>
        </div>

        <button className="w-full bg-green-500 text-white rounded-full py-3" type="submit">Next</button>
      </form>
    </div>
  );
}

export default CreateEventPageFirst
