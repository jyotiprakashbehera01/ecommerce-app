import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = '$';
    const delivery_fee = 10;
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const [productList, setProductList] = useState(products);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/product/list', {
                    method: 'POST'
                });
                const data = await response.json();

                if (data.success && Array.isArray(data.products)) {
                    setProductList(data.products);
                }
            } catch (error) {
                console.error('Could not load products from the backend:', error);
            }
        };

        loadProducts();
    }, []);


    const addToCart = async (itemId,size) => {

        if(!size){
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
               cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

    }

      
   const getCartCount = () => {
    let totalCount = 0;

    for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
            totalCount += cartItems[productId][size];
        }
    }

    return totalCount;
   }


  const updateQuantity = async (itemId,size,quantity) =>{
      let cartData = structuredClone(cartItems);

      cartData[itemId][size] = quantity;

      setCartItems(cartData);
  }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = productList.find((product) => product._id === itemId);

            if (!itemInfo) {
                continue;
            }

            for (const size in cartItems[itemId]) {
                if (cartItems[itemId][size] > 0) {
                    totalAmount += itemInfo.price * cartItems[itemId][size];
                }
            }
        }
        return totalAmount;
    }


    const value = {
        products: productList,
        currency,
        delivery_fee,

        search,
        setSearch,
        showSearch,
        setShowSearch,

        cartItems,
        addToCart,

        getCartCount,

        updateQuantity,
        getCartAmount,
        navigate
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;