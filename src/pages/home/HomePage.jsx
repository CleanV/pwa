import { useEffect, useContext, useState, useRef } from "react";
import AppContext from "../../common/context/AppContext";
import EventCard from "../../component/EventCard";
import HomeImg from "../../assets/img/home.png";
import { exploreEvents } from "../../common/api/event";
import Loader from "../../component/Loader";
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const { setShowBottomNavbar } = useContext(AppContext);
  const [exploreEvent, setExploreEvent] = useState([]);
  const [exploreLoading, setExploreLoading] = useState(true);
  const [nearbyEvent, setNearbyEvent] = useState([]);
  const [nearbyLoading, setNearbyLoading] = useState(true);
  const keyword = useRef();
  const coor = useRef();
  const navigate = useNavigate();

  async function getEvents() {
    setExploreLoading(true);
    const events = await exploreEvents({
      title: '',
      exceptBy: localStorage.getItem('id')
    });
    setExploreEvent(events.data);
    setExploreLoading(false);
  }

  async function getNearbyEvent() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      setNearbyLoading(true);
      coor.current = `${position.coords.longitude},${position.coords.latitude},10000`;
      const events = await exploreEvents({
        location: coor.current,
        exceptBy: localStorage.getItem('id')
      });
      setNearbyEvent(events.data);
      setNearbyLoading(false);
    });
  }

  function search(e) {
    e.preventDefault();
    navigate('/event/list', {state: {exceptBy: localStorage.getItem('id'), title: keyword.current.value}});
  }

  useEffect(() => {
    setShowBottomNavbar(true);
    getEvents();
    getNearbyEvent();
    return function cleanup() {
      setShowBottomNavbar(false);
    };
  }, []);

  return (
    <div className="p-3 px-6 mb-14">
      <div className="flex mt-3">
        <div className="text-slate-400 flex-grow text-sm">Location</div>
        <div><i className="fas fa-bell"></i></div>
      </div>

      <div className="font-semibold my-3">
        <i className="fas fa-location-dot"></i>&emsp;My Location
      </div>

      <div>
        <form className="flex items-center" onSubmit={search}>   
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <i className="fas fa-search"></i>
            </div>
            <input ref={keyword} type="text" className="border border-gray-500 text-sm rounded-full block w-full ps-10 p-2.5" placeholder="Search" required />
          </div>
            <button type="button" className="ml-4">
              <i className="fas fa-calendar-days text-lg"></i>
            </button>
        </form>
      </div>

      <div className="my-4">
        <div className="flex items-center">
          <div className="flex-grow">Explore Events</div>
          <button onClick={() => navigate('/event/list', {state: {title: '', exceptBy: localStorage.getItem('id')}})} className="block text-slate-400 text-sm">See all <i className="fa-solid fa-arrow-right"></i></button>
        </div>

        <div className="flex w-full overflow-auto py-4">

          {
            exploreLoading 
              ? <div className="w-full"><Loader hideLabel={true} /></div>
              : exploreEvent.map((e, i) => <EventCard key={i} data={e} />)
          }

        </div>
      </div>

      <div className="my-2">
        <div className="flex">

          <div className="flex-grow bg-green-200 rounded-l-lg shadow">
            <div className="p-3">
              <div className="text-lg">Ayo Buat Event Kebersihanmu sekarang!</div>
              <div>
                <button onClick={() => {window.location.href = '/event/create/first';}} className="text-white shadow-lg rounded-full bg-green-500 px-3 py-2 w-full mt-3">Create Events</button>
              </div>
            </div>
          </div>

          <div className="flex-grow">
            <img src={HomeImg} className="w-full h-full object-cover rounded-r-lg shadow" alt="" />
          </div>
          
        </div>
        
        <div className="my-4">
          {
            nearbyLoading
              ? <Loader />
              : nearbyEvent.length > 0 
                ? <>
                  <div className="flex items-center">
                    <div className="flex-grow">Nearby You</div>
                    <button onClick={() => navigate('/event/list', {state: {location: coor.current, exceptBy: localStorage.getItem('id')}})} className="block text-slate-400 text-sm">See all <i className="fa-solid fa-arrow-right"></i></button>
                  </div>

                  <div className="flex w-full overflow-auto py-4">
                    {
                      nearbyEvent.map((e, i) => <EventCard key={i} data={e} />)
                    }
                  </div>
                </>
                : <center className="my-4">No Event Found</center>
          }
        </div>
      </div>
    </div>
  );
}

export default HomePage
