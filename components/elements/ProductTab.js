import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";
import { server } from "../../config/index";
import moment from 'moment'
import { useRouter } from "next/router";


const ProductTab = ({product,variant}) => {
    const [activeIndex, setActiveIndex] = useState(1);
    const [reviewComment, setReviewComment] = useState("");
    const [reviewRating, setReviewRating] = useState(0);
    const [productData, setProductData] = useState({});

    let Router = useRouter();


    useEffect(() => {
        fetchProductByCategorySlug()
    }, [product,Router]);

    const handleOnClick = (index) => {
        setActiveIndex(index);
    };

    const ratingChanged = (newRating) => {
        setReviewRating(newRating)
      };
     
    const handleReview = (e) =>{
        e.preventDefault()
        const userDetails = JSON.parse(localStorage.getItem('userDetails'))
        if(userDetails==null){
            toast("Please login in order to review the productData.");
            return;
        }
        if(reviewRating==0){
            toast("Please add rating to this productData.");
            return
        }
        if(reviewComment==""){
            toast("Please add your comment to this productData.");
            return
        }
        let bodyFormData = new FormData();
            bodyFormData.append('user_id', userDetails.user_id);  
              bodyFormData.append('product_id', productData.pr_id);
              bodyFormData.append('rating',reviewRating );
              bodyFormData.append('comment', reviewComment);
              bodyFormData.append('action', 'product_review');
              fetch(`${server}`, {
                method: "POST",
                body: bodyFormData,
              })
              .then((response) => response.json())
              .then((response) => {
                  if (response.status === 200) {
                    setReviewComment("")
                    setReviewRating(0)
                    toast("Your review is submitted successfully. Thank you!");
                    fetchProductByCategorySlug()
                  }else{
                    toast(response.message)
                    setReviewComment("")
                    setReviewRating(0)
                  }
              });

    }  

    const fetchProductByCategorySlug = async () => {
        // With Category
        const slug = Router.query.slug ? Router.query.slug : productData.slug
        const request = await fetch(`${server}?action=product_by_slug&slug=${slug}`);
        const allProducts = await request.json();
        setProductData(allProducts);
    };

    const searchRating = (nameKey, myArray) => {
        for (let i=0; i < myArray.length; i++) {
            if (myArray[i].rating == nameKey) {
                return myArray[i].rating_percent;
            }
        }
    }

    return (
        <div className="product-info">
            <div className="tab-style3">
                <ul className="nav nav-tabs text-uppercase">
                    <li className="nav-item">
                        <a className={activeIndex === 1 ? "nav-link active" : "nav-link"} id="Description-tab" data-bs-toggle="tab" onClick={() => handleOnClick(1)}>
                            Description
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={activeIndex === 2 ? "nav-link active" : "nav-link"} id="Additional-info-tab" data-bs-toggle="tab" onClick={() => handleOnClick(2)}>
                            Additional info
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={activeIndex === 3 ? "nav-link active" : "nav-link"} id="Reviews-tab" data-bs-toggle="tab" onClick={() => handleOnClick(3)}>
                            Vendor
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={activeIndex === 4 ? "nav-link active" : "nav-link"} id="Reviews-tab" data-bs-toggle="tab" onClick={() => handleOnClick(4)}>
                            Reviews ({Object.keys(productData).length > 0 && productData.review.aggregateReview.total_review})
                        </a>
                    </li>
                </ul>
                <div className="tab-content shop_info_tab entry-main-content">
                    <div className={activeIndex === 1 ? "tab-pane fade show active" : "tab-pane fade"} id="Description">
                        <div className="">
                            <p>{Object.keys(productData).length>0 && productData.description}</p>
                        </div>
                    </div>
                    <div className={activeIndex === 2 ? "tab-pane fade show active" : "tab-pane fade"} id="Additional-info">
                        <table className="font-md">
                            <tbody>
                                <tr className="weight-wo-wheels">
                                    <th>Length</th>
                                    <td>
                                        <p>{Object.keys(productData).length>0 && (productData.variants.length > 0) ?  "Length - "+variant.variant_length+"mm" : "" }</p>                                      
                                    </td>
                                </tr>
                                <tr className="weight-capacity">
                                    <th>Width</th>
                                    <td>
                                        <p>{Object.keys(productData).length>0 && (productData.variants.length > 0) ?  "Width - "+variant.variant_width+"mm" : "" }</p>                                       
                                    </td>
                                </tr>
                                <tr className="width">
                                    <th>Height</th>
                                    <td>
                                        <p>{Object.keys(productData).length>0 && (productData.variants.length > 0) ?  "Height - "+variant.variant_height+"mm" : "" }</p>                                       
                                    </td>
                                </tr>
                                <tr className="handle-height-ground-to-handle">
                                    <th>Weight</th>
                                    <td>
                                        <p>{Object.keys(productData).length>0 && (productData.variants.length > 0) ?  "Weight - "+variant.variant_weight+"gm" : "" }</p>
                                    </td>
                                </tr>
                                <tr className="pa_color">
                                    <th>Color</th>
                                    <td>
                                        <ul className="list-filter color-filter">
                                            {Object.keys(productData).length>0 && productData.variants.map((clr, i) => (
                                                <li key={i}>
                                                    <a href="javascript:void(0)">
                                                        <span style={{ background: clr.variant_color }}></span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={activeIndex === 3 ? "tab-pane fade show active" : "tab-pane fade"} id="Reviews">
                        <div className="vendor-logo d-flex mb-30">
                            {/* <img src="/assets/imgs/vendor/vendor-18.svg" alt="" /> */}
                            <div className="vendor-name ml-15">
                                <h6>
                                    <a href="#">{Object.keys(productData).length>0 && productData.vendor.name}</a>
                                </h6>
                                <div className="product-rate-cover text-end">
                                    <div className="product-rate d-inline-block">
                                        <div className="product-rating" style={{ width: "90%" }}></div>
                                    </div>
                                    <span className="font-small ml-5 text-muted"> (32 reviews)</span>
                                </div>
                            </div>
                        </div>
                        <ul className="contact-infor mb-50">
                            <li>
                                <img src="/assets/imgs/theme/icons/icon-location.svg" alt="" />
                                <strong>Address: </strong> <span>{Object.keys(productData).length>0 && productData.vendor.address}</span>
                            </li>
                            <li>
                                <img src="/assets/imgs/theme/icons/icon-contact.svg" alt="" />
                                <strong>Contact Seller:</strong>
                                <span>{Object.keys(productData).length>0 && productData.vendor.mobile}</span>
                            </li>
                        </ul>
                        <div className="d-flex mb-55">
                            <div className="mr-30">
                                <p className="text-brand font-xs">Rating</p>
                                <h4 className="mb-0">92%</h4>
                            </div>
                            <div className="mr-30">
                                <p className="text-brand font-xs">Ship on time</p>
                                <h4 className="mb-0">100%</h4>
                            </div>
                            <div>
                                <p className="text-brand font-xs">Chat response</p>
                                <h4 className="mb-0">89%</h4>
                            </div>
                        </div>
                        {/* <p>Noodles & Company is an American fast-casual restaurant that offers international and American noodle dishes and pasta in addition to soups and salads. Noodles & Company was founded in 1995 by Aaron Kennedy and is headquartered in Broomfield, Colorado. The company went public in 2013 and recorded a $457 million revenue in 2017.In late 2018, there were 460 Noodles & Company locations across 29 states and Washington, D.C.</p> */}
                    </div>
                    <div className={activeIndex === 4 ? "tab-pane fade show active" : "tab-pane fade"} id="Reviews">
                        {Object.keys(productData).length>0 && productData.review.reviewList.length > 0 && (     
                        <div className="comments-area">
                            <div className="row">
                                <div className="col-lg-8">
                                    <h4 className="mb-30">Customer questions & answers</h4>
                                    {Object.keys(productData).length>0 && productData.review.reviewList.map((productReview, i) => (
                                        <div className="comment-list">
                                            <div className="single-comment justify-content-between d-flex">
                                                <div className="user justify-content-between d-flex">
                                                    <div className="thumb text-center">
                                                        <img src="/assets/imgs/blog/user.png" alt="" />
                                                        <h6>
                                                            <a href="#">{productReview.name}</a>
                                                        </h6>
                                                    </div>
                                                    <div className="desc">
                                                        <div className="product-rate d-inline-block">
                                                            <div
                                                                className="product-rating"
                                                                style={{ width: `${productReview.rating_percent}%` }}
                                                            ></div>
                                                        </div>
                                                        <p>{productReview.comment}</p>
                                                        <div className="d-flex justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <p className="font-xs mr-30">{moment(productReview.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-lg-4">
                                    <h4 className="mb-30">Customer reviews</h4>
                                    <div className="d-flex mb-30">
                                        <div className="product-rate d-inline-block mr-15">
                                            <div
                                                className="product-rating"
                                                style={{
                                                    width: "90%"
                                                }}
                                            ></div>
                                        </div>
                                        <h6>{Object.keys(productData).length>0 && productData.review.aggregateReview.avg_rating} out of 5</h6>
                                    </div>
                                    {[...Array(5)].map((_, index) => ( 
                                    <div className="progress">
                                        <span>{5-index} star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: `${searchRating((5-index),Object.keys(productData).length>0 && productData.review.aggregateReviewCount) ? searchRating((5-index),productData.review.aggregateReviewCount) : 0 }%`
                                            }}
                                            aria-valuenow="50"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            {searchRating((5-index),Object.keys(productData).length>0 && productData.review.aggregateReviewCount)}%
                                        </div>
                                    </div>
                                    ))}
                                    {/* <div className="progress">
                                        <span>4 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 25%"
                                            }}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            25%
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <span>3 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 45%"
                                            }}
                                            aria-valuenow="45"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            45%
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <span>2 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 65%"
                                            }}
                                            aria-valuenow="65"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            65%
                                        </div>
                                    </div>
                                    <div className="progress mb-30">
                                        <span>1 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 85%"
                                            }}
                                            aria-valuenow="85"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            85%
                                        </div>
                                    </div> */}
                                    <a href="#" className="font-xs text-muted">
                                        How are ratings calculated?
                                    </a>
                                </div>
                            </div>
                        </div>
                        )}   

                        <div className="comment-form">
                            <h4 className="mb-15">Add a review</h4>
                            <div className="d-inline-block mb-30">
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={24}
                                    activeColor="#ffd700"
                                    value={0}
                                />
                            </div>
                            <div className="row">
                                <div className="col-lg-8 col-md-12">
                                    <form className="form-contact comment_form" action="#" id="commentForm">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <textarea className="form-control w-100" value={reviewComment} onChange={(e)=> setReviewComment(e.target.value)} name="comment" id="comment" cols="30" rows="9" placeholder="Write Comment"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" onClick={(e)=>handleReview(e)} className="button button-contactForm">
                                                Submit Review
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductTab;
