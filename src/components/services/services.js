import axios from 'axios';

export const getRegions = () => ([
    { id: 'North', title: 'North' },
    { id: 'South', title: 'South' },
    { id: 'East', title: 'East' },
    { id: 'West', title: 'West' },
])

export async function fetchAllPolicies() {
    return await axios.get("https://insurance-data-6d81c.firebaseio.com/data.json");
}

export async function updatePolicy(id, data) {
    return axios.put(`https://insurance-data-6d81c.firebaseio.com/data/${id}/.json`, data);
};