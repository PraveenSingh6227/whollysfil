import { useRouter } from "next/router";
import { connect } from "react-redux";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { updateProductCategory } from "./../../redux/action/productFiltersAction";
import { imagePath } from "../../config/index";

SwiperCore.use([Navigation, Autoplay]);
const data = [
    {
        bg: "bg-9"
    },
    {
        bg: "bg-10"
    },
    {
        bg: "bg-11"
    },
    {
        bg: "bg-12"
    },
    {
        bg: "bg-13"
    },
    {
        bg: "bg-14"
    },
    {
        bg: "bg-15"
    },
    {
        bg: "bg-12"
    },
    {
        bg: "bg-10"
    },
    {
        bg: "bg-12"
    },
    {
        bg: "bg-11"
    }
];
const CategorySlider = ({catData}) => {


    const router = useRouter();

    const selectCategory = (e, category) => {
        e.preventDefault();
        // removeSearchTerm();
        updateProductCategory(category);
        router.push({
            pathname: "/products",
            query: {
                cat: category //
            }
        });
    };

    return (
        <>
            <Swiper
                autoplay={true}
                navigation={{
                    prevEl: ".custom_prev_ct1",
                    nextEl: ".custom_next_ct1"
                }}
                className="custom-class"
                breakpoints={{
                    480: {
                        slidesPerView: 2
                    },
                    640: {
                        slidesPerView: 3
                    },
                    768: {
                        slidesPerView: 5
                    },
                    1024: {
                        slidesPerView: 8
                    },
                    1200: {
                        slidesPerView: 10
                    }
                }}
            >
                {catData.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className={`card-2 ${data[Math.floor(Math.random() * data.length)].bg} wow animate__animated animate__fadeInUp`} onClick={(e) => selectCategory(e, item.cat_slug)}>
                            <figure className=" img-hover-scale overflow-hidden">
                                <a>
                                    <img src={`${imagePath+item.icon}`} alt="" />
                                </a>
                            </figure>
                            <h6>
                                <a>{item.cat_name}</a>
                            </h6>
                            <span>{item.total_products} items</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="slider-arrow slider-arrow-2 flex-right carausel-10-columns-arrow" id="carausel-10-columns-arrows">
                <span className="slider-btn slider-prev slick-arrow custom_prev_ct1">
                    <i className="fi-rs-arrow-small-left"></i>
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_ct1">
                    <i className="fi-rs-arrow-small-right"></i>
                </span>
            </div>
        </>
    );
};

export default connect(null, { updateProductCategory })(CategorySlider);


// import SwiperCore, { Navigation } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";

// SwiperCore.use([Navigation]);

// const CategorySlider = () => {
//     return (
//         <>
//             <Swiper
//                 slidesPerView={1}
//                 spaceBetween={30}
//                 
//                 navigation={{
//                     prevEl: ".custom_prev",
//                     nextEl: ".custom_next",
//                 }}
//                 className="custom-class"
//             >
//                 <SwiperSlide>1</SwiperSlide>
//                 <SwiperSlide>2</SwiperSlide>
//                 <SwiperSlide>3</SwiperSlide>
//             </Swiper>

//             <div className="custom-nav">
//                 <button type="button" className="custom_prev">
//                     Prev
//                 </button>
//                 <button type="button" className="custom_next">
//                     Next
//                 </button>
//             </div>
//         </>
//     );
// };

// export default CategorySlider;
