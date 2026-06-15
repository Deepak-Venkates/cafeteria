import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearCart } from "../Store/CartSlice";
import Navbar from "./Navbar";
import '../Styles/Payment.css';

const Payment = () => {
    const Products = useSelector((state) => state.Cart.items);
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [serverOtp, setServerOtp] = useState('');
    const [loading, setLoading] = useState(false);

    // Send OTP to email
    const sendOtp = async (e) => {
        e.preventDefault();
        if (!userEmail || !cardNumber || !expDate || !cvv || !name) {
            toast.error("Please fill all details.");
            return;
        }
        setLoading(true);
        const toastId = toast.loading("Sending OTP...");
        try {
            const res = await axios.post('http://localhost:4000/sendotp', { email: userEmail });
            setOtpSent(true);
            setServerOtp(res.data.otp);
            toast.update(toastId, { render: "OTP sent to your email.", type: "success", isLoading: false, autoClose: 2000 });
        } catch (err) {
            toast.update(toastId, { render: "Failed to send OTP.", type: "error", isLoading: false, autoClose: 2000 });
        }
        setLoading(false);
    };

    // Verify OTP (compare with serverOtp)
    const verifyOtp = async (e) => {
        e.preventDefault();
        if (otp.toString() === serverOtp.toString()) {
            setOtpVerified(true);
            toast.success("OTP verified. You can now pay.");
        } else {
            toast.error("Invalid OTP.");
        }
    };

    // Payment submission
    const handlePayment = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Processing payment...");
        try {
            const response = await axios.post('http://localhost:4000/order', {
                Products,
                name,
                email: userEmail
            });
            if (response.data.message === 'Order Sent sucessfully') {
                dispatch(clearCart());
                toast.success("Order sent to your email successfully!");
                setTimeout(() => {
                    navigate('/');
                }, 1800); // Wait for toast to show before navigating
            } else {
                toast.info('Some error occurred, retry');
            }
        } catch (e) {
            toast.error('Error: ' + e.message);
        }
    };

    return (
        <>
            <Navbar cart back='/app/food' />
            <div className="payment-root">
                <ToastContainer position="top-center" />
                <div className="payment-container">
                    <h2 className="payment-title">Payment</h2>
                    <form
                        className="payment-form"
                        onSubmit={
                            otpVerified
                                ? handlePayment
                                : otpSent
                                    ? verifyOtp
                                    : sendOtp
                        }
                    >
                        {!otpSent && (
                            <>
                                <div className="payment-row">
                                    <label className="payment-label">
                                        <span>Card number</span>
                                        <input
                                            type="text"
                                            placeholder="Enter card number"
                                            className="payment-input"
                                            value={cardNumber}
                                            onChange={e => setCardNumber(e.target.value)}
                                            required
                                            disabled={loading}
                                        />
                                    </label>
                                </div>
                                <div className="payment-row">
                                    <label className="payment-label">
                                        <span>Expiration date</span>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="payment-input"
                                            value={expDate}
                                            onChange={e => setExpDate(e.target.value)}
                                            required
                                            disabled={loading}
                                        />
                                    </label>
                                    <label className="payment-label">
                                        <span>CVV</span>
                                        <input
                                            type="password"
                                            placeholder="Enter CVV"
                                            className="payment-input"
                                            value={cvv}
                                            onChange={e => setCvv(e.target.value)}
                                            required
                                            disabled={loading}
                                        />
                                    </label>
                                </div>
                                <div className="payment-row">
                                    <label className="payment-label">
                                        <span>Name on card</span>
                                        <input
                                            type="text"
                                            placeholder="Enter name"
                                            className="payment-input"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            required
                                            disabled={loading}
                                        />
                                    </label>
                                </div>
                                <h3 className="payment-summary-title">Order confirmation</h3>
                                <div className="payment-row">
                                    <label className="payment-label">
                                        <span>Email</span>
                                        <input
                                            type="email"
                                            className="payment-input"
                                            value={userEmail}
                                            onChange={e => setUserEmail(e.target.value)}
                                            required
                                            disabled={loading}
                                        />
                                    </label>
                                </div>
                            </>
                        )}
                        {otpSent && !otpVerified && (
                            <div className="payment-row">
                                <label className="payment-label">
                                    <span>Enter OTP</span>
                                    <input
                                        type="text"
                                        className="payment-input"
                                        value={otp}
                                        onChange={e => setOtp(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </label>
                            </div>
                        )}
                        <div className="payment-btn-row">
                            <button className="payment-btn" type="submit" disabled={loading}>
                                {otpVerified
                                    ? <>Place Order <span>₹ {location.state}</span></>
                                    : otpSent
                                        ? "Verify OTP"
                                        : `Pay ₹ ${location.state}`}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Payment;