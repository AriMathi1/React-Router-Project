import { use } from "react";
import { useEffect } from "react"
import { useState } from "react"


function Home({ cart, addToCart, removeFromCart, }) {
    const [products, setProducts] = useState([]);

    let fetchProducts = async () => {
        const productsData = await fetch('https://fakestoreapi.com/products');
        const productsResponse = await productsData.json();
        setProducts(productsResponse)
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <div className="flex bg-gray-100">
            <div className="w-full p-6 overflow-y-auto">
                <div className="grid grid-cols-4 gap-4 px-8">
                    {
                        products.map((product, index) => {
                            return (
                                <div key={index} className="p-4 bg-white rounded-lg shadow-md flex flex-col">
                                    <img className="object-cover w-full h-48 rounded-md" src={product.image} alt="" />
                                    <div className="flex-1 mt-4">
                                        <h3 className="line-clamp-2 text-lg font-semibold">{product.title}</h3>
                                    </div>
                                    <div className="flex-1 mt-4">
                                        <p className="line-clamp-2 text-sm text-gray-500">{product.description}</p>
                                    </div>
                                    <div className="mt-auto">
                                        <p className="text-lg font-semibold">Rs.{product.price}</p>

                                        {cart.find(cartItem => cartItem.id === product.id) ? (
                                            <button onClick={() => {
                                            removeFromCart(product.id)
                                            }} className="w-full px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                                                Remove from Cart
                                            </button>
                                        ) : <button onClick={() => {
                                            addToCart(product)
                                        }} className="w-full px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                                            Add to Cart
                                        </button>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home