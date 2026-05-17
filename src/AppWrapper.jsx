import { createContext, useState } from "react";
import App from "./App.jsx";

export const p = createContext({
    isAuthenticated : false
});

function AppWrapper(){

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [admin, setAdmin] = useState({});

    return<>
    <p.Provider value={{ isAuthenticated, setIsAuthenticated, admin, setAdmin }}>
        <App />
    </p.Provider>
    </>
}
export default AppWrapper;