import React from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import './Success.css'
import stuImg1 from '../../../assets/students/student1.png';
import stuImg2 from '../../../assets/students/student2.png';
import stuImg3 from '../../../assets/students/student3.png';
import stuImg4 from '../../../assets/students/student4.png';
import stuImg5 from '../../../assets/students/student5.png';
import stuImg6 from '../../../assets/students/student6.png';
import SectionTitle from '../../Compo/SectionTitle/SctionTitle';

const carousel = (slider) => {
    const z = 300
    function rotate() {
        const deg = 360 * slider.track.details.progress
        slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`
    }
    slider.on("created", () => {
        const deg = 360 / slider.slides.length
        slider.slides.forEach((element, idx) => {
            element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`
        })
        rotate()
    })
    slider.on("detailsChanged", rotate)
}

export default function App() {
    const [sliderRef] = useKeenSlider(
        {
            loop: true,
            selector: ".carousel__cell",
            renderMode: "custom",
            mode: "free-snap",
        },
        [carousel]
    )
    const currentYear = new Date().getFullYear();


    return (
        <div className='my-20 '>
            <SectionTitle
            heading={`Meet Our ${currentYear} Successful Students`}
            subHeading={"Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle."}
            ></SectionTitle>
            <div className="wrapper ">
                <div className="scene">
                    <div className="carousel keen-slider" ref={sliderRef}>
                        <div className="carousel__cell number-slide1 "><img className='w-12/12' src={stuImg1} alt="" /></div>
                        <div className="carousel__cell number-slide2"><img className='w-12/12 h-48' src={stuImg2} alt="" /></div>
                        <div className="carousel__cell number-slide3"><img className='w-12/12 h-48' src={stuImg3} alt="" /></div>
                        <div className="carousel__cell number-slide4"><img className='w-12/12 h-48' src={stuImg4} alt="" /></div>
                        <div className="carousel__cell number-slide5"><img className='w-12/12 h-48' src={stuImg5} alt="" /></div>
                        <div className="carousel__cell number-slide6"><img className='w-12/12 h-48' src={stuImg6} alt="" /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}