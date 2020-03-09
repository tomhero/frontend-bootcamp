// alert('Welcome to Lo-ma App!!')
import { Map, View } from "ol";
import { Tile } from "ol/layer";
import { fromLonLat } from "ol/proj";
import { OSM } from "ol/source";

const form = document.querySelector('form') as HTMLFormElement;
const addressInput = document.querySelector("#address") as HTMLInputElement;

const coordinates = {lat: 40.41, lng: -73.99}; // Can't fetch coordinates from Google API, use dummy ones

form.addEventListener('submit', (ev: Event) => {
    ev.preventDefault()
    const enteredAddress = addressInput.value;
    console.log(enteredAddress);

    document.getElementById('map')!.innerHTML = ''; // clear <p> from <div id="map">

    new Map({
        target: 'map',
        layers: [
          new Tile({
              source: new OSM()
          })
        ],
        view: new View({
          center: fromLonLat([coordinates.lng, coordinates.lat]),
          zoom: 16
        })
      });
});
