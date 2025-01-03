import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../assets/login/fonts/icomoon/style.css";
import "../../../assets/login/css/owl.carousel.min.css";
import "../../../assets/login/css/bootstrap.min.css";
import "../../../assets/login/css/style.css";
import { AuthContext } from "../../../context/AuthContext";


function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); 
    try {
      const success = await login(email, password);
      if (success) {
        setIsLoading(false);
        navigate("/admin/dashboard");
      } else {
        setError("Login failed. Please check your username and password.");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Login failed. Please try again later.");
      setIsLoading(false);
    }
  };
  

  return (
    <div className="content">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              src={
                process.env.PUBLIC_URL +
                "/assets/login/images/undraw_remotely_2j6y.svg"
              }
              alt="Image"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 contents">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="mb-4 ">
                  <h3>Sign In</h3>
                  <p className="mb-4">
                  Masukkan kredensial Anda untuk login.
                  </p>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="form-group first">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group last mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-block btn-primary"
                    disabled={isLoading} // Disable the button when loading
                  >
                    {isLoading ? "Loading..." : "Log In"} {/* Change text when loading */}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
