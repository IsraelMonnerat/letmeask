import {useHistory} from 'react-router-dom'
import {auth, database, firebase} from '../services/firebase'
import illustrationImg from  '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import {Button} from '../components/Button';
import { useAuth } from '../hook/useAuth'
import { FormEvent, useState } from 'react'




export function Home(){
  const history = useHistory();
  const {user, signInWithGoogle} =useAuth();
  const [roomCode, setRoomCode] = useState('');
  async function handleCreateRoom(){
    if (!user){
      await signInWithGoogle()
    }
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault();

    if (roomCode.trim() === ''){
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()){
      alert('Room does not exist.');
      return;
    }

    history.push(`/room/${roomCode}`);
  }
  
  function goToNewRoom() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result =>{
      console.log(result);
      history.push('/rooms/new')
    })
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
          <button onClick={goToNewRoom} className="googlecreateRoom">
            <img src={googleIconImg} alt="Logo do google" />
            Crie sua sala com conta Google
          </button>
          <div className="enlargator">ou entre em uma sala</div>
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
        </div>
      </main>
    </div>
  )
}