import { ReactElement } from 'react';
import copyImg from '../../assets/images/copy.svg';

import { ContainerRoomCode } from './styles';

type RoomCodeProps = {
    code: string;
}

function RoomCode(props: RoomCodeProps): ReactElement {
    function copyRoomCodeToClipBoard() {
        navigator.clipboard.writeText(props.code)
    }
    return (
        <ContainerRoomCode>
            <button className="room-code" onClick={copyRoomCodeToClipBoard}>
                <div>
                    <img src={copyImg} alt="Copy room code" />
                </div>
                <span>Sala: {props.code}</span>
            </button>
        </ContainerRoomCode>
    );
}

export { RoomCode };