import axios from "axios";

export async function postCreateNFT(data, callback) {
  // Save the result of the POST request
  const resp = await axios.post("https://bridge.xp.network/db/create", data);
  const hash = await callback(resp.data._id);
  return hash;
}

export async function updateNFT(id) {
  axios.put(`https://bridge.xp.network/db/update/${id}`)
}
