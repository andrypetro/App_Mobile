export const injectRegistrationScript = `
  (function() {
    try {
      const correos = [
        "m.a.r.ymendeliek@gmail.com",
        "f.l.o.rrumble@gmail.com",
        "a.n.i.eglastik@gmail.com"
      ];
      let indiceCorreo = localStorage.getItem("indiceCorreo") ? parseInt(localStorage.getItem("indiceCorreo")) : 0;

      function seleccionarApellidoAleatorio() {
        const apellidos = ["Agamez", "Gómez"];
        return apellidos[Math.floor(Math.random() * apellidos.length)];
      }

      function seleccionarNombreAleatorio() {
        const nombres = ["María", "Ana"];
        return nombres[Math.floor(Math.random() * nombres.length)];
      }

      function seleccionarFechaCumpleañosAleatoria() {
        const dia = Math.floor(Math.random() * 28) + 1;
        const mes = Math.floor(Math.random() * 12) + 1;
        const año = Math.floor(Math.random() * (2002 - 1980 + 1)) + 1980;
        return { dia, mes, año };
      }

      function fillForm() {
        const intervalId = setInterval(() => {
          const loginInput = document.querySelector("#ankama-registration-login");
          const passwordInput = document.querySelector("#ankama-registration-password");
          const lastnameInput = document.querySelector("#ankama-registration-lastname");
          const firstnameInput = document.querySelector("#ankama-registration-firstname");
          const birthdayDayInput = document.querySelector("#ankama-registration-birthday-day");
          const birthdayMonthInput = document.querySelector("#ankama-registration-birthday-month");
          const birthdayYearInput = document.querySelector("#ankama-registration-birthday-year");

          if (loginInput && passwordInput && lastnameInput && firstnameInput && birthdayDayInput && birthdayMonthInput && birthdayYearInput) {
            clearInterval(intervalId);

            loginInput.value = correos[indiceCorreo];
            passwordInput.value = "santiago22";
            lastnameInput.value = seleccionarApellidoAleatorio();
            firstnameInput.value = seleccionarNombreAleatorio();

            const fechaCumpleaños = seleccionarFechaCumpleañosAleatoria();
            birthdayDayInput.value = fechaCumpleaños.dia.toString().padStart(2, "0");
            birthdayMonthInput.value = fechaCumpleaños.mes.toString().padStart(2, "0");
            birthdayYearInput.value = fechaCumpleaños.año.toString();

            console.log('Formulario rellenado con éxito');
          } else {
            console.log('Esperando a que los campos de formulario estén disponibles...');
          }
        }, 500);
      }

      function clickElement() {
        setTimeout(() => {
          const elementToClick = document.querySelector("body > div.main-container > div.main-content.main-container-form-page > secure-form > form > button");
          if (elementToClick) {
            elementToClick.click();
            console.log('Botón clicado');
          } else {
            console.error("No se pudo encontrar el elemento para hacer clic.");
          }
        }, 1000);
      }

      fillForm();
      clickElement();

      indiceCorreo = (indiceCorreo + 1) % correos.length;
      localStorage.setItem("indiceCorreo", indiceCorreo.toString());
    } catch (error) {
      console.error("Error al ejecutar el script de inyección:", error);
    }
  })();
`;
