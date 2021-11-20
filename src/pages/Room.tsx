import logoImg from '../assets/images/logo.svg';
import {useParams} from 'react-router-dom'
import { Button } from '../components/Button';
import {RoomCode} from '../components/roomcode';
import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export function Room(){
  const params = useParams<RoomParams>();
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={params.id}/>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form>
          <textarea
          placeholder="Qual é a sua pergunta?"
          />
          <div className="form-footer">
            <span>
              Para enviar uma pergunta, <button>faça o seu login.</button>
            </span>
              <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}

