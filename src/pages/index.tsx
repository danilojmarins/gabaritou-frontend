import type { NextPage } from 'next';
import Head from 'next/head';
import { HomeStyle } from '../styles/pages/Home';
import { Button } from '../styles/components/Button.style';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Router from 'next/router';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const Home: NextPage = () => {

  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginSenha, setLoginSenha] = useState<string>('');

  const [signNome, setSignNome] = useState<string>('');
  const [signEmail, setSignEmail] = useState<string>('');
  const [signSenha, setSignSenha] = useState<string>('');

  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [emailExists, setEmailExists] = useState<boolean>(false);

  const { login, loginError, isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    Router.push('/dashboard');
  }

  const handleLogin = async () => {
    await login(loginEmail, loginSenha);
  }

  const handleSignIn = async () => {
    if (validPassword) {
      await axios.post('http://localhost:5000/usuarios', {
        nome: signNome,
        email: signEmail,
        senha: signSenha
      })
      .catch(function(err) {
        if (err.response.status === 409) {
          setEmailExists(true);
        }
      })
    }
  }

  const passwordValidation = (senha: string) => {
    if (senha.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  }

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

            <form>
              <label>Nome</label>
              <input type="text" onChange={(e) => setSignNome(e.target.value)}></input>

              <label>Email</label>
              <input type="email" onChange={(e) => setSignEmail(e.target.value)}></input>

              {emailExists && <p className='error'>Email informado já está em uso.</p>}

              <label>Senha</label>
              <input type="password" onChange={(e) => {setSignSenha(e.target.value); passwordValidation(e.target.value)}}></input>

              {!validPassword && 
                <>
                  <p className='error-pass'>Senha deve conter ao menos 8 caracteres.</p>
                  <p className='error-pass'>1 maiúsculo.</p>
                  <p className='error-pass'>1 minúsculo.</p>
                  <p className='error-pass'>1 numérico.</p>
                </>
              }

              <Button className='btn' onClick={handleSignIn}>
                Cadastro
                <input type="submit" onSubmit={handleSignIn} style={{display: "none"}}></input>
              </Button>
            </form>
          </div>
        </div>

      </HomeStyle>
      <Rodape />
    </>
  )
}

export default Home;