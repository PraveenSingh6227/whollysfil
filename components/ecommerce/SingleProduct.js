import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import { handleFilterImage,imagePath, sort_by } from "../../config/index";

const SingleProduct = ({
    product,
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
}) => {
    const handleCart = (product) => {
        product.selectedVariant = product.variants[0]
        addToCart(product);
        toast("Product added to Cart !");
    };

    const handleCompare = (product) => {
        addToCompare(product);
        toast("Added to Compare list !");
    };

    const handleWishlist = (product) => {
        addToWishlist(product);
        toast("Added to Wishlist !");
    };
    return (
        <>
            <div className="product-cart-wrap mb-30">
                <div className="product-img-action-wrap">
                    <div className="product-img product-img-zoom">
                        <Link
                            href="/products/[slug]"
                            as={`/products/${product.slug}`}
                        >
                            <a>
                                <img
                                    className="default-img"
                                    src={handleFilterImage(product)}
                                    alt=""
                                    style={{width:'100%',height:'170px'}}
                                />
                                <img
                                    className="hover-img"
                                    src={(product.img.length > 1) ? imagePath+product.img[1].path : ""}
                                    alt=""
                                />
                            </a>
                        </Link>
                    </div>
                    <div className="product-action-1">
                        <a
                            aria-label="Quick view"
                            className="action-btn hover-up"
                            data-bs-toggle="modal"
                            onClick={(e) => openQuickView(product)}
                        >
                            <i className="fi-rs-eye"></i>
                        </a>
                        <a
                            aria-label="Add To Wishlist"
                            className="action-btn hover-up"
                            onClick={(e) => handleWishlist(product)}
                        >
                            <i className="fi-rs-heart"></i>
                        </a>
                        <a
                            aria-label="Compare"
                            className="action-btn hover-up"
                            onClick={(e) => handleCompare(product)}
                        >
                            <i className="fi-rs-shuffle"></i>
                        </a>
                    </div>

                    <div className="product-badges product-badges-position product-badges-mrg">
                        {product.is_trending_products && <span className="hot">Hot</span>}
                        {/* {product.created && <span className="new">New</span>} */}
                        {/* {product.totalSell > 100 && (
                            <span className="best">Best Sell</span>
                        )} */}
                        {/* {product.discount.isActive && (
                            <span className="sale">Sale</span>
                        )}
                        {(product.variants.length > 0) ? product.variants[0].discount : ""  >= 5 && (
                            <span className="hot">
                                {(product.variants.length > 0) ? product.variants[0].discount : "" }%
                            </span>
                        )} */}
                    </div>
                </div>
                <div className="product-content-wrap">
                    <div className="product-category">
                        <Link href="/products">
                            <a>{product.brand}</a>
                        </Link>
                    </div>
                    <h2>
                        <Link
                            href="/products/[slug]"
                            as={`/products/${product.slug}`}
                        >
                            <a>{product.title}</a>
                        </Link>
                    </h2>

                    <div className="product-rate-cover">
                        <div className="product-rate d-inline-block">
                            <div
                                className="product-rating"
                                style={{ width: `${product.review.aggregateReview.rating_percent}%` }}
                            ></div>
                        </div>
                        <span className="font-small ml-5 text-muted">
                            {" "}
                            ({product.review.aggregateReview.total_review})
                        </span>
                    </div>

                    <div>
                        <span className="font-small text-muted">
                            By <Link href="#"><a>{product.vendor.name}</a></Link>
                        </span>
                    </div>

                    <div className="product-card-bottom">
                        <div className="product-price">
                            <span>Rs. {(product.variants.length > 0) ? product.variants[0].variant_sale_price : "" } </span>
                            <span className="old-price">{product.oldPrice && `Rs. ${product.oldPrice}`}</span>
                        </div>
                        <div className="add-cart">
                            <a
                                className="add"
                                onClick={(e) => handleCart(product)}
                            >
                                <i className="fi-rs-shopping-cart mr-5"></i> Add
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = {
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
};

export default connect(null, mapDispatchToProps)(SingleProduct);
