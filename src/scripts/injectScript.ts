export const injectRegistrationScript = (emails: string[]) => `  
  (function() {
    try {
      const correos = ${JSON.stringify(emails)};  
      if (!correos || correos.length === 0) {
        console.warn("⚠️ No hay correos disponibles. Deteniendo script.");
        return;
      }

      // 🔥 Leer y validar índice en LocalStorage
      let indiceCorreo = parseInt(localStorage.getItem("indiceCorreo")) || 0;
      if (isNaN(indiceCorreo) || indiceCorreo >= correos.length) {
        indiceCorreo = 0; // Reinicia si está fuera de rango
      }

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

            // 🔥 Verifica cuál correo se está usando
            console.log('📩 Usando correo:', correos[indiceCorreo]);

            // ✅ Asignar valores al formulario
            loginInput.value = correos[indiceCorreo] || "";
            passwordInput.value = "santiago22";
            lastnameInput.value = seleccionarApellidoAleatorio();
            firstnameInput.value = seleccionarNombreAleatorio();

            const fechaCumpleaños = seleccionarFechaCumpleañosAleatoria();
            birthdayDayInput.value = fechaCumpleaños.dia.toString().padStart(2, "0");
            birthdayMonthInput.value = fechaCumpleaños.mes.toString().padStart(2, "0");
            birthdayYearInput.value = fechaCumpleaños.año.toString();

            console.log('📋 Formulario rellenado con:', correos[indiceCorreo]);
          } else {
            console.log('⌛ Esperando a que los campos de formulario estén disponibles...');
          }
        }, 500);
      }

      function clickElement() {
        setTimeout(() => {
          const elementToClick = document.querySelector("body > div.main-container > div.main-content.main-container-form-page > secure-form > form > button");
          if (elementToClick) {
            elementToClick.click();
            console.log('✅ Botón de registro clicado');
          } else {
            console.error("❌ No se pudo encontrar el botón de registro.");
          }
        }, 1000);
      }

      fillForm();
      clickElement();

      // 🔥 Asegurar que el índice avanza correctamente
      indiceCorreo = (indiceCorreo + 1) % correos.length;
      localStorage.setItem("indiceCorreo", indiceCorreo.toString());
      console.log('🔄 Nuevo índice guardado:', indiceCorreo);

    } catch (error) {
      console.error("❌ Error al ejecutar el script de inyección:", error);
    }
  })();
`;
