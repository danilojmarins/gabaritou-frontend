import type { NextPage } from 'next';
import Head from 'next/head';
import { HomeStyle } from '../styles/pages/Home';
import { Button } from '../styles/components/Button.style';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Home: NextPage = () => {

  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginSenha, setLoginSenha] = useState<string>('');

  const [signNome, setSignNome] = useState<string>('');
  const [signEmail, setSignEmail] = useState<string>('');
  const [signSenha, setSignSenha] = useState<string>('');

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    await login(loginEmail, loginSenha);
  }

  const handleSignIn = () => {
    console.log(signNome, signEmail, signSenha);
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

              <Button className='btn' onClick={handleLogin}>Login</Button>
            </form>

            <form>
              <label>Nome</label>
              <input type="text" onChange={(e) => setSignNome(e.target.value)}></input>

              <label>Email</label>
              <input type="email" onChange={(e) => setSignEmail(e.target.value)}></input>

              <label>Senha</label>
              <input type="password" onChange={(e) => setSignSenha(e.target.value)}></input>

              <Button className='btn' onClick={handleSignIn}>Cadastro</Button>
            </form>
          </div>
        </div>

      </HomeStyle>
      <Rodape />
    </>
  )
}

export default Home;