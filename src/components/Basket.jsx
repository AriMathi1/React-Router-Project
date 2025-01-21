
import React from "react";
function Basket({ cart, total, disc, removeFromCart, quantities, increaseQuantity, decreaseQuantity,}) {

  


  return (
    <>
      <div className="bg-gray-100">
        <div className="font-sans max-w-4xl max-md:max-w-xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="md:col-span-2 space-y-4">
              {
                cart.map((product, index) => {
                  return <div key={index} className="flex gap-4 bg-white p-6 rounded-md shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
                    <div className="flex gap-4">
                      <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                        <img src={product.image} className="w-full h-full object-contain" />
                      </div>

                      <div className="flex flex-col gap-4">
                        <div className="w-9/12">
                          <h3 className="text-sm sm:text-base font-bold text-gray-800">{product.title}</h3>
                        </div>
                          <div className="mt-auto flex items-center gap-3">
                          <button  type="button" onClick={() => decreaseQuantity(product.id)}
                            className="flex items-center justify-center w-5 h-5 pb-1 font-bold outline-none border border-black rounded-full">
                            -
                          </button>
                          <span className="font-bold text-sm leading-[18px]">{quantities[product.id] || 1}</span>
                          <button   type="button" onClick={() => increaseQuantity(product.id)} className="flex items-center justify-center w-5 h-5 pb-1 font-bold outline-none border border-black rounded-full">
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="ml-auto flex flex-col">
                      <div className="flex items-start gap-4">
                        <button onClick={() => {
                          removeFromCart(product.id)
                        }} className="w-4 h-4 text-sm cursor-pointer fill-gray-400 text-pink-500 inline-block"> Remove</button>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-800 mt-auto">Rs {product.price.toFixed(2)}</h3>
                    </div>
                  </div>
                })
              }
            </div>

            <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
              <ul className="text-gray-800 space-y-4">
                <li className="flex flex-wrap gap-4 text-sm">Subtotal <span className="ml-auto font-bold">Rs {total.toFixed(2)}</span></li>
                <li className="flex flex-wrap gap-4 text-sm">Discount (10%) <span className="ml-auto font-bold">Rs {disc.toFixed(2)}</span></li>
                <hr className="border-gray-300" />
                <li className="flex flex-wrap gap-4 text-sm font-bold">Total <span className="ml-auto">Rs {(total - disc).toFixed(2)}</span></li>
              </ul>

              <div className="mt-8 space-y-2">
                <button type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md">Buy Now</button>
                <button type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md">Continue Shopping  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Basket