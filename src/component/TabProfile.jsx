import { useEffect, useRef, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import { exploreEvents } from "../common/api/event";
import { DateTime } from "luxon";

function TabProfile(props) {
    const {content = 'Ingfokan titan terdekat', userId} = props;
    const [contentSelected, setContentSelected] = useState('');
    const [tabSelected, setTabSelected] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    async function handleSelect(num) {
        setTabSelected(num);
        setIsLoading(true);

        if(num === 0) { 
            setContentSelected(content);
        } else if(num === 1) { 
            const events = await exploreEvents({
                userId
            });

            setContentSelected(events.data.map((e, i) => <a key={i} href={`/event/${e._id}`} className="flex block bg-white rounded-lg shadow px-2 py-1.5">
                <div className="flex-grow">
                    <img className="w-full h-20 object-cover rounded-lg" src={e.thumbnail} alt="" />
                </div>
                <div className="w-3/4 px-4">
                    <div className="text-blue-400 text-xs">{DateTime.fromISO(e.time, {zone: 'utc'}).toFormat("dd LLL - h:mm a")}</div>
                    <div className="text-lg mt-1 text-black">{e.title}</div>
                </div>
            </a>));
        } else if(num === 2) { 
            const events = await exploreEvents({
                registeredUserId: userId
            });

            setContentSelected(events.data.map((e, i) => <a key={i} href={`/event/${e._id}`} className="flex block bg-white rounded-lg shadow px-2 py-1.5">
                <div className="flex-grow">
                    <img className="w-full h-20 object-cover rounded-lg" src={e.thumbnail} alt="" />
                </div>
                <div className="w-3/4 px-4">
                    <div className="text-blue-400 text-xs">{DateTime.fromISO(e.time, {zone: 'utc'}).toFormat("dd LLL - h:mm a")}</div>
                    <div className="text-lg mt-1 text-black">{e.title}</div>
                </div>
            </a>));
        }

        setIsLoading(false);
    }

    useEffect(() => {
        setContentSelected(content);
    }, [content]);

    return (
        <>
            <div className="flex mt-8 text-sm">
                <div className="w-1/3">
                    <button onClick={() => handleSelect(0)} className={`${tabSelected === 0 ? 'border-b' : ''} border-green-400 pb-1`}>ABOUT</button>
                </div>
                <div className="w-1/3">
                    <button onClick={() => handleSelect(1)} className={`${tabSelected === 1 ? 'border-b' : ''} border-green-400 pb-1`}>MY EVENT</button>
                </div>
                <div className="w-1/3">
                    <button onClick={() => handleSelect(2)} className={`${tabSelected === 2 ? 'border-b' : ''} border-green-400 pb-1`}>RESERVED</button>
                </div>
            </div>

            <div className="text-sm mt-4 text-left text-slate-400 px-9">
                {
                    isLoading 
                        ? <Skeleton count={2} /> 
                        : <>{contentSelected}</>
                }
            </div>
        </>
    );
}

export default TabProfile;