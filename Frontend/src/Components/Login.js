import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState('email'); // 'email' or 'otp'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState(''); // Store OTP from backend for validation

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0 && resendDisabled) {
            setResendDisabled(false);
        }
        return () => clearInterval(interval);
    }, [timer, resendDisabled]);

    const validateEmail = () => {
        if (!email) {
            setErrors({ email: 'Email is required' });
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrors({ email: 'Please enter a valid email address' });
            return false;
        }
        return true;
    };

    const validateOTP = () => {
        if (!otp) {
            setErrors({ otp: 'OTP is required' });
            return false;
        } else if (!/^\d{5}$/.test(otp)) {
            setErrors({ otp: 'Please enter a valid 5-digit OTP' });
            return false;
        }
        return true;
    };

    const handleGetOTP = async () => {
        if (!validateEmail()) return;
        setLoading(true);
        setErrors({});
        
        try {
            const response = await axios.post('http://localhost:4000/sendotp', {
                email: email
            });
            
            console.log('OTP Response:', response.data); // Debug log
            
            if (response.data.otp) {
                // Convert OTP to string and ensure it's 5 digits
                const otpString = response.data.otp.toString();
                setGeneratedOtp(otpString);
                setStep('otp');
                setTimer(60);
                setResendDisabled(true);
            } else {
                setErrors({ email: 'Failed to send OTP. Please try again.' });
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            setErrors({ 
                email: error.response?.data?.message || 'Failed to send OTP. Please try again.' 
            });
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (resendDisabled) return;
        setLoading(true);
        setErrors({});
        try {
            const response = await axios.post('http://localhost:4000/sendotp', {
                email: email
            });
            
            if (response.data.otp) {
                const otpString = response.data.otp.toString();
                setGeneratedOtp(otpString);
                setTimer(60);
                setResendDisabled(true);
                setOtp('');
            }
        } catch (error) {
            console.error('Error resending OTP:', error);
            setErrors({ 
                otp: 'Failed to resend OTP. Please try again.' 
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        if (!validateOTP()) return;
        setLoading(true);
        console.log('Entered OTP:', otp); // Debug log
        console.log('Generated OTP:', generatedOtp); // Debug log
        
        // Validate OTP with the one received from backend
        if (otp === generatedOtp) {
            // Store user info in localStorage
            localStorage.setItem('Email', email);
            localStorage.setItem('isLoggedIn', 'true');
            
            console.log('OTP valid, navigating to /home'); // Debug log
            
            // Navigate to home page
            navigate('/home');
        } else {
            setErrors({ otp: 'Invalid OTP. Please try again.' });
            setLoading(false);
        }
    };

    const handleBackToEmail = () => {
        setStep('email');
        setOtp('');
        setErrors({});
        setTimer(0);
        setResendDisabled(false);
        setGeneratedOtp('');
    };

    return (
        <div className="otp-login-container">
            <div className="otp-login-wrapper">
                <div className="otp-login-card">
                    <div className="otp-login-header">
                        <h1 className="otp-login-title">
                            {step === 'email' ? 'Welcome Back' : 'Verify Your Email'}
                        </h1>
                        <p className="otp-login-subtitle">
                            {step === 'email' 
                                ? 'Sign in to continue to your account' 
                                : `Enter the OTP sent to ${email}`}
                        </p>
                    </div>

                    {step === 'email' ? (
                        <div className="otp-login-form">
                            <div className="otp-form-group">
                                <label htmlFor="email" className="otp-label">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className={`otp-input ${errors.email ? 'otp-input-error' : ''}`}
                                    disabled={loading}
                                    autoFocus
                                />
                                {errors.email && (
                                    <span className="otp-error-text">{errors.email}</span>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={handleGetOTP}
                                className="otp-button otp-get-button"
                                disabled={loading}
                            >
                                {loading ? 'Sending OTP...' : 'Get OTP'}
                            </button>
                        </div>
                    ) : (
                        <div className="otp-login-form">
                            <div className="otp-form-group">
                                <label htmlFor="otp" className="otp-label">
                                    Enter OTP
                                </label>
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                    placeholder="Enter 5-digit OTP"
                                    maxLength="5"
                                    className={`otp-input ${errors.otp ? 'otp-input-error' : ''}`}
                                    disabled={loading}
                                    autoFocus
                                />
                                {errors.otp && (
                                    <span className="otp-error-text">{errors.otp}</span>
                                )}
                                
                                <div className="otp-timer-container">
                                    {timer > 0 ? (
                                        <span className="otp-timer-text">
                                            Resend OTP in {timer} seconds
                                        </span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleResendOTP}
                                            className="otp-resend-button"
                                            disabled={resendDisabled || loading}
                                        >
                                            Resend OTP
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="otp-actions">
                                <button
                                    type="button"
                                    onClick={handleBackToEmail}
                                    className="otp-back-button"
                                    disabled={loading}
                                >
                                    ← Back
                                </button>
                                
                                <button
                                    type="button"
                                    onClick={handleLogin}
                                    className="otp-button otp-login-button"
                                    disabled={loading}
                                >
                                    {loading ? 'Verifying...' : 'Login'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;