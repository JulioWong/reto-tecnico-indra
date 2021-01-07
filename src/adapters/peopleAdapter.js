const { people } = require('../models')

module.exports = (source) => {
    const target = new people()
    target.anioNacimiento = source.birth_year;
    target.colorOjo = source.eye_color;
    target.peliculas = source.films;
    target.genero = source.gender;
    target.colorCabello = source.hair_color;
    target.altura = source.height;
    target.mundoNatal = source.homeworld;
    target.masa = source.mass;
    target.nombre = source.name;
    target.colorPiel = source.skin_color;
    target.fechaCreacion = source.created;
    target.fechaEdicion = source.edited;
    target.especies = source.species;
    target.navesEstelares = source.starships;
    target.url = source.url;
    target.vehiculos = source.vehicles;
    return target;
}