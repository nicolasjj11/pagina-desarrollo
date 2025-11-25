document.addEventListener("DOMContentLoaded", () => {
  // ----- MODAL CREAR CUENTA -----
  const modal = document.getElementById("modal-registro");
  const btnSignup = document.querySelector(".signup-btn");
  const btnCerrar = document.querySelector(".cerrar");

  // Mostrar el modal
  btnSignup.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Cerrar al hacer clic en la X
  btnCerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cerrar al hacer clic fuera del modal
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // ----- CAMBIO DE IDIOMA -----
  const lang = document.querySelector(".languaje");
  const dropdown = lang.querySelector("ul");
  const selected = lang.querySelector(".languaje-selected");

  const translations = {
    es: {
      menuHome: "Inicio",
      menuCourses: "Cursos",
      menuHistory: "Historia de la Música",
      menuTheory: "Teoría Musical",
      btnLogin: "Iniciar Sesión",
      btnSignup: "Crear Cuenta",
      title: "Bienvenido a MSC STUDY",
      description: "Explora clases interactivas y aprende música con pasión.",
      btnStart: "Comenzar Ahora"
    },
    en: {
      menuHome: "Home",
      menuCourses: "Courses",
      menuHistory: "Music History",
      menuTheory: "Music Theory",
      btnLogin: "Login",
      btnSignup: "Sign Up",
      title: "Welcome to MSC STUDY",
      description: "Explore interactive lessons and learn music with passion.",
      btnStart: "Start Now"
    },
    pt: {
      menuHome: "Início",
      menuCourses: "Cursos",
      menuHistory: "História da Música",
      menuTheory: "Teoria Musical",
      btnLogin: "Entrar",
      btnSignup: "Criar Conta",
      title: "Bem-vindo ao MSC STUDY",
      description: "Explore aulas interativas e aprenda música com paixão.",
      btnStart: "Começar Agora"
    }
  };

  selected.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");
  });

  document.addEventListener("click", () => {
    dropdown.classList.remove("show");
  });

  lang.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const flagUrl = item.getAttribute("data-flag");
      const selectedLang = item.getAttribute("data-lang");

      selected.innerHTML = `<span class="flag" style="background-image: url('${flagUrl}');"></span>`;
      dropdown.classList.remove("show");

      document.querySelectorAll("[data-translate]").forEach((el) => {
        const key = el.getAttribute("data-translate");
        el.textContent = translations[selectedLang][key];
      });
    });
  });
});
// Funcionalidad del modal de login
document.addEventListener("DOMContentLoaded", function() {
  // Elementos del DOM
  const loginModal = document.getElementById("loginModal");
  const loginBtn = document.querySelector(".login-btn");
  const closeLogin = document.querySelector(".close-login");
  const loginForm = document.getElementById("loginForm");
  const formMessage = document.getElementById("formMessage");
  const registerLink = document.querySelector('.register-link');
  const forgotPassword = document.querySelector('.forgot-password');

  // Abrir modal
  loginBtn.addEventListener("click", function(e) {
    e.preventDefault();
    openLoginModal();
  });

  // Cerrar modal
  closeLogin.addEventListener("click", closeLoginModal);

  // Cerrar al hacer clic fuera del modal
  loginModal.addEventListener("click", function(e) {
    if (e.target === loginModal) {
      closeLoginModal();
    }
  });

  // Cerrar con ESC
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && loginModal.style.display === "flex") {
      closeLoginModal();
    }
  });

  // Envío del formulario
  loginForm.addEventListener("submit", handleLoginSubmit);

  // Enlace de registro
  registerLink?.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Funcionalidad de registro próximamente...');
    // Aquí puedes redirigir a la página de registro o abrir otro modal
  });

  // Olvidé mi contraseña
  forgotPassword?.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Funcionalidad de recuperación de contraseña próximamente...');
  });

  // Funciones
  function openLoginModal() {
    loginModal.style.display = "flex";
    document.body.style.overflow = "hidden";
    resetForm();
  }

  function closeLoginModal() {
    loginModal.style.display = "none";
    document.body.style.overflow = "auto";
    resetForm();
  }

  function resetForm() {
    loginForm.reset();
    formMessage.style.display = 'none';
    formMessage.className = 'form-message';
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember');
    
    // Validaciones básicas
    if (!validateEmail(email)) {
      showMessage('Por favor, ingresa un email válido', 'error');
      return;
    }

    if (password.length < 6) {
      showMessage('La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }

    // Simular envío al servidor
    await simulateLogin(email, password, remember);
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Auto-ocultar mensajes de éxito después de 3 segundos
    if (type === 'success') {
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 3000);
    }
  }

  // Reemplaza la función simulateLogin con esta para usar una API real:
async function realLogin(email, password) {
  try {
    const response = await fetch('https://tu-api.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      return data; // { success: true, user: {...}, token: '...' }
    } else {
      throw new Error(data.message || 'Error en el login');
    }
  } catch (error) {
    throw new Error('Error de conexión: ' + error.message);
  }
}

  // Verificar si hay sesión guardada
  function checkSavedLogin() {
    const savedToken = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
    const savedEmail = localStorage.getItem('userEmail');
    
    if (savedToken && savedEmail) {
      // Auto-login o mostrar información del usuario
      console.log('Usuario ya ha iniciado sesión:', savedEmail);
      // Puedes redirigir automáticamente o mostrar un estado diferente
    }
  }

  // Verificar al cargar la página
  checkSavedLogin();
});

// Función global para abrir el modal desde otros lugares
function openLogin() {
  const loginModal = document.getElementById("loginModal");
  if (loginModal) {
    loginModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

// Función global para cerrar el modal
function closeLogin() {
  const loginModal = document.getElementById("loginModal");
  if (loginModal) {
    loginModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}
