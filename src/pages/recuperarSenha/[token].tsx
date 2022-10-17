import { NextPage } from 'next';
import { HomeStyle } from '../../styles/pages/Home';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button } from '../../styles/components/Button.style';
import { useState } from 'react';
import axios from 'axios';

const RecuperarSenha: NextPage = () => {

    const router = useRouter();
    const { token } = router.query;

    const [validPassword, setValidPassword] = useState<string | null>(null);
    const [novaSenha, setNovaSenha] = useState<string>('');
    const [updateSenhaError, setUpdateSenhaError] = useState<boolean>(false);

    const passwordValidation = (senha: string) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(senha);
    }

    const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!passwordValidation(event.target.value)) {
          setValidPassword('Senha Inválida.');
        } else {
          setValidPassword(null);
        }
        
        setNovaSenha(event.target.value);
    }

    const handleUpdateSenha = async (e: any) => {
        e.preventDefault();

        if (!validPassword) {
            try {
                await axios.post('http://localhost:5000/usuarios/updateSenha', {
                    senha: novaSenha,
                    token: token
                });
                router.push('/');
            }
            catch(error: any) {
                setUpdateSenhaError(true);
            }
          }
    }

    return (
        <>
            <HomeStyle>

                <Head>
                    <title>Gabaritou</title>
                    <meta name="description" content="Questões de concursos de TI." />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div className='login-card'>
                    <h3>Redefina sua Senha:</h3>

                    <div className='forms'>
                        <form>
                            <label>Nova Senha</label>
                            <input type="password" value={novaSenha} onChange={handleSenhaChange}></input>

                            {validPassword && 
                                <>
                                    <p className='error-pass'>Senha deve conter ao menos 8 caracteres.</p>
                                    <p className='error-pass'>1 maiúsculo.</p>
                                    <p className='error-pass'>1 minúsculo.</p>
                                    <p className='error-pass'>1 numérico.</p>
                                </>
                            }

                            {updateSenhaError && <p className='error'>Erro ao Redefinir a Senha.</p>}

                            <Button className='btn' onClick={handleUpdateSenha}>
                                Redefinir Senha
                                <input type="submit" onSubmit={handleUpdateSenha} style={{display: "none"}}></input>
                            </Button>
                        </form>
                    </div>
                </div>

            </HomeStyle>
        </>
    )
}

export default RecuperarSenha;