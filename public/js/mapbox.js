/* eslint-disable */
export const displayMap = (locations) =>{
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3VzaGFncmEta3Vud2FyIiwiYSI6ImNrbzM4OXN4cTBvMXAycG92MW9sajBkbG8ifQ.gWA-WTt74czICgcoUZe7mQ';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/kushagra-kunwar/cko3ylbfv032518tet5u67zke',
scrollZoom: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc =>{
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
        element: el,
        anchor: 'bottom',
    }).setLngLat(loc.coordinates).addTo(map);
    new mapboxgl.Popup({offset: 30}).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`).addTo(map);
    bounds.extend(loc.coordinates);
});

map.fitBounds(bounds,{
    padding:{
        top: 200,
        bottom: 150,
        left: 100,
        right: 100
    }
});
};
