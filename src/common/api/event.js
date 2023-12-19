import axios from "axios";
import { URL } from "../app/api";

export async function eventDetail(eventId) {
    return (await axios.get(`${URL}/event/detail`, {
        params: {
            eventId
        }
    })).data;
}

export async function createEvent({userId = localStorage.getItem('id'), title, description, about, coordinates, address, time, benefits, limit, license, thumbnail}) {
    return (await axios.post(`${URL}/event/create`, {
        userId,
        title,
        description,
        about,
        coordinates,
        address, 
        time, 
        benefits, 
        limit, 
        license, 
        thumbnail
    })).data;
}

export async function exploreEvents({savedBy = undefined, exceptBy = undefined, userId = undefined, title = undefined, location = undefined, page = 1, registeredUserId = undefined}) {
    return (await axios.get(`${URL}/event/explore`, {
        params: {
            savedBy,
            userId,
            title,
            location,
            exceptBy,
            page,
            registeredUserId,
        }
    })).data;
}

export async function joinEvent({eventId = undefined, userId = undefined}) {
    return (await axios.put(`${URL}/event/join`, {
        userId,
        eventId,
    })).data;
}

export async function saveEvent({eventId = undefined, userId = undefined, unsave = false}) {
    return (await axios.put(`${URL}/event/save`, {
        userId,
        unsave,
        eventId,
    })).data;
}