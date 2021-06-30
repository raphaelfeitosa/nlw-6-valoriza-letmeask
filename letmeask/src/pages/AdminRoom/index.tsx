import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRoom } from "../../hooks/useRoom";

import LogoAskLive from "../../assets/images/logo-ask-live.png";
import deleteImg from "../../assets/images/delete.svg";
import checkImg from "../../assets/images/check.svg";
import answerImg from "../../assets/images/answer.svg";
import noQuestionsYet from '../../assets/images/empty-questions.svg';
import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { Question } from "../../components/Question";
import { BsSun, BsMoon } from 'react-icons/bs';

import { ContainerAdminRoom } from './style';
import { database } from "../../services/firebase";
import { useTheme } from "../../styles/hook/theme";

type RoomParams = {
    id: string;
}

function AdminRoom() {
    const { toggleTheme, theme } = useTheme();
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;

    const { title, questions } = useRoom(roomId);

    async function handleChangeTheme() {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    async function handleEndRoom() {

        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        });

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que voê deseja excluir está pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    }

    return (
        <ContainerAdminRoom>
            <header>
                <div className="content">
                    <img src={LogoAskLive} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                        <button type="button" onClick={handleChangeTheme}>
                            {darkTheme ? (
                                <BsSun size={25} className="iconTheme" />
                            ) : (
                                <BsMoon size={25} className="iconTheme" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            <main>
                <div className="question-title">
                    <h1>Sala: {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s) </span>}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckQuestionAnswered(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleHighlightQuestion(question.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque á pergunta" />
                                        </button>
                                    </>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>

                            </Question>
                        );
                    })}
                </div>
            </main>
            <footer className="empty-question">
                {questions.length <= 0 ? (
                    <div>
                        <img src={noQuestionsYet} alt="Sem perguntas no momento" />
                        <h3>Nenhuma pergunta por aqui...</h3>
                        <span>
                            Compartilhe seu codigo de sala para sua audiencia entrar e
                            começar a enviar perguntas!
                        </span>
                    </div>
                ) : (
                    ""
                )}
            </footer>
        </ContainerAdminRoom>
    );
}

export { AdminRoom };