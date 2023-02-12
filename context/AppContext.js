import React, { createContext, useContext, useState } from 'react';

import { toast } from 'react-hot-toast';

const Context = createContext();

export const AppContext = ({ children }) => {
    const [ showCart, setShowCart ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartTotalValue, setCartTotalValue ] = useState(0);
    const [ cartItemsQuantity, setCartItemsQuantity ] = useState(0);
    const [ itemQuantity , setItemQuantity ] = useState(1);

    let itemToUpdate;

    function handleIncreaseClick() {
        setItemQuantity(prevItemQuantity => prevItemQuantity + 1);
    }

    function handleDecreaseClick() {
        setItemQuantity(prevItemQuantity => {
            if (prevItemQuantity - 1 < 1) return 1; 
            return prevItemQuantity - 1
        });
    }

    function handleAddToCartClick(product, quantity) {
        
        const checkItemInCart = cartItems.find(item => item._id === product._id);
        
        setCartTotalValue(prevCartTotalValue => prevCartTotalValue + product.price * quantity);
        setCartItemsQuantity(prevCartItemsQuantity => prevCartItemsQuantity + quantity);
        
        if (checkItemInCart) {
            
            const updatedCartItems = cartItems.map(cartItem => {
                if (cartItem._id === product._id) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + quantity
                    };
                }
            }); 

            setCartItems(updatedCartItems);
            
        } else {
            product.quantity = quantity;
            setCartItems(prevCartItems => [...prevCartItems, { ...product }]);
        }
        
        toast.success(`${itemQuantity} ${product.name} added to cart`);
        
    }

    function handleRemoveFromCartClick(id) {
        itemToUpdate = cartItems.find(item => item._id === id);
        const updatedCartItems = cartItems.filter(item => item._id !== id)
        
        setCartItems(updatedCartItems);   
        setCartItemsQuantity(prevQty => prevQty - itemToUpdate.quantity);
        setCartTotalValue(prevTotal => prevTotal - itemToUpdate.price * itemToUpdate.quantity);
    }

    function handleCartItemQuantityClick(id, value) {
        itemToUpdate = cartItems.find(item => item._id === id);
        
        
        if (value === 'increase') {
            const updatedCartItems = cartItems.map(item => (item._id === id ? { ...item, quantity: item.quantity + 1 } : item));
            setCartItems(updatedCartItems);
            setCartTotalValue((prevCartTotalValue) => prevCartTotalValue + itemToUpdate.price)
            setCartItemsQuantity(prevCartItemsQuantity => prevCartItemsQuantity + 1)

        } else if (value === 'decrease') {
            if (itemToUpdate.quantity > 1) {
                const updatedCartItems = cartItems.map(item => (item._id === id ? { ...item, quantity: item.quantity - 1 } : item));
                setCartItems([...updatedCartItems, { ...itemToUpdate, quantity: itemToUpdate.quantity - 1 } ]);
                setCartTotalValue((prevTotalPrice) => prevTotalPrice - itemToUpdate.price)
                setCartItemsQuantity(prevCartItemsQuantity => prevCartItemsQuantity - 1)
            } else {
                handleRemoveFromCartClick(id);
            }
        }

    }   

    const values = {
        cartItems,
        cartItemsQuantity,
        cartTotalValue,
        handleDecreaseClick,
        handleIncreaseClick,
        handleAddToCartClick,
        handleCartItemQuantityClick,
        handleRemoveFromCartClick,
        itemQuantity,
        setCartItems,
        setCartItemsQuantity,
        setCartTotalValue,
        setShowCart,
        showCart,
    }; 


    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    );
};


export const useAppContext = () => {
    return useContext(Context);
}