import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo-ask-live.png';
import userImg from '../../assets/images/user-icon.svg';

import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../styles/hook/theme';
import { BsSun, BsMoon } from "react-icons/bs";

import { database } from '../../services/firebase';

import { ContainerNewRoom, MainContent } from "./styles";

function NewRoom() {

    const { toggleTheme, theme } = useTheme();
    const [darkTheme, setDarkTheme] = useState(() =>
        theme.title === "dark" ? true : false
    );

    const { user, signOut } = useAuth();

    const history = useHistory();

    const [newRoom, setNewRoom] = useState('');

    async function handleChangeTheme() {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return toast.error("Digite o nome da sala!");
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });

        toast.success("Sala criada com sucesso!", {
            id: newRoom,
            style: {
                width: "auto",
            },
        });

        history.replace(`/admin/rooms/${firebaseRoom.key}`);
        // history.push(`/rooms/${firebaseRoom.key}`);
    }

    return (
        <ContainerNewRoom>
            <aside>
                <img src={illustrationImg} alt="imagem home" />
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

                    <img src={logoImg} alt="any ask" />

                    <div className="user-perfil-login">
                        <img src={user?.avatar} alt="" />
                        <div className="user-login">
                            <h1>{user?.name}</h1>
                            <h1>{user?.email}</h1>
                        </div>
                    </div>

                    <div onClick={signOut} className="user-perfil-logout">
                        <img src={userImg} alt="" />
                        <div className="user-logout">
                            <h1>Usar outra conta</h1>
                        </div>
                    </div>

                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Digite o nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                        <Toaster position="top-right" reverseOrder={false} />
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
                    </p>
                </MainContent>
            </main>
        </ContainerNewRoom>
    )
}
export { NewRoom };