import { useEffect } from 'react';

const ComponenteCss = () => {
  useEffect(() => {
    const handleResize = () => {
      const cajaTraseraLogin = document.querySelector(".caja_trasera-login");
      const cajaTraseraRegister = document.querySelector(".caja_trasera-register");
      const formularioLogin = document.querySelector(".formulario_login");
      const formularioRegister = document.querySelector(".formulario_register");
      const contenedorLoginRegister = document.querySelector(".contenedor_login-register");

      if (cajaTraseraLogin && cajaTraseraRegister && formularioLogin && formularioRegister && contenedorLoginRegister) {
        if (window.innerWidth > 850) {
          cajaTraseraLogin.style.display = "block";
          cajaTraseraRegister.style.display = "block";
        } else {
          cajaTraseraRegister.style.display = "block";
          cajaTraseraRegister.style.opacity = "1";
          cajaTraseraLogin.style.display = "none";
          formularioLogin.style.display = "block";
          formularioRegister.style.display = "none";
          contenedorLoginRegister.style.left = "0px";
        }
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const iniciarSesion = () => {
    const cajaTraseraLogin = document.querySelector(".caja_trasera-login");
    const cajaTraseraRegister = document.querySelector(".caja_trasera-register");
    const formularioLogin = document.querySelector(".formulario_login");
    const formularioRegister = document.querySelector(".formulario_register");
    const contenedorLoginRegister = document.querySelector(".contenedor_login-register");

    if (cajaTraseraLogin && cajaTraseraRegister && formularioLogin && formularioRegister && contenedorLoginRegister) {
      if (window.innerWidth > 850) {
        formularioRegister.style.display = "none";
        contenedorLoginRegister.style.left = "10px";
        formularioLogin.style.display = "block";
        cajaTraseraRegister.style.opacity = "1";
        cajaTraseraLogin.style.opacity = "0";
      } else {
        formularioRegister.style.display = "none";
        contenedorLoginRegister.style.left = "8px";
        formularioLogin.style.display = "block";
        cajaTraseraRegister.style.display = "block";
        cajaTraseraLogin.style.display = "none";
      }
    }
  };

  const register = () => {
    const cajaTraseraLogin = document.querySelector(".caja_trasera-login");
    const cajaTraseraRegister = document.querySelector(".caja_trasera-register");
    const formularioLogin = document.querySelector(".formulario_login");
    const formularioRegister = document.querySelector(".formulario_register");
    const contenedorLoginRegister = document.querySelector(".contenedor_login-register");

    if (cajaTraseraLogin && cajaTraseraRegister && formularioLogin && formularioRegister && contenedorLoginRegister) {
      if (window.innerWidth > 850) {
        formularioRegister.style.display = "block";
        contenedorLoginRegister.style.left = "410px";
        formularioLogin.style.display = "none";
        cajaTraseraRegister.style.opacity = "0";
        cajaTraseraLogin.style.opacity = "1";
      } else {
        formularioRegister.style.display = "block";
        contenedorLoginRegister.style.left = "0px";
        formularioLogin.style.display = "none";
        cajaTraseraRegister.style.display = "none";
        cajaTraseraLogin.style.display = "block";
        cajaTraseraLogin.style.opacity = "1";
      }
    }
  };

  return { iniciarSesion, register };
};

export default ComponenteCss;
