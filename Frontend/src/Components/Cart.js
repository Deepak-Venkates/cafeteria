import { useDispatch, useSelector } from "react-redux";
import { AddItem, RemoveItem } from "../Store/CartSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import '../Styles/Cart.css';

const Cart = () => {
    const CartItems = useSelector((state) => state.Cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const email = localStorage.getItem('Email');

    const AddToCart = (name, price, quantity, id) => {
        dispatch(AddItem({ id, name, price, quantity }));
    };

    const RemoveFromCart = (name, price, quantity, id) => {
        dispatch(RemoveItem({ id, name, price, quantity }));
    };

    const ProceedPayment = () => {
        navigate('/payment' , { state: total });
    };

    const total = CartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <Navbar back='/app/food' />
            <div className="cart-root">
                {email ? (
                    <div className="cart-container">
                        <div className="cart-content">
                            <div className="cart-header-row">
                                <p className="cart-header-title">Your Order</p>
                            </div>
                            {CartItems.length === 0 ? (
                                <div className="cart-empty">Your cart is empty.</div>
                            ) : (
                                CartItems.map((item) => (
                                    <div className="cart-item-row" key={item.id}>
                                        <div className="cart-item-info">
                                            <p className="cart-item-title">{item.name}</p>
                                            <p className="cart-item-price"><i className="bi bi-currency-rupee" /> {item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="cart-item-actions">
                                            <button
                                                className="cart-qty-btn"
                                                onClick={() => RemoveFromCart(item.name, item.price, 1, item.id)}
                                            >-</button>
                                            <input
                                                className="cart-qty-input"
                                                type="number"
                                                value={item.quantity}
                                                readOnly
                                            />
                                            <button
                                                className="cart-qty-btn"
                                                onClick={() => AddToCart(item.name, item.price, 1, item.id)}
                                            >+</button>
                                        </div>
                                    </div>
                                ))
                            )}
                            <h3 className="cart-summary-title">Payment Summary</h3>
                            <div className="cart-summary">
                                <div className="cart-summary-row">
                                    <p className="cart-summary-label">Total</p>
                                    <p className="cart-summary-value"><i className="bi bi-currency-rupee" /> {total.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="cart-checkout-row">
                                <button
                                    className="cart-checkout-btn"
                                    onClick={ProceedPayment}
                                    disabled={CartItems.length === 0}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <center>
                        <h3>Can't access without login</h3>
                    </center>
                )}
            </div>
        </>
    );
};

export default Cart;