import { DateTime } from "luxon";

function EventCard(props) {
    const { data } = props;

    return (
        <a className="shadow bg-white rounded-lg p-3 w-64 mr-5" href={`/event/${data._id}`} style={{minWidth: "230px", maxWidth: "280px"}}>
            <div className="relative">
              <img className="w-full h-44 object-cover rounded-lg" src={data.thumbnail} alt="" />

              <div className="absolute top-3 right-3">
                <div className="bg-green-500 rounded-lg py-2 px-3 shadow">
                  {
                    data.savedBy?.includes(localStorage.getItem('id')) 
                      ? <i className="fas fa-bookmark text-white"></i>
                      : <i className="fa-regular fa-bookmark text-white"></i>
                  }
                </div>
              </div>

              <div className="absolute top-3 left-3">
                <div className="bg-slate-200 bg-slate-300/75 text-center px-3 py-2 rounded-lg">
                  <div>{DateTime.fromISO(data.time, {zone: 'utc'}).toFormat('dd')}</div>
                  <div className="text-xs">{DateTime.fromISO(data.time, {zone: 'utc'}).monthShort}</div>
                </div>
              </div>
            </div>

            <div className="p-2">
              <div className="overflow-hidden truncate">
                {data.title}
              </div>

              <div className="text-sm my-3">
                <i className="fas fa-users"></i>&nbsp;&nbsp;{data.registeredUser.length} Going
              </div>

              <div className="text-slate-400">
                <i className="fas fa-location-dot"></i> {data.address}
              </div>
            </div>
          </a>
    );
}

export default EventCard;