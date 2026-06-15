import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddItem, RemoveItem } from "../Store/CartSlice";
import '../Styles/Foods.css';
import Navbar from "./Navbar";

const Foods = () => {
    const [foods, setFoods] = useState([]);
    const dispatch = useDispatch();
    const datas = useSelector((state) => state.Cart.items);
    const url = 'http://localhost:4000';
    let id;

    useEffect(() => {
        id = localStorage.getItem('id');
        GetFoods();
        // eslint-disable-next-line
    }, []);

    const GetFoods = async () => {
        try {
            const response = await axios.get(url + '/food/get' + `/${id}`);
            setFoods(response.data);
        } catch (e) {
            console.log(`Error : ${e}`);
        }
    };

    const AddToCart = (name, price, quantity, id) => {
        dispatch(AddItem({ id, name, price, quantity }));
    };

    const RemoveFromCart = (name, price, quantity, id) => {
        dispatch(RemoveItem({ id, name, price, quantity }));
    };

    return (
        <div className="foods-root">
            <Navbar />
            <div className="foods-container">
                <div className="foods-row">
                    <div className="layout-content-container">
                        <div className="foods-header-row">
                            <h3 className="foods-header-title">Menu</h3>
                        </div>
                        {foods.map((item) => (
                            <div key={item._id} className="food-card-horizontal">
                                <div
                                    className="food-card-image-horizontal"
                                    style={{
                                        backgroundImage: `url("${item.image || 'https://placehold.co/100x100'}")`,
                                    }}
                                ></div>
                                <div className="food-card-info-horizontal">
                                    <p className="food-title">{item.name}</p>
                                    <p className="food-price"><i className="bi bi-currency-rupee" />{item.price}</p>
                                    <p className="food-desc">{item.description}</p>
                                </div>
                                <div className="food-card-action-horizontal">
                                    {!datas.some(o => o.id === item._id) ? (
                                        <button
                                            className="food-btn-horizontal"
                                            onClick={() => AddToCart(item.name, item.price, 1, item._id)}
                                        >
                                            Add
                                        </button>
                                    ) : (
                                        datas.filter(values => values.id === item._id).map(values => (
                                            <div className="food-input-group-horizontal" key={item._id}>
                                                <button
                                                    className="food-btn-horizontal"
                                                    type="button"
                                                    onClick={() => RemoveFromCart(item.name, item.price, 1, item._id)}
                                                >-</button>
                                                <input
                                                    type="text"
                                                    className="food-input-horizontal"
                                                    value={values.quantity}
                                                    readOnly
                                                />
                                                <button
                                                    onClick={() => AddToCart(item.name, item.price, 1, item._id)}
                                                    className="food-btn-horizontal"
                                                    type="button"
                                                >+</button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Foods;