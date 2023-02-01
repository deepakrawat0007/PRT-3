import Header from "./header";
import { useState, useEffect } from "react";
import axios from "axios";
import "./main.css"

const MainFile = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState("")
    const [page, setPage] = useState(1)
    useEffect(() => {
        axios.get(`https://dummyjson.com/products?skip=${(page - 1) * 10}&limit=10`)
            .then((res) => {
                // console.log(res.data.products)
                setProducts(res.data.products)
                setLoading(false)
            }).catch((e) => {
                alert(e.message)
            })
    }, [page])
    useEffect(() => {
        if (category) {
            axios.get(`https://dummyjson.com/products/category/${category}`)
                .then((res) => {
                    // console.log(res.data)
                    setProducts(res.data.products)
                }).catch((e) => {
                    alert(e.message)
                })
        } else {

            axios.get(`https://dummyjson.com/products?skip=${(page - 1) * 10}&limit=10`)
            .then((res) => {
                // console.log(res.data.products)
                setProducts(res.data.products)
                setLoading(false)
            }).catch((e) => {
                alert(e.message)
            })
        }
    }, [category])
    const handleIncrement = () => {
        if(page === 5){
            setPage(1)
        }else{
        setPage(page + 1)
        }
    }
    const handleDecrement = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    return (
        <>
            <Header />
            <div className="Search">
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="smartphones">SmartPhones</option>
                    <option value="laptops">Laptops</option>
                    <option value="fragrances">Fragrances</option>
                    <option value="skincare">skincare</option>
                    <option value="groceries">groceries</option>
                    <option value="home-decoration">home-decoration</option>
                    <option value="furniture">furniture</option>
                    <option value="tops">tops</option>
                    <option value="womens-dresses">womens-dresses</option>
                    <option value="womens-shoes">womens-shoes</option>
                    <option value="mens-shirts">mens-shirts</option>
                    <option value="mens-shoes">Mens-shoes</option>
                    <option value="mens-watches">mens-watches</option>
                    <option value="womens-watches">womens-watches</option>
                    <option value="womens-bags">womens-bags</option>
                    <option value="womens-jewellery">womens-jewellery</option>
                    <option value="sunglasses">sunglasses</option>
                    <option value="automotive">automotive</option>
                    <option value="motorcycle">motorcycle</option>
                    <option value="lighting">lighting</option>

                </select>

            </div>
            <div className="products">
                {!loading && products.map((items, idx) => (
                    <div>
                        <div key={idx} className="cards">
                            <img src={items.thumbnail} alt="products" width={200} height={300} />
                            <div className="title">{items.title}</div>
                            <div className="popup">
                                <h3><b>Category:</b> {items.category}</h3>
                                <img src={items.thumbnail} alt="products" width={200} height={250} />
                                <div> <b>DESCRIPTION:</b>{items.description} </div>
                                <div ><b>Brand:</b>{items.brand}</div>
                                <div className="price"><b>PRICE:</b>{items.price}$</div>
                                <div ><b>DISCOUNT:</b>{items.discountPercentage}%</div>
                                <div ><b>RATING:</b>{items.rating}*</div>

                            </div>
                        </div>

                    </div>
                ))}
            </div>
            {products.length > 5 ? <div className="pagination">
                <button onClick={handleDecrement}>&lt;</button>
                <div>{page}</div>
                <button onClick={handleIncrement}>&gt;</button>
            </div> : ""}

        </>
    )


}

export default MainFile