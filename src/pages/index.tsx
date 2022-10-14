import type { NextPage } from 'next';
import Head from 'next/head';
import { HomeStyle } from '../styles/pages/Home';
import { Button } from '../styles/components/Button.style';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';
import React, { ChangeEvent, ChangeEventHandler, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Router from 'next/router';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Modal } from '../styles/components/Modal.style';

const Home: NextPage = () => {

  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginSenha, setLoginSenha] = useState<string>('');

  const [signNome, setSignNome] = useState<string>('');
  const [signEmail, setSignEmail] = useState<string>('');
  const [signSenha, setSignSenha] = useState<string>('');

  const [validPassword, setValidPassword] = useState<string | null>(null);
  const [validEmail, setValidEmail] = useState<string | null>(null);

  const [emailExists, setEmailExists] = useState<boolean>(false);
  const [signError, setSignError] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { login, loginError, isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    Router.push('/dashboard');
  }

  const handleLogin = async () => {
    await login(loginEmail, loginSenha);
  }

  const handleSignIn = async (e:any) => {

    e.preventDefault();

    if (!validPassword && !validEmail) {
      try {
        await axios.post('http://localhost:5000/usuarios', {
          nome: signNome,
          email: signEmail,
          senha: signSenha
        });
        setModalOpen(true);
      }
      catch(error: any) {
        if(error.response.status === 409) {
          setEmailExists(true);
        }
        else {
          setSignError(true);
        }
      }
    }
  }

  const passwordValidation = (senha: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(senha);
  }

  const emailValidation = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!emailValidation(event.target.value)) {
      setValidEmail('Email inválido.');
    } else {
      setValidEmail(null);
    }

    setSignEmail(event.target.value);
  };

  const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!passwordValidation(event.target.value)) {
      setValidPassword('Senha Inválida.');
    } else {
      setValidPassword(null);
    }

    setSignSenha(event.target.value);
  };

  return (
    <>
      <Cabecalho />
      <HomeStyle>

        <Head>
          <title>Gabaritou</title>
          <meta name="description" content="Questões de concursos de TI." />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='login-card'>
          <h3>Entre ou Registre-se</h3>

          <div className='forms'>
            <form>
              <label>Email</label>
              <input type="email" onChange={(e) => setLoginEmail(e.target.value)}></input>

              <label>Senha</label>
              <input type="password" onChange={(e) => setLoginSenha(e.target.value)}></input>

              {loginError && <p className='error'>Email ou Senha Incorretos.</p>}

              <Button className='btn' onClick={handleLogin}>
                Login
                <input type="submit" onSubmit={handleLogin} style={{display: "none"}}></input>
              </Button>
            </form>

            <form onSubmit={(e) => handleSignIn(e)}>
              <label>Nome</label>
              <input type="text" onChange={(e) => setSignNome(e.target.value)}></input>

              <label>Email</label>
              <input type="email" value={signEmail} onChange={handleEmailChange}></input>

              {emailExists && <p className='error'>Email já está sendo usado.</p>}

              {validEmail && <p className='error'>{validEmail}</p>}

              <label>Senha</label>
              <input type="password" onChange={handleSenhaChange}></input>

              {validPassword && 
                <>
                  <p className='error-pass'>Senha deve conter ao menos 8 caracteres.</p>
                  <p className='error-pass'>1 maiúsculo.</p>
                  <p className='error-pass'>1 minúsculo.</p>
                  <p className='error-pass'>1 numérico.</p>
                </>
              }

              {signError && <p className='error'>Erro ao cadastrar.</p>}

              <Button className='btn' onClick={(e) => handleSignIn(e)}>
                Cadastro
                <input type="submit" style={{display: "none"}}></input>
              </Button>
            </form>
          </div>
        </div>

        {modalOpen && <Modal>
          <h3>Confirme seu Email</h3>
          <p>Um Email foi enviado para sua caixa de entrada.</p>
          <p>Clique no link enviado no Email para confirmar seu cadastro.</p>
          <button onClick={() => setModalOpen(false)}><FontAwesomeIcon icon={faXmark} className='close-icon' /></button>
        </Modal>}

      </HomeStyle>
      <Rodape />
    </>
  )
}

export default Home;