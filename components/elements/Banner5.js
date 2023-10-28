import React from "react";
import Link from "next/link"
import { imagePath } from "../../config/index";

const Banner5 = ({bannerData}) => {
    return (
        <>
            <div className="col-lg-4 col-md-6">
                <div
                    className="banner-img wow animate__animated animate__fadeInUp"
                    data-wow-delay="0"
                >
                    {Object.keys(bannerData).length > 0 && (
                    <img src={`${imagePath}${bannerData.otherBanner.banner_middle_one}`} style={{width: '100%',height: '300px'}} alt="" />
                    )}
                    <div className="banner-text">
                        {/* <h4>
                            Everyday Fresh & <br />
                            Clean with Our
                            <br />
                            Products
                        </h4>
                        <Link href="/products"><a className="btn btn-xs">
                            Shop Now <i className="fi-rs-arrow-small-right"></i>
                        </a></Link> */}
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6">
                <div
                    className="banner-img wow animate__animated animate__fadeInUp"
                    data-wow-delay=".2s"
                >
                    {Object.keys(bannerData).length > 0 && (
                    <img src={`${imagePath}${bannerData.otherBanner.banner_middle_two}`} style={{width: '100%',height: '300px'}} alt="" />
                    )}
                    {/* <div className="banner-text">
                        <h4>
                            Make your Breakfast
                            <br />
                            Healthy and Easy
                        </h4>
                        <Link href="/products"><a className="btn btn-xs">
                            Shop Now <i className="fi-rs-arrow-small-right"></i>
                        </a></Link>
                    </div> */}
                </div>
            </div>
            <div className="col-lg-4 d-md-none d-lg-flex">
                <div
                    className="banner-img mb-sm-0 wow animate__animated animate__fadeInUp"
                    data-wow-delay=".4s"
                >
                    {Object.keys(bannerData).length > 0 && (
                    <img src={`${imagePath}${bannerData.otherBanner.banner_middle_three}`} style={{width: '100%',height: '300px'}} alt="" />
                    )}
                    {/* <div className="banner-text">
                        <h4>
                            The best Organic <br />
                            Products Online
                        </h4>
                        <Link href="/products"><a className="btn btn-xs">
                            Shop Now <i className="fi-rs-arrow-small-right"></i>
                        </a></Link>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default Banner5;
