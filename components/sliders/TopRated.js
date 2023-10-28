import Link from "next/link";
import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { fetchByCatagory } from "../../redux/action/product";
import { server,handleFilterImage } from "../../config/index";


SwiperCore.use([Navigation]);

const TopRatedSlider = () => {
    const [discount, setDiscount] = useState([]);

    // console.log(discount);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        // With Category
        const allProducts = await fetchByCatagory(`${server}?action=product_list`);

        // Discount
        // const discountProduct = allProducts.filter(
        //     (item) => item.discount.isActive
        // );

        setDiscount(allProducts);
    };
    return (
        <>
                {discount.slice(0,3).map((product, i) => (
                    <article className="row align-items-center hover-up" key={i}>
                    <figure className="col-md-4 mb-0">
                        <Link href="/products/[slug]"
                            as={`/products/${product.slug}`}><a>
                                <img src={handleFilterImage(product)}
                                  style={{width: '100%',height: '100px'}}
                                alt="" />
                                </a></Link>
                    </figure>
                    <div className="col-md-8 mb-0">
                        <h6>
                            <Link href="/products/[slug]"
                                as={`/products/${product.slug}`}><a>{product.title}</a></Link>
                        </h6>
                        <div className="product-rate-cover">
                            <div className="product-rate d-inline-block">
                                <div className="product-rating" style={{ width: `${product.review.aggregateReview.rating_percent}%` }}></div>
                            </div>
                            <span className="font-small ml-5 text-muted"> ({product.review.aggregateReview.total_review})</span>
                        </div>
                        <div className="product-price">
                            <span>Rs. {(product.variants.length > 0) ? product.variants[0].variant_sale_price : "" } </span>
                            <span className="old-price">{product.oldPrice && `Rs. ${product.oldPrice}`}</span>
                        </div>
                    </div>
                </article>
                ))}
        </>
    );
};


export default TopRatedSlider;
