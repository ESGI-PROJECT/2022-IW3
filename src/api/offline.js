import { createRequest } from './api';

const request = createRequest();
const DEFAULT_OFFLINE = {
    "id": 1,
    "actions": []
};

export function getOfflineData() {
  return request.get("/offline")
    .then(({ data }) => data)
    .catch(console.error);
}

function setOfflineData(data) {
    return request.put("/offline", data)
      .then(({ data }) => data)
      .catch(console.error);
}

export async function addOfflineAction(action) {
    const offline = await getOfflineData();
    offline.actions.push(action);
    return setOfflineData(offline);
}

export async function clearOfflineData() {
    return setOfflineData(DEFAULT_OFFLINE);
}