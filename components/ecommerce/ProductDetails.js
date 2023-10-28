import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
    addToCart,
    decreaseQuantity,
    increaseQuantity
} from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import ProductTab from "../elements/ProductTab";
import RelatedSlider from "../sliders/Related";
import ThumbSlider from "../sliders/Thumb";
import { useRouter } from "next/router";
import { server } from "../../config";


const ProductDetails = ({
    product,
    cartItems,
    addToCompare,
    addToCart,
    addToWishlist,
    increaseQuantity,
    decreaseQuantity,
    quickView,
}) => {
    const [quantity, setQuantity] = useState(1);
    const [productData, setProductData] = useState({});
    const [variantData, setVariantData] = useState({});
    let Router = useRouter();

    const fetchProductByCategorySlug = async () => {
        // With Category
        const slug = Router.query.slug ? Router.query.slug : product.slug
        const request = await fetch(`${server}?action=product_by_slug&slug=${slug}`);
        const allProducts = await request.json();
        if(allProducts.variants.length>0){
            setVariantData(allProducts.variants[0]);
        }
        setProductData(allProducts);
    };
    useEffect(() => {
        fetchProductByCategorySlug()
    }, [product,Router]);
    

 

    const handleCart = (product) => {
        product.selectedVariant = variantData
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

    const inCart = cartItems.find((cartItem) => cartItem.id === product.id);

    return (
        <>
            <section className="mt-50 mb-50">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <div className="col-xl-10 col-lg-12 m-auto">
                            <div className="product-detail accordion-detail">
                                <div className="row mb-50  mt-30">
                                    <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                                        <div className="detail-gallery">
                                            <span className="zoom-icon">
                                                <i className="fi-rs-search"></i>
                                            </span>

                                            <div className="product-image-slider">
                                                {Object.keys(productData).length>0 && (
                                                <ThumbSlider product={productData} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                        <div className="detail-info  pr-30 pl-30">
                                            {Object.keys(productData).length>0 && productData.variants.length > 0 && (
                                                <span className="stock-status out-stock"> Sale Off {variantData.discount}%</span>
                                            )}
                                            <h2 className="title-detail">{productData.title}</h2>
                                            <div className="product-detail-rating">
                                                <div className="product-rate-cover text-end">
                                                    <div className="product-rate d-inline-block">
                                                        <div className="product-rating" style={{ width: `${Object.keys(productData).length > 0 ? productData.review.aggregateReview.rating_percent : 0}%` }}></div>
                                                    </div>
                                                    <span className="font-small ml-5 text-muted"> ({Object.keys(productData).length > 0 ? productData.review.aggregateReview.total_review : 0} review/s)</span>
                                                </div>
                                            </div>
                                            <div className="clearfix product-price-cover">
                                                <div className="product-price primary-color float-left">
                                                    <span className="current-price  text-brand">Rs. {(Object.keys(productData).length>0 && productData.variants.length > 0) ? variantData.variant_sale_price : "" }</span>
                                                    <span>
                                                        <span className="save-price font-md color3 ml-15">{(Object.keys(productData).length>0 && productData.variants.length > 0) ? variantData.discount : "" }% Off</span>
                                                        <span className="old-price font-md ml-15">{productData.oldPrice ? `Rs. ${productData.oldPrice}` : null}</span>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="short-desc mb-30">
                                                <p className="font-lg">{productData.desc}</p>
                                            </div>
                                            <div className="attr-detail attr-color mb-15">
                                                <strong className="mr-10">Color</strong>
                                                <ul className="list-filter color-filter">
                                                    {Object.keys(productData).length>0 && productData.variants.map((clr, i) => (
                                                        <li key={i}>
                                                            <a href="javascript:void(0)" onClick={()=> setVariantData(productData.variants[i])}>
                                                                <span style={{background:clr.variant_color}}></span>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="attr-detail attr-size" style={{display:'block'}}>
                                               <div className="row">
                                                    <div className="col-md-3">
                                                        <p><strong className="mr-10">Dimension</strong> : </p>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <p>{(Object.keys(productData).length>0 && productData.variants.length > 0) ?  "Length - "+variantData.variant_length+"mm" : "" }</p>
                                                        <p>{(Object.keys(productData).length>0 && productData.variants.length > 0) ?  "Width - "+variantData.variant_width+"mm" : "" }</p>
                                                        <p>{(Object.keys(productData).length>0 && productData.variants.length > 0) ?  "Height - "+variantData.variant_height+"mm" : "" }</p>
                                                        <p>{(Object.keys(productData).length>0 && productData.variants.length > 0) ?  "Weight - "+variantData.variant_weight+"gm" : "" }</p>
                                                    </div> 
                                                </div>   
                                                {/* <ul className="list-filter size-filter font-small">
                                                    <li className="active">
                                                        <a>M</a>
                                                    </li>
                                                    <li>
                                                        <a>L</a>
                                                    </li>
                                                    <li>
                                                        <a>XL</a>
                                                    </li>
                                                    <li>
                                                        <a>XXL</a>
                                                    </li>
                                                </ul> */}
                                            </div>
                                            <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                                            <div className="detail-extralink">
                                                <div className="detail-qty border radius">
                                                    <a onClick={(e) => (!inCart ? setQuantity(quantity > 1 ? quantity - 1 : 1) : decreaseQuantity(productData?.pr_id))} className="qty-down">
                                                        <i className="fi-rs-angle-small-down"></i>
                                                    </a>
                                                    <span className="qty-val">{inCart?.quantity || quantity}</span>
                                                    <a onClick={() => (!inCart ? setQuantity(quantity + 1) : increaseQuantity(productData.pr_id))} className="qty-up">
                                                        <i className="fi-rs-angle-small-up"></i>
                                                    </a>
                                                </div>
                                                <div className="product-extra-link2">
                                                    <button
                                                        onClick={(e) =>
                                                            handleCart({
                                                                ...productData,
                                                                quantity: quantity || 1
                                                            })
                                                        }
                                                        className="button button-add-to-cart"
                                                    >
                                                        Add to cart
                                                    </button>
                                                    <a aria-label="Add To Wishlist" className="action-btn hover-up" onClick={(e) => handleWishlist(productData)}>
                                                        <i className="fi-rs-heart"></i>
                                                    </a>
                                                    <a aria-label="Compare" className="action-btn hover-up" onClick={(e) => handleCompare(productData)}>
                                                        <i className="fi-rs-shuffle"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <ul className="product-meta font-xs color-grey mt-50">
                                                <li className="mb-5">
                                                    SKU:
                                                    <a href="#">{(Object.keys(productData).length>0 && productData.variants.length > 0) ? " "+variantData.variant_sku: "" }</a>
                                                </li>
                                                <li className="mb-5">
                                                    Tags:
                                                    <a href="#" rel="tag" className="me-1">
                                                    {productData && " "+productData.tags }
                                                    </a>
                                                </li>
                                                <li>
                                                    Availability:
                                                    <span className="in-stock text-success ml-5">{(Object.keys(productData).length>0 && productData.variants.length > 0) ? variantData.variant_total_stock: 0 } Items In Stock</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {quickView ? null : (
                                    <>
                                        <ProductTab product={product} variant={variantData} />
                                        <div className="row mt-60">
                                            <div className="col-12">
                                                <h3 className="section-title style-1 mb-30">Related products</h3>
                                            </div>
                                            <div className="col-12">
                                                <div className="row related-products position-relative">
                                                    <RelatedSlider />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const mapStateToProps = (state) => ({
    cartItems: state.cart,
});

const mapDispatchToProps = {
    addToCompare,
    addToWishlist,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
