  import React, { useState, useEffect, useRef, useContext } from "react";
  import axios from "axios";
  import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
  import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from "../Context/Context";

  const Signup = () => {

    const SignupWithGoogle = () => {
      window.open("http://localhost:5000/auth/google/callback", "_self")
      }


    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const [message, setMessage] = useState("");
    const modalRef = useRef(null);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    
    const handleSignUpClick = () => {
      const modal = document.getElementById('my_modal_5');
      if (modal) {
        modal.close(); // Close the modal
      }
      navigate('/login'); // Navigate to the login page
    };
    
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (formData.password !== formData.confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }
    
      try {
        const response = await axios.post("http://localhost:5000/auth/users/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
    
        console.log('Response:', response);
    
        if (response.data.success) {
          setMessage("Signup successful! Please log in.");
         
          document.getElementById('my_modal_5').close();
          navigate(from, { replace: true });
        } else {
          setMessage(response.data.message);
        }
      } catch (error) {
        console.log('Error:', error);
    
        if (error.response) {
          console.log('Error Response:', error.response);
          if (error.response.status === 409) {
            setMessage("User already exists, please log in.");
          } else {
            setMessage(error.response.data.message || "An error occurred. Please try again.");
          }
        } else if (error.request) {
          console.log('Error Request:', error.request);
          setMessage("No response received. Please check your network connection.");
        } else {
          console.log('General Error:', error.message);
          setMessage("An error occurred while setting up the request.");
        }
      }
    };
    
    
    

    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        document.getElementById('my_modal_5').close();
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick);

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, []);

    return (
      <dialog id='my_modal_5' className="modal modal-bottom sm:modal-middle">
        <div ref={modalRef} className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
          <button
            className="absolute text-gray-500 top-3 right-3 hover:text-gray-700 focus:outline-none"
            onClick={() => document.getElementById('my_modal_5').close()}
          >
            &#10005;
          </button>
          <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 mt-2 text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 mt-2 text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 mt-2 text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 mt-2 text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Confirm your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">Or sign up with</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button className="p-3 text-white bg-red-500 rounded-full hover:bg-red-600" onClick={SignupWithGoogle}>
                <FaGoogle />
              </button>
              <button className="p-3 text-white bg-blue-700 rounded-full hover:bg-blue-800">
                <FaFacebook />
              </button>
              <button className="p-3 text-white bg-gray-800 rounded-full hover:bg-gray-900">
                <FaGithub />
              </button>
            </div>
            <p className="mt-4 text-gray-600">
              Already have an account?{" "}
              <NavLink to={'/login'} className="text-blue-500 hover:underline" onClick={handleSignUpClick}>
                Log in
              </NavLink>
            </p>
          </div>

          {message && (
            <p className="mt-6 text-center text-red-500">{message}</p>
          )}
        </div>
      </dialog>
    );
  };

  export default Signup;
