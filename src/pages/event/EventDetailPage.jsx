import AppContext from "../../common/context/AppContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router';
import { eventDetail, joinEvent, saveEvent } from "../../common/api/event";
import { DateTime } from "luxon";
import Skeleton from 'react-loading-skeleton';
import EventCard from "../../component/EventCard";

function EventDetailPage() {
  const {id} = useParams();
  const { setShowLoading } = useContext(AppContext);
  const [isFetching, setIsFetching] = useState(true)
  const [userId, setUserId] = useState(null);
  const [event, setEvent] = useState({});
  const [user, setUser] = useState({});
  const [otherEvent, setOtherEvent] = useState([]);
  
  async function getEvent() {
    setIsFetching(true);
    setShowLoading(true);
    const event = await eventDetail(id);
    setEvent(event.data.event);
    setOtherEvent(event.data.otherEvent);
    setUser(event.data.user);
    setIsFetching(false);
    setShowLoading(false);
  }

  async function join() {
    if(localStorage.getItem('id') == null) {
      window.location.href = '/auth/login';
    }

    const conf = confirm('Join this event?');

    if(conf) {
      setShowLoading(true);
      await joinEvent({
        eventId: event._id,
        userId: localStorage.getItem('id')
      });
      await getEvent();
    }
  }

  async function save() {
    if(!event.savedBy?.includes(userId)) {
      setShowLoading(true);
      await saveEvent({
        userId,
        eventId: event._id
      });
    } else {
      setShowLoading(true);
      await saveEvent({
        userId,
        unsave: true,
        eventId: event._id
      });
    }
    getEvent();
  }

  useEffect(() => {
    setUserId(localStorage.getItem('id'));
    getEvent();
  }, []);

  return (
    <div>
      <div className="static">
        <img src={event?.thumbnail} alt="" className="w-full h-72 sticky top-0" />

        {
          isFetching 
            ? <center><Skeleton count={4}  className="mt-3" style={{width: "95%"}}/> </center>
            : <>
                <div className="bg-white sticky px-7 py-7" style={{borderRadius: "50px", marginTop: "-45px"}}>
                  <div className="absolute" style={{top: "-20px", right: "35px"}}>
                    <button onClick={save} className="shadow-lg bg-green-500 w-14 h-14 rounded-full">
                      {
                        event.savedBy?.includes(userId) 
                          ? <i className="fas fa-bookmark text-white"></i>
                          : <i className="fa-regular fa-bookmark text-white"></i>
                      }
                    </button>
                  </div>

                  <div>
                    <h1 className="font-bold text-xl mb-1">{event?.title}</h1>
                    <p className="text-sm">{event?.description}</p>
                  </div>

                  <div className="flex mt-4 items-center">
                    <div>
                      <img src={user.img} alt="" className="rounded-full w-7 h-7 object-cover" />
                    </div>

                    <div className="flex-grow px-2 text-sm">
                      {user.name}
                    </div>

                    <div className="text-xs text-slate-400 text-right">
                      {DateTime.fromISO(event?.createdAt, {zone: 'utc'}).toRelativeCalendar()}
                    </div>
                  </div>

                  <div className="flex mt-4 items-center font-semibold">
                    <div>
                      <p>Date</p>
                      <p>{DateTime.fromISO(event?.time, {zone: "utc"}).toLocaleString(DateTime.DATE_SHORT)}</p>
                    </div>

                    <div className="flex-grow text-center">
                      <p><i className="fa-solid fa-location-dot"></i></p>
                      <p className="text-xs px-2">{event?.address}</p>
                    </div>

                    <div className="text-right">
                      <p>Time</p>
                      <p>{DateTime.fromISO(event?.time, {zone: "utc"}).toLocaleString(DateTime.TIME_SIMPLE)}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="font-semibold mb-2">About the event</p>
                    <p className="text-slate-500 text-sm">{event?.about}</p>
                  </div>

                  <div className="mt-5">
                    <p className="font-semibold mb-4">This event Benefits</p>
                    {
                      event?.benefits?.map((b, i) => {
                        return <div key={i} className="flex mb-2 text-sm">
                          <div className="w-8">
                            <img src={b.icon} alt="" width={20} />
                          </div>

                          <div>
                            {b.title}
                          </div>
                        </div>
                      })
                    }
                  </div>

                  <div className="mt-6">
                    <div className="font-semibold mb-2">About host</div>
                    <a className="flex items-center" href={`/profile/detail/${user._id}`}>
                      <div>
                        <img src={user?.img} alt="" className="rounded-full w-14 h-14 object-cover" />
                      </div>
                      <div className="px-3 font-semibold flex-grow">{user?.name}</div>
                      <div>
                        <button className="rounded-full bg-green-400 w-10 h-10"><i className="fas fa-plus text-white"></i></button>
                      </div>
                    </a>

                    <p className="mt-3 text-sm">
                      {user?.about}
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="font-semibold mb-2">Event you may like</div>
                    <div className="mt-2">
                      {
                        otherEvent.map((o, i) => {
                          return <EventCard data={o} key={i} />
                        })
                      }
                    </div>
                  </div>
              </div>
              <div className="sticky bottom-0 bg-white shadow-inner flex py-5 items-center justify-center">
                <div className="font-semibold text-center">
                  <div>Booked</div>
                  <div>{event.registeredUser?.length}/{event?.limit}</div>
                </div>
                
                {
                  event.userId != userId &&
                    <div className="w-2/3 text-right">
                      {
                        !event.registeredUser?.includes(userId) &&
                          <button onClick={join} className="bg-green-500 text-white rounded-lg p-4">
                            Register now
                          </button>
                      }

                      {
                        event.registeredUser?.includes(userId) &&
                          <button className="bg-slate-500 text-white rounded-lg p-4" disabled>
                            Reserved
                          </button>
                      }
                    </div>
                }
              </div>
            </>
        }
      </div>
    </div>
  );
}

export default EventDetailPage
