import axios from "axios";

export async function postCreateNFT(data, callback) {
  // Save the result of the POST request
  const resp = await axios.post("http://localhost:5000/create", data);
  const hash = await callback(resp.data._id);
  return hash;
}

export async function updateNFT(id) {
  axios.put(`http://localhost:5000/update/${id}`)
}
