import Link from "next/link";
import { useState } from "react";
import Layout from "../components/layout/Layout";
import { toast } from "react-toastify";
import Preloader from "./../components/elements/Preloader";
import { useRouter } from 'next/router'
import { server } from "../config/index";


function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const register = async () => {
    if(name===""){
        toast("Please enter your name.");
        return
    }
    if(email===""){
        toast("Please enter your email.");
        return
    }
    if(password===""){
        toast("Please enter your password.");
        return
    }
    setLoading(true);
    let bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("email", email);
    bodyFormData.append("password", password);
    bodyFormData.append("action", "user_register");
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
            router.push('/page-login')
        }
      });
  };
  return (
    <>
      {!loading ? (
        <Layout parent="Home" sub="Pages" subChild="Login & Register">
          <div className="page-content pt-150 pb-150">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
                  <div className="row">
                    <div className="col-lg-6 pr-30 d-none d-lg-block">
                      <img
                        className="border-radius-15"
                        src="assets/imgs/page/login-1.png"
                        alt=""
                      />
                    </div>
                    <div className="col-lg-6 col-md-8">
                      <div className="login_wrap widget-taber-content background-white">
                        <div className="padding_eight_all bg-white">
                          <div className="heading_s1">
                            <h1 className="mb-5">Register</h1>
                            <p className="mb-30">
                              Already have an account?{" "}
                              <Link href="/page-login">
                                <a>Login here</a>
                              </Link>
                            </p>
                          </div>
                          <form method="post">
                            <div className="form-group">
                              <input
                                type="text"
                                required=""
                                value={name}
                                onChange={(e) => {
                                  handleName(e);
                                }}
                                name="name"
                                placeholder="Full name *"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                required=""
                                value={email}
                                onChange={(e) => {
                                  handleEmail(e);
                                }}
                                name="email"
                                placeholder="Username or Email *"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                required=""
                                value={password}
                                onChange={(e) => {
                                  handlePassword(e);
                                }}
                                type="password"
                                name="password"
                                placeholder="Your password *"
                              />
                            </div>
                            {/* <div className="login_footer form-group">
                                                    <div className="chek-form">
                                                        <input type="text" required="" name="email" placeholder="Security code *" />
                                                    </div>
                                                    <span className="security-code">
                                                        <b className="text-new">8</b>
                                                        <b className="text-hot">6</b>
                                                        <b className="text-sale">7</b>
                                                        <b className="text-best">5</b>
                                                    </span>
                                                </div> */}
                            {/* <div className="login_footer form-group mb-50">
                                                    <div className="chek-form">
                                                        <div className="custome-checkbox">
                                                            <input className="form-check-input" type="checkbox" name="checkbox" id="exampleCheckbox1" value="" />
                                                            <label className="form-check-label" htmlFor="exampleCheckbox1"><span>Remember me</span></label>
                                                        </div>
                                                    </div>
                                                    <a className="text-muted" href="#">Forgot password?</a>
                                                </div> */}
                            <div className="form-group">
                              <button
                                type="button"
                                onClick={register}
                                className="btn btn-heading btn-block hover-up"
                                name="login"
                              >
                                Register
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
          </div>
        </Layout>
      ) : (
        <Preloader />
      )}
    </>
  );
}

export default Login;
