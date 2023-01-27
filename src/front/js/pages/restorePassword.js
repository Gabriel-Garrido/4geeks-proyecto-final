import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { sendEmail } from "../service/emailService.js";

export const RestorePassword = () => {
	const { store, actions } = useContext(Context);

//----------------------------Validations--------------------------------	
	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

	const [email, setEmail] = useState("");
  	const [emailError, setEmailError] = useState("");
	const [user, setUser] = useState({
		email: "mail@mail.com",
		name: "Jhon Doe",
	  });

	  const verify = (_) => {
		if (email.localeCompare(user.email) != 0) throw Error("Invalid Email");
		let params = {
		  to_email: user.email,
		  to_name: user.name,
		  to_link: link,
		};
		sendEmail(params);
	  };

	const [link, setLink] = useState("www.google.com");
	  const handleEmailChange = (e) => {
		if (!emailRegex.test(e.target.value)) {
		  setEmailError("Ingrese un correo electrónico válido.");
		} else {
		  setEmailError("");
		}
		setEmail(e.target.value);
	  };
//----------------------------/Validations--------------------------------	


	return (
		<div className="container">
	<div className="card text-center">

  <div className="card-header fs-1">
    Recuperar Contraseña
  </div>

  	<div className="card-body">
		<div className="container">
             <div className="form-floating mb-2 col-12 col-md-6 offset-md-3">
             <input type="email" className="form-control" id="floatingPassword" placeholder="Correo" onChange={(e) => setEmail(e.target.value)}></input>
             <label htmlFor="floatingPassword">Correo</label>
              </div>
			  {emailError && <p className="text-danger">{emailError}</p>}
    		<button onClick={verify} className="btn btn-dark col-5">Enviar</button>
			</div>
  	</div>
</div>
</div>
	);
};
