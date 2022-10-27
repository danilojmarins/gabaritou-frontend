import { GetServerSideProps, NextPage } from "next";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Cabecalho from "../components/Cabecalho";
import { HomeStyle } from "../styles/pages/Home.style";
import Rodape from "../components/Rodape";
import { getApiClient } from "../services/axios";
import { destroyCookie, parseCookies } from "nookies";
import Head from "next/head";

interface User {
    id: string;
    nome: string;
    email: string;
    email_confirmado: boolean;
    cargo_id: number;
}

const Home: NextPage<User> = (user) => {

    const [slide, setSlide] = useState<HTMLElement | null>(null);
    const [inputValue, setInputValue] = useState<string>('slide-1');
    const [clicked, setClicked] = useState<boolean>(false);
    let timer: any;

    useEffect(() => {

        setSlide(document.getElementById('slide-1'));

    }, []);

    useEffect(() => {

        let inputValueNumber = parseInt(inputValue.replace(/\D/g,''));

        if (inputValue && inputValueNumber) {

            // eslint-disable-next-line react-hooks/exhaustive-deps
            timer = setTimeout(function() {
                if (inputValue && inputValueNumber && clicked === false && inputValueNumber !== 2) {
                    setInputValue(`slide-2`);
                    if (slide) {
                        slide.style.opacity = '0';
                        slide.style.pointerEvents = 'none';
                    }
                    setSlide(document.getElementById(`slide-2`));
                } else if (inputValue && inputValueNumber && clicked === false && inputValueNumber === 2) {
                    setInputValue(`slide-1`);
                    if (slide) {
                        slide.style.opacity = '0';
                        slide.style.pointerEvents = 'none';
                        console.log('hide');
                    }
                    setSlide(document.getElementById(`slide-1`));
                } else {
                    setClicked(false);
                }
            }, 5000);

        }

    }, [slide, inputValue, clicked]);

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
            <Head>
                <title>Gabaritou TI</title>
                <meta name="description" content="Questões de concursos de TI." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Cabecalho user={user} />

            <HomeStyle>
                <div className="carousel">

                    <div className='wrapper'>
                        <div className='div'>
                            <Image className="crs-img" id="slide-1" src='/images/banner-gabaritou.png' alt="banner gabaritou" width={1400} height={500} />
                        </div>

                        <div className='div'>
                            <Image className="crs-img" id="slide-2" src='/images/banner-analise.png' alt="banner analise" width={1400} height={500} />
                        </div>

                        <input type='radio' name='radio' value={`slide-1`} checked={inputValue === `slide-1`} onChange={handleChange}></input>
                        <input type='radio' name='radio' value={`slide-2`} checked={inputValue === `slide-2`} onChange={handleChange}></input>
            
                        <div className='btn prev' onClick={handlePrevBtn}><FontAwesomeIcon icon={faAngleLeft} width='30px' /></div>
                        <div className='btn next' onClick={handleNextBtn}><FontAwesomeIcon icon={faAngleRight} width='30px' /></div>
                    </div>

                </div>
            </HomeStyle>

            <Rodape />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const apiClient = getApiClient(ctx);

    const { ['gabaritou.token']: token } = parseCookies(ctx);

    if (!token) {
        return {
            props: {}
        }
    }

    let user: User | undefined;

    await apiClient.get('/usuarios/get/usuarioPorId').then(response => {
        user = response.data;
    }).catch(function() {
        destroyCookie(ctx, 'gabaritou.token');
    });

    if (!user) {
        return {
            props: {}
        }
    }

    return {
        props: user
    }
}

export default Home;