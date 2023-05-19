import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import ProtectedRoute from "./components/routes/ProtectedRoute";

import { CartContextProvider } from "./contexts/CartContext";
import {
    Account, AdminDashboard, CarouselDashboard, CreateCarousel, EditCarousel, CarrierDashboard, CreateCarrier, EditCarrier, CategoryDashboard, CreateCategory, EditCategory, CreateFeature, EditFeature, FeatureDashboard, EditOrder, OrderDashboard, CreateProduct, EditProduct, ProductDashboard, EditUser, UserDashboard, Cart, Delivery, Home, MyOrder, OrderSuccess, Product, ProductItem
} from "pages"
import { authApi, productApi } from "services"
import AdminLayout from "components/layout/AdminLayout";

function App() {
    const [products, setProducts] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([...products]);
    const [showLogin, setShowLogin] = useState(false);

    authApi.setAxiosToken(window.localStorage.getItem("authToken"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await productApi.findAll();
                setProducts(products);
            }
            catch (e) {
                console.error(e);
            }
        }
        fetchData()
    }, []);


    function handleSearch(search) {
        if (search !== '') {
            const filteredProducts = products.filter(product => {
                return product.name.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase());
            });
            setFilteredProduct(filteredProducts);
        }
    }

    const NoMatch = () => {
        return (<>404</>)
    }

    return (
        <CartContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route errorElement={<NoMatch />} element={<Layout handleSearch={handleSearch} showLogin={showLogin} setShowLogin={setShowLogin} />} path="/"  >
                        <Route index element={<Home />} />
                            <Route path=':slug' element={<Product filteredProduct={filteredProduct} />} />
                            <Route path='produits/:id' element={<ProductItem />} />
                            <Route path='panier' element={<Cart showLogin={showLogin} setShowLogin={setShowLogin} />} />
                            <Route path='livraison' element={<Delivery />} />
                            <Route path='commande/merci/:id' element={<OrderSuccess />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path='mon-compte' element={<Account />} />
                            <Route path='mes-commandes' element={<MyOrder />} />
                        </Route>
                    </Route>

                    <Route errorElement={<NoMatch />} element={<ProtectedRoute allowedRole={"admin"} />} path="/admin"  >
                        <Route path="" element={<AdminLayout />}>
                            <Route index element={<AdminDashboard/>}/>
                            <Route path='produits' element={<ProductDashboard />} />
                            <Route path='produits/ajout' element={<CreateProduct />} />
                            <Route path='produits/modification/:id' element={<EditProduct />} />
                            <Route path='categories' element={<CategoryDashboard />} />
                            <Route path='categories/ajout' element={<CreateCategory />} />
                            <Route path='categories/modification/:id' element={<EditCategory />} />
                            <Route path='utilisateurs' element={<UserDashboard />} />
                            <Route path='utilisateurs/modification/:id' element={<EditUser />} />
                            <Route path='commandes' element={<OrderDashboard />} />
                            <Route path='commandes/modification/:id' element={<EditOrder />} />
                            <Route path='transporteurs' element={<CarrierDashboard />} />
                            <Route path='transporteurs/ajout' element={<CreateCarrier />} />
                            <Route path='transporteurs/modification/:id' element={<EditCarrier />} />
                            <Route path='carousel' element={<CarouselDashboard />} />
                            <Route path='carousel/ajout' element={<CreateCarousel />} />
                            <Route path='carousel/modification/:id' element={<EditCarousel />} />
                            <Route path='features' element={<FeatureDashboard />} />
                            <Route path='features/ajout' element={<CreateFeature />} />
                            <Route path='features/modification/:id' element={<EditFeature />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </BrowserRouter>
        </CartContextProvider >
    );
}

export default App;
