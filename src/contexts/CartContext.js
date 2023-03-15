import React, { useState, useEffect, createContext } from 'react';

export const CartContext = createContext();

export function CartContextProvider(props) {
    const [cart, setCart] = useState({});

    useEffect(() => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || {};
        setCart(existingCart);
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addItemToCart = (item, quantity) => {
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };
            if (updatedCart[item.id]) {
                updatedCart[item.id].quantity += item.quantity;
            } else {
                updatedCart[item.id] = item;
            }
            return updatedCart;
        });
    };

    const removeItemFromCart = (itemId) => {
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };
            delete updatedCart[itemId];
            return updatedCart;
        });
    };

    const updateItemQuantity = (itemId, newQuantity) => {
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };
            updatedCart[itemId].quantity = newQuantity;
            return updatedCart;
        });
    };

    const contextValue = {
        cart,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContext;
