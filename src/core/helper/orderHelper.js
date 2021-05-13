import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ order: orderData })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


export const getOrders=(userId,token)=>{
  return fetch(`${API}/orders/user/${userId}`,{
    method:"GET",
     headers:{
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`

     }
  })
  .then(response=>{
      return response.json();
  })
  .catch(err=>console.log(err));
}