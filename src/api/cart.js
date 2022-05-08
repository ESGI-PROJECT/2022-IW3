import { createRequest } from './api';

const request = createRequest();

export function getCart(id) {
    return request.get(`/cart/${id}/items`)
    .then(({ data }) => data)
    .catch(console.error);
}

export function getProductQuantityInCart(id, idProduct){
    return request.get(`/items?item.id=${idProduct}&cartId=${id}`)
    .then(({ data }) => [data[0].item.quantity, data[0].id])
    .catch(console.error); 
}

export function addProductToCart(id, idProduct){
    request.post(`/items`,
    {
        item: {
            id: idProduct,
            quantity: 1
        },
        cartId: id,
        },
    )
    .then(resp => {
        console.log(resp.data);
    }).catch(error => {
    
        console.log(error);
    });
}

export function updateProductToCart(id, idItem, idProduct, quantity){
    request.put(`/items/${idItem}`,
    {
        item: {
            id: idProduct,
          quantity: quantity
        },
        cartId: id,
      }
    )
    .then(resp => {
        console.log(resp.data);
    }).catch(error => {
    
        console.log(error);
    });
}

export function deleteProductFromCart(id){
    request.delete(`/items/${id}`);
}

export function deleteCart(id){
    request.delete(`/cart/${id}`);
}