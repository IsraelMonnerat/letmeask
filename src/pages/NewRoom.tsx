import {FormEvent, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import illustrationImg from  '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
//import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import {Button} from '../components/Button';
import { useAuth } from '../hook/useAuth';
import { database } from '../services/firebase'
export function NewRoom(){
  const {user} =useAuth();
  const history = useHistory()

  const [NewRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (NewRoom.trim() == '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: NewRoom,
      userId: user?.id,
    });
    
history.push(`/rooms/${firebaseRoom.key}`);
  }
  
  return(
    <div id="page-auth">
      <aside>
       <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas." /> 
       <strong>Cria salas de Q&amp;A ao-vivo.</strong>
       <p>Tire as suas dúvidas em tempo-real.</p>
      </aside>
      <main>
        
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
            type="text"
            placeholder="Nome da sala"
            onChange={event => setNewRoom(event.target.value)}
            value={NewRoom} 
            />
            <Button type="submit">
              Criar sala
            </Button>
            <p>
              Entrar em uma sala existente: <Link to="/">Clique aqui</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}
          
          