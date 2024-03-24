const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
require("moment/locale/es");
const _ = require("lodash");
const chalk = require("chalk");

const registrarUsuarios = async (req, res, next) => {
  try {
    const response = await axios.get("https://randomuser.me/api/?results=10");

    const data = response.data;
    const dataFormateada = formatearUsuario(data.results);
    const partitionMaleFemale = _.partition(dataFormateada, function (user) {
      return user.sexo == "male";
    });
    res.locals.datamale = partitionMaleFemale[0];
    res.locals.datafemale = partitionMaleFemale[1];
    mostrarEnConsolaConEstilos(partitionMaleFemale[0], "Hombres");
    mostrarEnConsolaConEstilos(partitionMaleFemale[1], "Mujeres");
    res.render("inicio");
  } catch (error) {
    next(error);
  }
};

function formatearUsuario(data) {
  const dataFormateada = data.map((item) => {
    return {
      name: item.name.first,
      lastname: item.name.last,
      id: uuidv4().slice(0, 6),
      date: crearRandomDate(),
      sexo: item.gender,
    };
  });
  return dataFormateada;
}
function crearRandomDate() {
  const añoMinimo = 1990;
  const añoMaximo = 2024;

  const year =
    Math.floor(Math.random() * (añoMaximo - añoMinimo + 1)) + añoMinimo;

  const month = Math.floor(Math.random() * 12);

  const day = Math.floor(Math.random() * 28) + 1;

  const fecha = moment({ year, month: month - 1, day }).format("LL");

  return fecha == "Fecha inválida" ? "24 de marzo de 2024" : fecha;
}

function mostrarEnConsolaConEstilos(data, sexo) {
  const maximos = maximoLargoPropiedaddeArraydeObjetos(data);
  console.log(
    "-".repeat(Object.values(maximos).reduce((a, b) => a + b, 0)) + "---"
  );
  console.log(`La data para ${sexo} es:`);
  console.log(`La cantidad de usuarios es: ${data.length}`);
  console.log(
    "nombre".padStart(maximos.name, " "),
    "apellido".padStart(maximos.lastname, " "),
    "id".padStart(maximos.id, " "),
    "fecha".padStart(maximos.date, " ")
  );
  const estilos = chalk.blue.bgWhite;

  data.forEach((obj) => {
    const { name, lastname, id, date } = obj;
    const arrayEstilos = Object.values({ name, lastname, id, date }).map(
      (value, index) => {
        switch (index) {
          case 0:
            return estilos(value.padStart(maximos.name, " "));
          case 1:
            return estilos(value.padStart(maximos.lastname, " "));
          case 2:
            return estilos(value.padStart(maximos.id, " "));
          case 3:
            return estilos(value.padStart(maximos.date, " "));
        }
      }
    );
    console.log(...arrayEstilos);
  });
}

function maximoLargoPropiedaddeArraydeObjetos(array) {
  const maximos = { name: null, lastname: null, id: null, date: null };
  const propiedades = {
    name: "name",
    lastname: "lastname",
    id: "id",
    date: "date",
  };

  Object.keys(maximos).forEach((key) => {
    const arrayValuesForKey = array.map((obj) => obj[key]);
    arrayValuesForKey.push(propiedades[key]);
    maximos[key] = _.maxBy(arrayValuesForKey, (str) => str.length).length;
  });
  return maximos;
}

module.exports = {
  registrarUsuarios,
};
