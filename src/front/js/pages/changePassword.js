import React, { useContext , useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { NoLogged } from "./noLogged"


export const ChangePassword = (props) => {

  useEffect(() => {
    actions.get_user(user_id)
},[])

  let { user_id } = useParams();
  console.log({user_id});
	const { store, actions } = useContext(Context);
  const navigate = useNavigate()
  
  
  //---------------------Validation-------------------------------------------
  const [activateButton, setActivateButton] = useState(false)
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  const [password1, setPassword1] = useState("");
  const [passwordError1, setPasswordError1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError2, setPasswordError2] = useState("");

  const handlePasswordChange1 = (e) => {
    if (!passwordRegex.test(e.target.value)) {
      setPasswordError1("La contraseña debe tener al menos 8 caracteres y un número.")
    }else {
      setPasswordError1("")
      setPassword1(e.target.value);
      checkPassword(e.target.value, password2)
    }
  };

  const handlePasswordChange2 = (e) => {
    if (!passwordRegex.test(e.target.value)) {
      setPasswordError2("La contraseña debe tener al menos 8 caracteres y un número.")
    }else {
      setPasswordError2("");
      setPassword2(e.target.value);
      checkPassword(password1, e.target.value)
    }
  };

  function checkPassword (a,b) {
      if (a==b) {
        setActivateButton(true)
      }else {
        setPasswordError2("los password no coinciden")
        setActivateButton(false)
    }
  }
//---------------------/Validation-------------------------------------

//---------------------Fetch------------------------------------------
async function changePasswordFetch() {

  let data = {
    "password": password2
  } 
  try {
    await fetch (`${props.URL_API}/api/edit_password/${store.user.id}`, {
      method: ["PUT"],
			headers: {
			 "Content-type": "application/json; charset=utf-8",
       "Authorization": `Bearer ${localStorage.getItem('jwt-token')}`
			},
			body: JSON.stringify(data)
      

    })
  }catch (error) {
  console.error(error)
}
}
//---------------------/Fetch-----------------------------------------

function redirect() {
  navigate("/")
}

	return (

    <div className="container col-10 offset-1 col-xl-6 offset-xl-3">
      <div className="card text-center">

        <div className="card-header fs-1">
          Cambio de Contraseña
        </div>
        {store.user != null ? 
        
        <div className="card-body">
        <div className="container">
          <div className="form-floating mb-2 col-12 col-md-6 offset-md-3">
            <input type="password" className="form-control" id="floatingPassword1" placeholder="Password" onChange={handlePasswordChange1}></input>
            <label htmlFor="floatingPassword1">Nueva Contraseña</label>
            {passwordError1 && <p className="text-danger">{passwordError1}</p>}

          </div>
          
          <div className="form-floating mb-2 col-12 col-md-6 offset-md-3">
            <input type="password" className="form-control" id="floatingPassword2" placeholder="Password" onChange={handlePasswordChange2}></input>
            <label htmlFor="floatingPassword2">Repetir Contraseña</label>
            {passwordError2 && <p className="text-danger">{passwordError2}</p>}
          </div>
          
          {store.user != null && store.user.admin &&activateButton?<button to="/" href="#" className="btn btn-dark fs-4 col-md-5" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={changePasswordFetch}>Cambiar contraseña</button>:<></>}
          {store.user != null && !store.user.admin &&activateButton?<button to="/" href="#" className="btn btn-dark fs-4 col-md-5" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={changePasswordFetch}>Cambiar contraseña</button>:<></>}
          {!activateButton?<button className="btn btn-dark fs-4 col-md-5 disabled" onClick={changePasswordFetch}>Cambiar contraseña</button>:<></>}
          
            <div className="modal" tabIndex="-1" id="exampleModal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                      <p>Su contraseña ha sido cambiada</p>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-dark" onClick={redirect} data-bs-dismiss="modal">Aceptar</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        : 
          <div className=" container text-center col-10 offset-1 col-xl-6 offset-xl-3">
            <div className="card text-center">
                <div className="card-header fs-5">Error 404
                <div className="fs-1"><i className="fas fa-exclamation-triangle"></i></div>
                </div>
                <div className="card-body text-center">
                    <div>
                        <p className="col-12">Ruta no encontrada</p>
                    </div>
                </div>
                <div className="card-footer text-muted"></div>
            </div>
          </div>
        }
        
    </div>
    </div>

      );
};
