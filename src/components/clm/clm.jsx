import React, {useEffect, useState} from 'react';
import './clm.scss';
import './diff-layers.scss';
import './button.scss';

import bgDay from '../../assets/images/bg_day.jpg';
import bgNight from '../../assets/images/bg_night.jpg';
import bgNames from '../../assets/images/brand_names.png';
import lighthouseDay from '../../assets/images/lighthouse_day.png';
import lighthouseNight from '../../assets/images/lighthouse_night.png';
import templates from '../../assets/images/templates.png';
import textFloor1 from '../../assets/images/text-floor-1.png';
import textFloor2 from '../../assets/images/text-floor-2.png';
import textFloor3 from '../../assets/images/text-floor-3.png';
import textFloor4 from '../../assets/images/text-floor-4.png';
import textFloor5 from '../../assets/images/text-floor-5.png';
import textFloor6 from '../../assets/images/text-floor-6.png';

const MAX_WIDTH = 1024; //1024;
const MAX_STEPS = 10;

export default function CLM() {
	const [ step, setStep ] = useState(0);
	const [ isPlay, setIsPlay ] = useState(false);
	// sequencer
	const sqncr = {
		bgDay: [0],
		bgDayOver: [1],
		bgNight: [8],
		bgNames: [0, 1],
		lighthouseDay: [0],
		lighthouseNight: [8],
		templates: [0],
		textFloor1: [2],
		textFloor2: [3],
		textFloor3: [4],
		textFloor4: [5],
		textFloor5: [6],
		textFloor6: [7],
		flashing: [9],
	}

	const renderStep = (st = 0) => {
		document.querySelectorAll('.clm__layer').forEach(e => {
			if(sqncr[e.getAttribute('data-layer')]?.includes(st)) {
				e.classList.toggle("clm__layer_visible");
			}
		});
	}

	const restart = () => {
		const layers = document.querySelectorAll('.clm__layer');
		layers.forEach(l => l.classList.remove("clm__layer_visible"));
		setStep(0);
		renderStep(0);
		setIsPlay(false);
	}

	const nextStep = () => {
		if(step < MAX_STEPS) {
			renderStep(step + 1);
			setStep(step + 1);
		} else {
			setIsPlay(false);
		}
	}

	const prevStep = () => {
		if(step > 0) {
			renderStep(step);
			setStep(step - 1);
		}
	}

	// init render
	useEffect(renderStep, []);
	// keys
	useEffect(()=>{
		document.body.onkeyup = function(e){
			if(e.code === 'Space') setIsPlay(!isPlay);
			if(e.code === 'Enter') restart();
			if(e.code === 'ArrowLeft') prevStep();
			if(e.code === 'ArrowRight') nextStep();
		}
	})

	// timer
	useEffect(()=>{
		console.clear();
		console.log(step);
		// if(step === 0) renderStep();
		// if(step >= MAX_STEPS) return false;
		if(!isPlay) return false;

		setTimeout(()=>{
			nextStep();
		}, 2000)
	})

	// height lighthouse
	useEffect(()=>{
		const startMove = 2;
		const visPositions = [81, 72, 61.5, 50, 38.3, 0];

		if(step > startMove + visPositions.length - 1) return false;
		const visLHouse = (step < startMove) ? visPositions[0] : visPositions[step - startMove];

		document.querySelector('[data-layer="lighthouseDay"]')
			.style.clipPath = `polygon( 0 ${visLHouse}%, 100% ${visLHouse}%, 100% 100%, 0 100% )`;
	}, [step])

	return (
		<>
			<div className="clm__wrapper">
				<div className="clm__inner" style={{maxWidth: MAX_WIDTH}}>
					<img className="clm__layer" src={bgDay} alt='' data-layer="bgDay"/>
					<img className="clm__layer" src={bgNight} alt='' data-layer="bgNight"/>
					<img className="clm__layer" src={templates} alt='' data-layer="templates"/>

					<img className="clm__layer layer__bg-names" src={bgNames} alt='' data-layer="bgNames"/>

					<img className="clm__layer" src={lighthouseDay} alt='' data-layer="lighthouseDay"/>
					<img className="clm__layer" src={lighthouseNight} alt='' data-layer="lighthouseNight"/>
					<div className="clm__layer layer__flashing" data-layer="flashing"></div>
					<img className="clm__layer" src={textFloor6} alt='' data-layer="textFloor6"/>
					<img className="clm__layer" src={textFloor5} alt='' data-layer="textFloor5"/>
					<img className="clm__layer" src={textFloor4} alt='' data-layer="textFloor4"/>
					<img className="clm__layer" src={textFloor3} alt='' data-layer="textFloor3"/>
					<img className="clm__layer" src={textFloor2} alt='' data-layer="textFloor2"/>
					<img className="clm__layer" src={textFloor1} alt='' data-layer="textFloor1"/>
				</div>
			</div>
			<div className="clm__button">
				<button className="button-three" onClick={prevStep}>prev</button>
				<button className=" button-three" onClick={()=>setIsPlay(!isPlay)}>{isPlay ? 'pause' : 'play'}</button>
				<button className="button-three" onClick={nextStep}>next</button>
				<button className="button-three" onClick={restart}>restart</button>
			</div>
		</>
	)
}
