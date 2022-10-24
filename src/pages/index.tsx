import { NextPage } from "next";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Cabecalho from "../components/Cabecalho";
import { HomeStyle } from "../styles/pages/Home.style";

const Home: NextPage = () => {

    const [slide, setSlide] = useState<HTMLElement | null>(null);
    const [inputValue, setInputValue] = useState<string>('slide-1');
    const [clicked, setClicked] = useState<boolean>(false);
    let timer: any;

    useEffect(() => {

        setSlide(document.getElementById('slide-1'));

        let inputValueNumber = parseInt(inputValue.replace(/\D/g,''));

        if (inputValue && inputValueNumber) {

            // eslint-disable-next-line react-hooks/exhaustive-deps
            timer = setTimeout(function() {
                if (inputValue && inputValueNumber && clicked === false && inputValueNumber !== 2) {
                    setInputValue(`slide-${inputValueNumber + 1}`);
                    if (slide) {
                        slide.style.opacity = '0';
                        slide.style.pointerEvents = 'none';
                    }
                    setSlide(document.getElementById(`slide-${inputValueNumber + 1}`));
                } else if (inputValue && inputValueNumber && clicked === false && inputValueNumber === 2) {
                    setInputValue(`slide-1`);
                    if (slide) {
                        slide.style.opacity = '0';
                        slide.style.pointerEvents = 'none';
                    }
                    setSlide(document.getElementById(`slide-1`));
                } else {
                    setClicked(false);
                }
            }, 4000);

        }

    }, [slide, inputValue, clicked]);

    useEffect(() => {

        setSlide(document.getElementById('slide-1'));

    }, []);

    useEffect(() => {

        if (slide) {
            slide.style.opacity = '1';
            slide.style.pointerEvents = 'all';
        }

    }, [slide]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setClicked(true);
        clearTimeout(timer);
        if (slide) {
            slide.style.opacity = '0';
            slide.style.pointerEvents = 'none';
        }
        setSlide(document.getElementById(event.target.value));
    }

    const handleNextBtn = () => {

        let inputValueNumber = parseInt(inputValue.replace(/\D/g,''));

        if (inputValueNumber !== 2) {
            setInputValue(`slide-${inputValueNumber + 1}`);
            setClicked(true);
            clearTimeout(timer);
            if (slide) {
                slide.style.opacity = '0';
                slide.style.pointerEvents = 'none';
            }
            setSlide(document.getElementById(`slide-${inputValueNumber + 1}`));
        } else if (inputValueNumber === 2) {
            setInputValue(`slide-1`);
            setClicked(true);
            clearTimeout(timer);
            if (slide) {
                slide.style.opacity = '0';
                slide.style.pointerEvents = 'none';
            }
            setSlide(document.getElementById(`slide-1`));
        }
    }

    const handlePrevBtn = () => {

        let inputValueNumber = parseInt(inputValue.replace(/\D/g,''));

        if (inputValueNumber !== 1) {
            setInputValue(`slide-${inputValueNumber - 1}`);
            setClicked(true);
            clearTimeout(timer);
            if (slide) {
                slide.style.opacity = '0';
                slide.style.pointerEvents = 'none';
            }
            setSlide(document.getElementById(`slide-${inputValueNumber - 1}`));
        } else if (inputValueNumber === 1) {
            setInputValue(`slide-2`);
            setClicked(true);
            clearTimeout(timer);
            if (slide) {
                slide.style.opacity = '0';
                slide.style.pointerEvents = 'none';
            }
            setSlide(document.getElementById(`slide-2`));
        }
    }

    return (
        <>
            <Cabecalho loggedIn={true} cargo='aluno' />

            <HomeStyle>
                <div className="carousel">

                    <div className='wrapper'>
                        <div className='div'>
                            <Image className="crs-img" id="slide-1" src='/images/banner-gabaritou.png' alt="banner gabaritou" width={1400} height={500} />
                            <input type='radio' name='radio' value={`slide-1`} checked={inputValue === `slide-1`} onChange={handleChange}></input>
                        </div>

                        <div className='div'>
                            <Image className="crs-img" id="slide-2" src='/images/banner-analise.png' alt="banner analise" width={1400} height={500} />
                            <input type='radio' name='radio' value={`slide-2`} checked={inputValue === `slide-2`} onChange={handleChange}></input>
                        </div>
                    
            
                        <div className='btn prev' onClick={handlePrevBtn}><FontAwesomeIcon className='icon-btn' icon={faAngleLeft} fontSize='35px' color='#27921A' /></div>
                        <div className='btn next' onClick={handleNextBtn}><FontAwesomeIcon className='icon-btn' icon={faAngleRight} fontSize='35px' color='#27921A' /></div>
                    </div>

                </div>
            </HomeStyle>
        </>
    )
}

export default Home;