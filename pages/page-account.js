import Layout from "../components/layout/Layout";
import Link from "next/link"
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Preloader from "./../components/elements/Preloader";
import { server } from "../config/index";

function Account() {

    const [activeIndex, setActiveIndex] = useState(1);
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [flatNo, setFlatNo] = useState("");
    const [fullAdress, setFullAdress] = useState("");
    const [city, setCity] = useState("");
    const [userState, setUserState] = useState("");
    const [pincode, setPincode] = useState("");
    const [mobileNo, setMobileNo] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [npassword, setNPassword] = useState("");

    const handleOnClick = (index) => {
        setActiveIndex(index); // remove the curly braces
        console.log('index-->', index)
        if (index === 2) {
            console.log('index==>', index)
            if (
                localStorage.getItem('userDetails') &&
                localStorage.getItem('userDetails') !== undefined
            ) {
                setUserDetails(JSON.parse(localStorage.getItem('userDetails')));
                let bodyFormData = new FormData();
                bodyFormData.append("user_id", JSON.parse(localStorage.getItem('userDetails')).user_id);
                bodyFormData.append("action", "order_list");
                const response = fetch(
                    server,
                    {
                        method: "POST",
                        body: bodyFormData,
                    }
                )
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.status === 200) {
                            //    setOrderData(JSON.parse(response.orderDetails.product_info))
                            setOrderData(response.orderDetails)
                            console.log(orderData)
                        }
                    });
            }
        }
    };

    useEffect(()=>{
        setUserDetails(JSON.parse(localStorage.getItem('userDetails')));
    },[])

    const saveAddress = async () => {
        if(flatNo===""){
            toast("Please enter your flat no. or floor no. or house no.");
            return
        }
        if(fullAdress===""){
            toast("Please enter your fullAdress.");
            return
        }
        if(city===""){
            toast("Please enter your city.");
            return
        }
        if(userState===""){
            toast("Please enter your state.");
            return
        }
        if(pincode===""){
            toast("Please enter your pincode.");
            return
        }
        if(mobileNo===""){
            toast("Please enter your Mobile No.");
            return
        }
        setLoading(true);
        let bodyFormData = new FormData();
        bodyFormData.append("user_id", userDetails.user_id)
        bodyFormData.append("flatNo", flatNo);
        bodyFormData.append("fullAdress", fullAdress);
        bodyFormData.append("city", city);
        bodyFormData.append("state", userState);
        bodyFormData.append("pincode", pincode);
        bodyFormData.append("mobileNo", mobileNo);
        bodyFormData.append("action", "save_address");
        const response = await fetch(
          server,
          {
            method: "POST",
            body: bodyFormData,
          }
        )
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
            if (response.status === 400) {
                toast(response.message);
            }else{
                toast(response.message);
                localStorage.setItem('userDetails', JSON.stringify(response.userDetails));
                setUserDetails(JSON.parse(localStorage.getItem('userDetails')));
            }
          });
      };

      const saveAccountDetails = async () => {
        if(name===""){
            toast("Please enter your Full Name");
            return
        }
        if(email===""){
            toast("Please enter your email address.");
            return
        }
        if(password===""){
            toast("Please enter your current password.");
            return
        }
        if(npassword===""){
            toast("Please enter your new password.");
            return
        }
        setLoading(true);
        let bodyFormData = new FormData();
        bodyFormData.append("user_id", userDetails.user_id)
        bodyFormData.append("name", name);
        bodyFormData.append("email", email);
        bodyFormData.append("password", password);
        bodyFormData.append("npassword", npassword);
        bodyFormData.append("action", "save_account_details");
        const response = await fetch(
          server,
          {
            method: "POST",
            body: bodyFormData,
          }
        )
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
            if (response.status === 400) {
                toast(response.message);
            }else{
                toast(response.message);
                localStorage.setItem('userDetails', JSON.stringify(response.userDetails));
                setUserDetails(JSON.parse(localStorage.getItem('userDetails')));
            }
          });
      };

    return (
        <>
        {!loading ? (
            <Layout parent="Home" sub="Pages" subChild="Account">
                <div className="page-content pt-150 pb-150">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="dashboard-menu">
                                            <ul className="nav flex-column" role="tablist">
                                                <li className="nav-item">
                                                    <a className={activeIndex === 1 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick(1)}><i className="fi-rs-settings-sliders mr-10"></i>Dashboard</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className={activeIndex === 2 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick(2)}><i className="fi-rs-shopping-bag mr-10"></i>Orders</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className={activeIndex === 3 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick(3)}><i className="fi-rs-shopping-cart-check mr-10"></i>Track Your Order</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className={activeIndex === 4 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick(4)}><i className="fi-rs-marker mr-10"></i>My Address</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className={activeIndex === 5 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick(5)}><i className="fi-rs-user mr-10"></i>Account details</a>
                                                </li>
                                                <li className="nav-item">
                                                    <Link href="/page-login"><a className="nav-link"><i className="fi-rs-sign-out mr-10"></i>Logout</a></Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="tab-content account dashboard-content pl-50">
                                            <div className={activeIndex === 1 ? "tab-pane fade active show" : "tab-pane fade "} >
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="mb-0">Hello {userDetails.name}!</h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <p>
                                                            From your account dashboard. you can easily check &amp; view your <a href="#">recent orders</a>,<br />
                                                            manage your <a href="#">shipping and billing addresses</a> and <a href="#">edit your password and account details.</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={activeIndex === 2 ? "tab-pane fade active show" : "tab-pane fade "} >
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="mb-0">Your Orders</h3>
                                                    </div>
                                                    {orderData.length > 0 ? (
                                                        <div className="card-body">
                                                            <div className="table-responsive">
                                                                <table className="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Order</th>
                                                                            <th>Date</th>
                                                                            <th>Status</th>
                                                                            <th>Total</th>
                                                                            {/* <th>Actions</th> */}
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {orderData.map((item, i) => (
                                                                            <tr>
                                                                                <td>#{item.id}</td>
                                                                                <td>{item.created_at}</td>
                                                                                <td>{item.order_status}</td>
                                                                                <td>INR {item.total}</td>
                                                                                {/* <td><a href="#" className="btn-small d-block">View</a></td> */}
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="card-body">
                                                            <p>
                                                                No Order Found
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={activeIndex === 3 ? "tab-pane fade active show" : "tab-pane fade "} >
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="mb-0">Orders tracking</h3>
                                                    </div>
                                                    <div className="card-body contact-from-area">
                                                        <p>To track your order please enter your OrderID in the box below and press "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
                                                        <div className="row">
                                                            <div className="col-lg-8">
                                                                <form className="contact-form-style mt-30 mb-50" action="#" method="post">
                                                                    <div className="input-style mb-20">
                                                                        <label>Order ID</label>
                                                                        <input name="order-id" placeholder="Found in your order confirmation email" type="text" />
                                                                    </div>
                                                                    <div className="input-style mb-20">
                                                                        <label>Billing email</label>
                                                                        <input name="billing-email" placeholder="Email you used during checkout" type="email" />
                                                                    </div>
                                                                    <button className="submit submit-auto-width" type="submit">Track</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={activeIndex === 4 ? "tab-pane fade active show" : "tab-pane fade "} >
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="card mb-3 mb-lg-0">
                                                            <div className="card-header">
                                                                <h3 className="mb-0">Address</h3>
                                                            </div>
                                                            <div className="card-body">
                                                                <form method="post">
                                                                    <div className="form-group">
                                                                        <input
                                                                            type="text"
                                                                            required=""
                                                                            name="flat_no"
                                                                            autoComplete="off"
                                                                            value={flatNo}
                                                                            onChange={(e) => {
                                                                                setFlatNo(e.target.value);
                                                                            }}
                                                                            placeholder="Flat no./ Floor no.*"
                                                                        />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <input
                                                                            type="text"
                                                                            required=""
                                                                            name="full_adress"
                                                                            autoComplete="off"
                                                                            value={fullAdress}
                                                                            onChange={(e) => {
                                                                                setFullAdress(e.target.value);
                                                                            }}
                                                                            placeholder="Full Address"
                                                                        />
                                                                        </div>
                                                                        <div className="form-group">
                                                                        <input
                                                                            type="text"
                                                                            required=""
                                                                            name="city"
                                                                            autoComplete="off"
                                                                            value={city}
                                                                            onChange={(e) => {
                                                                                setCity(e.target.value);
                                                                            }}
                                                                            placeholder="City"
                                                                        />
                                                                        </div>
                                                                        <div className="form-group">
                                                                           <input
                                                                            type="text"
                                                                            required=""
                                                                            name="state"
                                                                            autoComplete="off"
                                                                            value={userState}
                                                                            onChange={(e) => {
                                                                                setUserState(e.target.value);
                                                                            }}
                                                                            placeholder="State"
                                                                        />
                                                                        </div>
                                                                        <div className="form-group">
                                                                        <input
                                                                            type="number"
                                                                            required=""
                                                                            name="pin_code"
                                                                            autoComplete="off"
                                                                            value={pincode}
                                                                            onChange={(e) => {
                                                                                setPincode(e.target.value);
                                                                            }}
                                                                            placeholder="PIN Code"
                                                                        />
                                                                        </div>
                                                                    <div className="form-group">
                                                                           <input
                                                                            type="number"
                                                                            required=""
                                                                            name="mobile_no"
                                                                            autoComplete="off"
                                                                            value={mobileNo}
                                                                            onChange={(e) => {
                                                                                setMobileNo(e.target.value);
                                                                            }}
                                                                            placeholder="Mobile No."
                                                                        />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <button
                                                                            type="button"
                                                                            onClick={saveAddress}
                                                                            className="btn btn-heading btn-block hover-up"
                                                                            name="save_address"
                                                                        >
                                                                            Save Address
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="card">
                                                            <div className="card-header">
                                                                <h5 className="mb-0">Billing/Shipping Address</h5>
                                                            </div>
                                                            <div className="card-body">
                                                                {userDetails.flatNo ? (
                                                               <>
                                                                <address>
                                                                    {userDetails.flatNo}<br />
                                                                    {userDetails.fullAdress}, <br /> {userDetails.pincode}, {userDetails.city} <br />Phone:  {userDetails.mobileNo}
                                                                </address>
                                                                <p> {userDetails.state}</p>
                                                               </>
                                                                ) : (
                                                                    <p>Address is not available, please update your address.</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={activeIndex === 5 ? "tab-pane fade active show" : "tab-pane fade "} >
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h5>Account Details</h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <p>Already have an account? <Link href="/page-login"><a>Log in instead!</a></Link></p>
                                                        <form method="post" name="enq">
                                                            <div className="row">
                                                                <div className="form-group col-md-6">
                                                                    <label>Name <span className="required">*</span></label>
                                                                    <input 
                                                                    value={name}
                                                                    onChange={(e) => {
                                                                        setName(e.target.value);
                                                                    }}
                                                                    required="" className="form-control" name="name" type="text" 
                                                                    />
                                                                </div>
                                                                <div className="form-group col-md-12">
                                                                    <label>Email Address <span className="required">*</span></label>
                                                                    <input 
                                                                     value={email}
                                                                     onChange={(e) => {
                                                                         setEmail(e.target.value);
                                                                     }}
                                                                    required="" className="form-control" name="email" type="email" 
                                                                    />
                                                                </div>
                                                                <div className="form-group col-md-12">
                                                                    <label>Current Password <span className="required">*</span></label>
                                                                    <input
                                                                     value={password}
                                                                     onChange={(e) => {
                                                                         setPassword(e.target.value);
                                                                     }}
                                                                     required="" className="form-control" name="password" type="password" 
                                                                     />
                                                                </div>
                                                                <div className="form-group col-md-12">
                                                                    <label>New Password <span className="required">*</span></label>
                                                                    <input 
                                                                     value={npassword}
                                                                     onChange={(e) => {
                                                                         setNPassword(e.target.value);
                                                                     }}
                                                                    required="" className="form-control" name="npassword" type="password" 
                                                                    />
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <button type="submit"
                                                                            onClick={saveAccountDetails}
                                                                     className="btn btn-fill-out submit font-weight-bold" name="submit" value="Submit">Save Change</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        ) : (
            <Preloader />
        )}
        </>
    );
}

export default Account;
