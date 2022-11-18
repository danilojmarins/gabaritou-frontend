import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { LoginStyle } from '../styles/pages/Login.style';
import { Button } from '../styles/components/MinimalComponents.style';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { faXmark, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from '../styles/components/Modal.style';
import { api } from '../services/api';
import { parseCookies } from 'nookies';
import CarregamentoWidget from '../components/CarregamentoWidget';

const Login: NextPage = ({ user }: any) => {

  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginSenha, setLoginSenha] = useState<string>('');

  const [signNome, setSignNome] = useState<string>('');
  const [signEmail, setSignEmail] = useState<string>('');
  const [signSenha, setSignSenha] = useState<string>('');

  const [recuperaSenhaEmail, setRecuperaSenhaEmail] = useState<string>('');

  const [validPassword, setValidPassword] = useState<string | null>(null);
  const [validEmail, setValidEmail] = useState<string | null>(null);
  const [validNome, setValidNome] = useState<string | null>(null);
  const [validRecuperaSenhaEmail, setValidRecuperaSenhaEmail] = useState<string | null>(null);

  const [emailExists, setEmailExists] = useState<boolean>(false);
  const [signError, setSignError] = useState<boolean>(false);
  const [recuperaSenhaError, setRecuperaSenhaError] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalRecuperaSenhaOpen, setModalRecuperaSenhaOpen] = useState<boolean>(false);
  const [emailRecuperacaoEnviado, setEmailRecuperacaoEnviado] = useState<boolean>(false);

  const [showLoginPass, setShowLoginPass] = useState<boolean>(false);
  const [showSignPass, setShowSignPass] = useState<boolean>(false);

  const [carregando, setCarregando] = useState<boolean>(false);

  const { login, loginError, emailNaoConfirmado } = useContext(AuthContext);

  const handleLogin = async () => {
    setCarregando(true);
    await login(loginEmail, loginSenha);
    setCarregando(false);
  }

  const handleSignIn = async (e: React.MouseEvent<HTMLDivElement> | React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (!validPassword && !validEmail) {
      try {
        setCarregando(true);
        await api.post('/usuarios/post/salvaUsuario', {
          nome: signNome,
          email: signEmail,
          senha: signSenha
        });
        setCarregando(false);
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

  const handleRecuperaSenha = async (e: React.MouseEvent<HTMLDivElement>) => {

    e.preventDefault();

    if (!validRecuperaSenhaEmail) {
      try {
        setCarregando(true);
        await api.post('/usuarios/post/esqueceuSenha', {
          email: recuperaSenhaEmail
        });
        setCarregando(false);
        setEmailRecuperacaoEnviado(true);
      }
      catch(error: any) {
        setRecuperaSenhaError(true);
      }
    }
  }

  const nomeValidation = (nome: string) => {
    return /^.{3,}$/.test(nome);
  }

  const passwordValidation = (senha: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/.test(senha);
  }

  const emailValidation = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!nomeValidation(event.target.value)) {
      setValidNome('Nome deve ter ao menos 3 caracteres.');
    } else {
      setValidNome(null);
    }

    setSignNome(event.target.value);
  };

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

  const handleRecuperaSenhaEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!emailValidation(event.target.value)) {
      setValidRecuperaSenhaEmail('Email inválido.');
    } else {
      setValidRecuperaSenhaEmail(null);
    }

    setRecuperaSenhaEmail(event.target.value);
  }

  return (
    <>
      <Head>
        <title>Gabaritou TI | Login</title>
        <meta name="description" content="Questões de concursos de TI." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {carregando && <CarregamentoWidget />}

      <Cabecalho user={user} />

      <LoginStyle>

        <div className='login-card'>
          <h3>Entre ou Registre-se</h3>

          <div className='forms'>
            <form>
              <label>Email</label>
              <input type="email" onChange={(e) => setLoginEmail(e.target.value)}></input>

              <label>Senha</label>
              <div className='pass-input'>
                <input type={showLoginPass ? "text" : "password"} onChange={(e) => setLoginSenha(e.target.value)}></input>
                <FontAwesomeIcon icon={faEye} className='pass-icon' onClick={() => setShowLoginPass(!showLoginPass)} />
              </div>

              {loginError && <p className='error'>Email ou Senha Incorretos.</p>}

              {emailNaoConfirmado && <p className='error'>Seu email precisa ser confirmado.</p>}

              <p className='error'><a href='' onClick={(e) => {e.preventDefault(); setModalRecuperaSenhaOpen(true)}}>Esqueceu sua senha?</a></p>

              <Button className='btn' onClick={handleLogin}>
                Login
                <input type="submit" onSubmit={handleLogin} style={{display: "none"}}></input>
              </Button>
            </form>

            <form onSubmit={(e) => handleSignIn(e)}>
              <label>Nome</label>
              <input type="text" onChange={handleNomeChange}></input>

              {validNome && <p className='error'>{validNome}</p>}

              <label>Email</label>
              <input type="email" value={signEmail} onChange={handleEmailChange}></input>

              {emailExists && <p className='error'>Email já está sendo usado.</p>}

              {validEmail && <p className='error'>{validEmail}</p>}

              <label>Senha</label>
              <div className='pass-input'>
                <input type={showSignPass ? "text" : "password"} onChange={handleSenhaChange}></input>
                <FontAwesomeIcon icon={faEye} className='pass-icon' onClick={() => setShowSignPass(!showSignPass)} />
              </div>

              {validPassword && 
                <>
                  <p className='error-pass'>Senha deve conter ao menos 8 caracteres:</p>
                  <p className='error-pass'>ao menos 1 maiúsculo, 1 minúsculo,</p>  
                  <p className='error-pass'>1 numérico e 1 especial.</p>
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

        {modalRecuperaSenhaOpen && <Modal>
          {emailRecuperacaoEnviado ? 
          <>
            <h3>Email de Recuperação Enviado</h3>
            <p>Um Email foi enviado para sua caixa de entrada.</p>
            <p>Clique no link enviado no Email para redefinir sua senha.</p>
          </>
          :
          <>
            <h3>Recupere sua Senha</h3>

            <div className='input-email-wrapper'>
              <label>Email</label>
              <br></br>
              <input type="email" value={recuperaSenhaEmail} onChange={handleRecuperaSenhaEmailChange}></input>
              {validRecuperaSenhaEmail && <p className='error'>{validRecuperaSenhaEmail}</p>}
              {recuperaSenhaError && <p className='error'>Erro ao enviar email de recuperação.</p>}
            </div>

            <Button className='btn' onClick={(e) => handleRecuperaSenha(e)}>
              Enviar Email
              <input type="submit" style={{display: "none"}}></input>
            </Button>
          </>}

          <button onClick={() => setModalRecuperaSenhaOpen(false)}><FontAwesomeIcon icon={faXmark} className='close-icon' /></button>
        </Modal>}

      </LoginStyle>
      <Rodape />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { ['gabaritou.token']: token } = parseCookies(ctx);

  if (token) {
      return {
          redirect: {
              destination: '/dashboard',
              permanent: false
          }
      }
  }

  return {
    props: {}
  }
}

export default Login;