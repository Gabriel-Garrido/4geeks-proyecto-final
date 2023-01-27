import React, {useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Login } from "./pages/login"
import { RestorePassword } from "./pages/restorePassword"
import { ChangePassword } from "./pages/changePassword"
import { Process } from "./pages/process"
import { NewBankAccount } from "./pages/newBankAccount"
import { Record } from "./pages/record"
import { HomeAdmin } from "./pages/homeAdmin"
import { RateAdmin } from "./pages/rateAdmin"
import { ReportAdmin } from "./pages/reportAdmin"
import { VerificationAdmin } from "./pages/verificationAdmin"

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    const URL_API = process.env.BACKEND_URL
    const [rate, setRate] = useState("");
    const [changeId, setChangeId] = useState("")    
    const [user, setUser] = useState([])
    const [bankAccount, setBankAccount] = useState([])
  

//-------------fetch GET change -------------------------------------
    
    async function getChangeFetch() {
        let response = await fetch(`${URL_API}/api/get_all_changes`, {
            method: ["GET"],
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "Access-Control-Allow-Origin": "*",
            },
        })
        let data = await response.json()
        setRate(data[0].exchange_rate)
        setChangeId(data[0].id)
    }
    getChangeFetch()
    

//-------------/fetch GET change -------------------------------------


    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    
    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop> 
                    <Navbar user={user} />

                    <Routes>
                        <Route element={<Login setUser={setUser} URL_API={URL_API} user={user} />} path="/" />
                        <Route element={<RestorePassword URL_API={URL_API} user={user} />} path="/restorepassword" />
                        <Route element={<ChangePassword URL_API={URL_API} admin={user.admin} user={user} />} path="/changepassword" />
                        {!user.admin ? <Route element={<Home rate={rate} bankAccount={bankAccount} setBankAccount={setBankAccount} changeId={changeId} user={user} URL_API={URL_API} />} path="/home" /> : <></>}
                        {!user.admin ? <Route element={<Process URL_API={URL_API} bankAccount={bankAccount} setBankAccount={setBankAccount} user={user}/>} path="/process" /> : <></>}
                        {!user.admin ? <Route element={<NewBankAccount URL_API={URL_API} bankAccount={bankAccount} setBankAccount={setBankAccount} user={user}/>} path="/newbankaccount" /> : <></>}
                        {!user.admin ? <Route element={<Record URL_API={URL_API} user={user}/>} path="/record" /> : <></>}
                        {user.admin ? <Route element={<HomeAdmin URL_API={URL_API} user={user}/>} path="/homeadmin" /> : <></>}
                        {user.admin ? <Route element={<RateAdmin URL_API={URL_API} user={user}/>} path="/rateadmin" /> : <></>}
                        {user.admin ? <Route element={<ReportAdmin URL_API={URL_API} user={user}/>} path="/reportadmin" /> : <></>}
                        {user.admin ? <Route element={<VerificationAdmin URL_API={URL_API} user={user}/>} path="/verificationadmin" /> : <></>}


                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
