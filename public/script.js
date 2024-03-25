const titulo = document.getElementById("titulo");

var typewriter = new Typewriter(titulo, {
  loop: false,
  delay: 75,
});

typewriter.typeString("Usuarios Registrados en la Clínica 🏥").start();
