import AppContext from "../../common/context/AppContext";
import { useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { exploreEvents } from "../../common/api/event";
import { DateTime } from "luxon";

function EventList() {
  const { setShowNavbar, setShowLoading } = useContext(AppContext);
  const location = useLocation();
  const [events, setEvents] = useState([]);

  async function getEvents() {
    setShowLoading(true);
    
    const event = await exploreEvents({
      ...location.state
    });
    setEvents(event.data);

    setShowLoading(false);
  }

  useEffect(() => {
    setShowNavbar(true);
    getEvents();
    return function cleanup() {
      setShowNavbar(false);
    }; 
  }, []);

  return (
    <div className="p-3 h-screen">
      <div>
        {
          events.map((e, i) => <a key={i} href={`/event/${e._id}`} className="p-3 mt-4 block shadow-lg rounded-lg">
            <div>
              <img className="rounded-lg h-44 w-full object-cover" src={e.thumbnail} alt="" />
            </div>

            <div className="text-lg font-semibold truncate">{e.title}</div>
            
            <div className="flex my-3">
              <div className="flex-grow text-left">
                <i className="fas fa-location-dot"></i>&emsp;{e.address}
              </div>

              <div className="flex-grow text-right">
                {DateTime.fromISO(e.time, {zone: 'utc'}).toFormat('dd-LLL-yyyy')}&emsp;<i className="fas fa-calendar-days"></i>
              </div>
            </div>

            <div className="flex mt-6">
              <div className="flex-grow text-left">
                <button className="bg-green-400 py-3 px-4 rounded-lg text-white">See details</button>
              </div>

              {
                e.registeredUser.includes(localStorage.getItem('id')) && <div className="flex-grow text-right">
                  <button disabled className="bg-red-400 py-3 px-4 rounded-lg text-white">Reserved</button>
                </div>
              }
            </div>
          </a>)
        }
      </div>
    </div>
  );
}

export default EventList
