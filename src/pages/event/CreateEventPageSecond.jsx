import AppContext from "../../common/context/AppContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import { MultiSelect } from "react-multi-select-component";
import { MapContainer, TileLayer } from 'react-leaflet';
import LocationFinder from "../../component/LocationFinder";
import { uploadToS3 } from "../../common/api/aws";
import { latLng } from "leaflet";
import benefits from "../../common/app/benefits";
import { createEvent } from "../../common/api/event";

function CreateEventPageSecond() {
  const { setShowNavbar, setShowLoading } = useContext(AppContext);
  const coor = useRef(latLng(3.5952, 98.6722));
  const address = useRef(null);
  const limit = useRef(null);
  const marker = useRef(null);
  const file = useRef(null);
  const location = useLocation();
  const [selectedBenefits, setSelectedBenefits] = useState([]);

  useEffect(() => {
    setShowNavbar(true);

    return function cleanup() {
      setShowNavbar(false);
    }; 
  }, []);

  async function submit(e) {
    try {
      e.preventDefault();
  
      setShowLoading(true);

      const img = await uploadToS3(location.state.image);
      const license = await uploadToS3(file.current);

      await createEvent({
        about: location.state.about,
        address: address.current.value,
        benefits: selectedBenefits.map(b => JSON.parse(b.value)),
        coordinates: [coor.current.lng, coor.current.lat],
        description: location.state.desc,
        license: license,
        limit: Number(limit.current.value),
        thumbnail: img,
        time: location.state.startDate.toISOString(),
        title: location.state.title,
      });

      setShowLoading(false);
      window.location.replace('/profile');
    } catch (error) {
      setShowLoading(false);
    }
    
  }

  function onLicenseChange(e) {
    if (e.target.files && e.target.files[0]) {
      file.current = e.target.files[0];
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
          <div className="mb-3">Address</div>
          <div><input ref={address} required type="text" placeholder="Pantai Ancol, Jakarta Utara" className="border border-slate-400 rounded-full w-full py-2 px-4" /></div>
        </div>

        <div className="px-3 mb-6">
          <div className="mb-3">Guest Limit</div>
          <div>
            <input ref={limit} min={0} type="number" required className="border border-slate-400 rounded-xl w-full py-2 px-4" placeholder="0" />
          </div>
        </div>

        <div className="px-3 mb-6">
          <div className="mb-3">Maps</div>
          <div className="h-44 w-full relative">
                <MapContainer center={[3.5952, 98.6722]} zoom={10} className="" >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <LocationFinder coor={coor} marker={marker} />
                </MapContainer>
          </div>
        </div>

        <div className="px-3 mb-6">
          <div className="mb-3">Benefit</div>
          <div style={{zIndex: "0!important"}}>
            <MultiSelect
              options={benefits}
              value={selectedBenefits}
              onChange={setSelectedBenefits}
            />
          </div>
        </div>

        <div className="px-3 mb-6">
          <div className="mb-3">License</div>
          <div>
            <input onChange={onLicenseChange} required type="file" accept="application/pdf" />
          </div>
        </div>

        <button className="w-full bg-green-500 text-white rounded-full py-3" type="submit">Done</button>
      </form>
    </div>
  );
}

export default CreateEventPageSecond
