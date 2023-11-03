import React,{ useEffect,useState } from "react"
// import { NavLink } from "react-router-dom";
import { Car } from "../Car/Car";


export const Products = () => {

    const [data,setData] = useState([]);
    const [Cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(0);
    
    const clearCart = () => {
        setCart([]);
    };
    
    

    useEffect(() => {
        const ApiUrl = 'https://fathomless-falls-16151-f2ccead2eed5.herokuapp.com/api/books';
    
        fetch(ApiUrl)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(`Error en la solicitud. Codigo de estado: ${response.status}`);
                }
            })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    
    
    const addToCart = (book) => {
        const FindCar = Cart.findIndex((item) => item.id === book.id);
        const stockAfterPurchase = book.stock - quantity;
      
        if (stockAfterPurchase >= 0) {
          if (FindCar !== -1) {
            const updatedCart = [...Cart];
            updatedCart[FindCar].quantity += quantity;
            setCart(updatedCart);
          } else {
            const item = { ...book, quantity };
            setCart([...Cart, item]);
          }
      
          const updatedData = [...data];
          const bookIndex = updatedData.findIndex((b) => b.id === book.id);
          if (bookIndex !== -1) {
            updatedData[bookIndex].stock = stockAfterPurchase;
            setData(updatedData);
          }

        } else {
          alert("No hay suficiente stock para esta cantidad.");
        }
        setQuantity(0);
      };
      
    


  return (
    <>
        <Car Cart={Cart} clearCart={clearCart}/>
        
        <div>
            <div className="text-left mb-8">
                <div className="w-11/12 h-[1px] bg-black my-4" ></div>
                <div className="flex justify-between w-11/12">
                    <h2>Libros Disponibles</h2>
                    {/* <NavLink to='/Car'>
                        <button className='border rounded-none border-gray-400 w-52 bg-gray-200'>ir al carrito de compras</button>
                    </NavLink> */}
                </div>
            </div>
            {data.map((book, id) => (
                <div className="flex">
                    <img className="w-1/4 mb-8" src={book.image} alt="" />
                    <div className="pl-8 text-left">
                        <h2 className="" key={id}>{book.name}</h2>
                        <p>Cantidad disponible: {book.stock}</p>
                        <p>Precio: ${book.price}</p>
                        <form className="h-8 flex items-center" onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="number">Agregar al carrito:</label>
                            <input 
                                className="w-[40px] mx-8 text-center border rounded-md" 
                                type="number" 
                                name="quantity" 
                                id={`quantity-${id}`} 
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}      
                                min={0}                      
                            />
                            <button 
                                className="h-full w-[100px] text-[0.7em] border rounded-none border-gray-400 bg-gray-200"
                                onClick={() => addToCart(book)}
                                >Agregar
                            </button>
                        </form>
                    </div>
                </div>
            ))}
        </div>
    </>
  )
}
