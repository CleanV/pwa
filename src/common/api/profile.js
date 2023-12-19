import axios from "axios";
import { URL } from "../app/api";

export async function getProfile(userId) {
    return (await axios.get(`${URL}/profile/get`, {
        params: {
            userId
        }
    })).data;
}

export async function editProfile(userId, set) {
    return (await axios.put(`${URL}/profile/update`, {
        userId,
        set,
    })).data;
}