import { Outlet } from "react-router-dom"
import { Footer, Navbar } from "components";
import 'App.css';


export const Layout = ({ handleSearch, showLogin, setShowLogin }) => {


    return (

        <div className="App" style={{ display: 'flex', flexDirection: 'column', height: "100%" }}>
            <header className="App-header">
                <Navbar handleSearch={handleSearch} showLogin={showLogin} setShowLogin={setShowLogin} />
            </header>
            <div style={{ flexGrow: 1 }}>
                <Outlet />
            </div>
            <Footer />
        </div>

    )
}