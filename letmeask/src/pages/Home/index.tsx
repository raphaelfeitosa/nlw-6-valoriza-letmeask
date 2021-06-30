
import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from '../../components/Button';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo-ask-live.png';
import googleIconImg from '../../assets/images/google-icon.svg';
import { ContainerHome, MainContent } from './style';
import { useAuth } from '../../contexts/AuthContext';
import { database } from '../../services/firebase';
import { toast, Toaster } from 'react-hot-toast';
import { useTheme } from '../../styles/hook/theme';
import { BsSun, BsMoon } from "react-icons/bs";

export function Home() {
    const { toggleTheme, theme } = useTheme();
    const [darkTheme, setDarkTheme] = useState(() =>
        theme.title === "dark" ? true : false
    );

    const history = useHistory();

    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {

        if (!user) {
            await signInWithGoogle();
        }

        history.push('/rooms/new');
    }

    async function handleChangeTheme() {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return toast.error("Digite o código da sala", {
                style: {
                    width: "auto",
                }
            });
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            return toast.error("Sala inexistente 😢", {
                id: roomCode,
                style: {
                    width: "auto",
                },
            });
        }

        if (roomRef.val().endedAt) {
            return toast.error("Sala fechada 😢", {
                id: roomCode,
                style: {
                    width: "auto",
                },
            });
        }

        history.push(`rooms/${roomCode}`);
    }

    return (
        <ContainerHome>
            <aside>
                <img src={
                    illustrationImg}
                    alt="Ilustração simbolizando perguntas e respostas"
                />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>

            <main>
                <MainContent>
                    <div>
                        <button type="button" onClick={handleChangeTheme}>
                            {darkTheme ? (
                                <BsSun size={25} className="iconTheme" />
                            ) : (
                                <BsMoon size={25} className="iconTheme" />
                            )}
                        </button>
                    </div>

                    <img src={logoImg} alt="Logo" />
                    <button
                        type="button"
                        onClick={handleCreateRoom}
                        className="create-room-google"
                    >
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o google
                    </button>
                    <Toaster position="top-right" reverseOrder={false} />
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </MainContent>
            </main>
        </ContainerHome>
    )
}