    import { Link } from 'react-router-dom';
    import axios from 'axios';
    import { useEffect, useState } from 'react';
    import '../Styles/Home.css';
    import Navbar from './Navbar';

    const Home = () => {
        const url = 'http://localhost:4000';
        const [shops, setShops] = useState([]);

        useEffect(() => {
            GetShops();
        }, []);

        const GetShops = async () => {
            try {
                const response = await axios.get(url + '/shop/get');
                setShops(response.data);
                console.log(shops)
            } catch (e) {
                console.log(`An error occured : ${e}`);
            }
        };
        console.log(shops);
        
        return (
            <div className="home-root">
                <div className="layout-container">
                    <Navbar/>
                    <div className="cafeteria-content">
                        <div className="cafeteria-title-row">
                            <p className="cafeteria-title">Cafeterias</p>
                        </div>
                        <div className="cafeteria-grid">
                            {shops.map((item) => (
                                <div className="cafeteria-card" key={item._id}>
                                    <Link to="/food" onClick={() => localStorage.setItem('id', item._id)}>
                                        <div
                                            className="cafeteria-image"
                                            style={{
                                                backgroundImage: `url("${item.image || 'https://placehold.co/300x300'}")`,
                                            }}
                                        ></div>
                                        <div>
                                            <p className="cafeteria-name">{item.name}</p>
                                            <p className="cafeteria-desc">{item.description || ''}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default Home;