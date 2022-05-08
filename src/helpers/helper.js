import { addItemToCart, removeItemFromCart } from '../api/products.js';

export function handleAddToCart(event) {
    const productId = parseInt(event.target.dataset.id);
    addItemToCart(productId);
}

export function handleRemoveItemFromCart(event) {
    const productId = parseInt(event.target.dataset.id);
    removeItemFromCart(productId);
    event.target.closest('.checkout-item').remove();
    let total = parseInt(document.getElementById('total').innerText);
    document.getElementById('total').innerText = --total;
}