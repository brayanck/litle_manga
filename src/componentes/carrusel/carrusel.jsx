import React from 'react';
import {Slideshow, Slide, TextoSlide} from '../../hooks/carrusel'
import styled from 'styled-components';
import img1 from '../../assets/creo/anime-collage-portada-min.jpg';
import img2 from '../../assets/creo/dragon_ball.jpg';
import img3 from '../../assets/creo/evan.jpg';
import img4 from '../../assets/creo/naruto.jpg';
import './carrusel.css';
const App = () => {
	return (
		<div className='carrusel'>
			<Titulo>Productos Destacados</Titulo>
			<Slideshow controles={true}>
				<Slide>
					
						<img src={img1} alt="publicida"/>
					<TextoSlide colorFondo="#98ffe9">
						<p>Estrenos</p>
					</TextoSlide>
				</Slide>
				<Slide>
						<img src={img2} alt="publicida"/>
					<TextoSlide colorFondo="#98ffe9">
						<p>Primicias</p>
					</TextoSlide>
				</Slide>
				<Slide>
						<img src={img3} alt="publicida"/>

					<TextoSlide colorFondo="#98ffe9">
						<p>Factos</p>
					</TextoSlide>
				</Slide>
				<Slide>
						<img src={img4} alt="publicida"/>
					<TextoSlide colorFondo="#98ffe9">
						<p>Decuentos</p>
					</TextoSlide>
				</Slide>
			</Slideshow>

		</div>
	);
}

const Titulo = styled.p`
	font-size: 18px;
	font-weight: 700;
	text-transform: uppercase;
	margin-bottom: 10px;
`;
 
export default App;