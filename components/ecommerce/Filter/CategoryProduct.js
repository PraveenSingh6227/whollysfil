import { useRouter } from "next/router";
import { connect } from "react-redux";
import { updateProductCategory } from "../../../redux/action/productFiltersAction";
import { useEffect, useState } from "react";
import { server,imagePath } from "../../../config/index";


const CategoryProduct = ({ updateProductCategory }) => {
    const router = useRouter();

    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetchAllCategory();
    }, []);

    const fetchAllCategory = async () => {
        // With Category
        const request = await fetch(`${server}?action=category_list`);
        const allCategory = await request.json();
        setCategory(allCategory);
    };

    const selectCategory = (e, category) => {
        e.preventDefault();
        // removeSearchTerm();
        updateProductCategory(category);
        router.push({
            pathname: "/products",
            query: {
                cat: category, //
            },
        });
    };
    return (
        <>
            <ul>
                <li onClick={(e) => selectCategory(e, "")}>
                    <a>All</a>
                </li>
                {category.map((cat, i) => (
                    <li onClick={(e) => selectCategory(e, cat.cat_slug)}>
                        <a>
                            <img
                                src={`${imagePath+cat.icon}`}
                                alt=""
                            />
                           {cat.cat_name}
                        </a>
                        <span className="count">{cat.total_products}</span>
                    </li>     
                ))}
            </ul>
        </>
    );
};

export default connect(null, { updateProductCategory })(CategoryProduct);
