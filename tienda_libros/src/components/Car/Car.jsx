import React from 'react'

export const Car = ({ Cart, clearCart }) => {

    
  return (
    <>
        <div className="text-left mb-8">
            <h1>Harry Books - Tienda Online</h1>
            <div className="w-11/12 h-[1px] bg-black my-4" ></div>
            <h2>Carrito de compras</h2>
        
            <table className='w-11/12'>
                <thead>
                    <tr className='w-11/12 bg-gray-200 border border-gray-400 text-center'>
                        <th className='w-[40%]'>Libros</th>
                        <th className='w-[20%]'>Cantidad</th>
                        <th className='w-[20%]'>Valor Unitario</th>
                        <th className='w-[20%]'>Valor Total</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {Cart && Cart.length > 0 ? (
                        Cart.map((item, id) => (
                                <tr key={id}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity * item.price}</td>
                                </tr>
                            ))
                        ):(
                            <tr>
                                <td>El carro esta vacio</td>
                            </tr>
                        )}
                </tbody>
            </table>
        
        </div>
        <div className='flex justify-between w-11/12'>
            <button className='bg-gray-200 border border-gray-400 p-1' onClick={clearCart}>Cancelar Compra</button>
            <button className='bg-gray-200 border border-gray-400 p-1'>Confirmar Compra</button>
        </div>
    </>
  )
}
