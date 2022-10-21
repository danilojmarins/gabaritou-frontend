import { NextPage } from 'next';
import { HomeStyle } from '../../styles/pages/Home.style';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button } from '../../styles/components/MinimalComponents.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { api } from '../../services/api';

const RecuperarSenha: NextPage = () => {

    const router = useRouter();
    const { token } = router.query;

    const [validPassword, setValidPassword] = useState<string | null>(null);
    const [novaSenha, setNovaSenha] = useState<string>('');
    const [updateSenhaError, setUpdateSenhaError] = useState<boolean>(false);

    const [showPass, setShowPass] = useState<boolean>(false);

    const passwordValidation = (senha: string) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha);
    }

    const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!passwordValidation(event.target.value)) {
          setValidPassword('Senha Inválida.');
        } else {
          setValidPassword(null);
        }
        
        setNovaSenha(event.target.value);
    }

    const handleUpdateSenha = async (e: React.MouseEvent<HTMLDivElement> | React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (!validPassword) {
            try {
                await api.post('/usuarios/updateSenha', {
                    senha: novaSenha,
                    token: token
                });
                router.push('/');
            }
            catch(error) {
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
                            <div className='pass-input'>
                                <input type={showPass ? "text" : "password"} value={novaSenha} onChange={handleSenhaChange}></input>
                                <FontAwesomeIcon icon={faEye} className='pass-icon' onClick={() => setShowPass(!showPass)} />
                            </div>

                            {validPassword && 
                                <>
                                    <p className='error-pass'>Senha deve conter ao menos 8 caracteres:</p>
                                    <p className='error-pass'>ao menos 1 maiúsculo, 1 minúsculo,</p>  
                                    <p className='error-pass'>1 numérico e 1 especial.</p>
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