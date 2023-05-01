import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MapContainer, TileLayer, Marker,Popup} from "react-leaflet";
import l from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png"
import iconSwadow from "leaflet/dist/images/marker-shadow.png"
import 'leaflet/dist/leaflet.css'
import {
  faFacebookF,
  faTwitch,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

let iconUbicacion = new l.icon({
              iconUrl: icon,
               shadowUrl: iconSwadow,
               iconSize:     [38, 95], 
               shadowSize:   [50, 64], 
               iconAnchor:   [22, 94], 
               shadowAnchor: [4, 62], 
               popupAnchor:  [-3, -76]
})
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container_footer">
        <div className="row">
          <div className="footer-col">
            <h4>Little Manga 87'</h4>
            <ul>
              <li>
                <a href="https://www.ottokrause.edu.ar/">Sobre nosotros</a>
              </li>
              <li>
                <a href="https://www.ottokrause.edu.ar/">Nuestros servicios</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Consegui ayuda</h4>
            <ul>
              <li>
                <a href="https://www.ottokrause.edu.ar/">FAQ</a>
              </li>
              <li>
                <Link to="/cart">Carrito</Link>
              </li>
              <li>
                <Link to="/misCompras">Estado de orden</Link>
              </li>
              <li>
                <Link to="/Favoritos">Favoritos</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col redes">
            <h4>Seguinos en</h4>
            <div className="social-links">
              <a
                className="facebook"
                href="https://www.facebook.com/gaelnicolas.gila"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a className="twitter" href="https://twitter.com/kuroxqt">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                className="instagram"
                href="https://www.instagram.com/gaelgila/"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a className="twitch" href="https://www.twitch.tv/kuroxqt">
                <FontAwesomeIcon icon={faTwitch} />
              </a>
            </div>
          </div>
          <div></div>
          <div className="map-container">
            <MapContainer
            className="mapa"
              center={[-34.615505,-58.384796]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[-34.615505,-58.384796]} icon={iconUbicacion}>
                <Popup>
                México  <br /> 1320
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </footer>
  );
}
