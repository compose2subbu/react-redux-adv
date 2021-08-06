import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";


export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://react-web-643bc-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json');

            if(!response.ok){
                throw new Error("error")
              }
            const data = await response.json();

            return data;
        };

        try{
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }))
          }catch(error){
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed!',
              }));
          }
    };
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'sending',
            message: 'Sending cart data!',
          }));

          const sendResponse = async () => {
            const response = await fetch('https://react-web-643bc-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',{
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity
                }),
              });

              if(!response.ok){
      
                dispatch(uiActions.showNotification({
                  status: 'error',
                  title: 'Error!',
                  message: 'Sending cart data failed!',
                }));
              }
          }
          try{
            await sendResponse();
          }catch(error){
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!',
              }));
          }
        
      
          dispatch(uiActions.showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Sent cart data successfully!',
          }));
          }
    };
    