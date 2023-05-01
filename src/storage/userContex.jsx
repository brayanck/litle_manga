import { createContext,useState  } from "react";
import firebaseApp from "../service/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
,signOut} from "firebase/auth";
import Swal from "sweetalert2";

export const userContext = createContext();
const auth = getAuth(firebaseApp);

export function UserContexProvider(props) {
  const [usuario, setUsuario] = useState(null);



  const crearCuenta = async (form) => {
    try{
      let user = await createUserWithEmailAndPassword(auth, form.email, form.contraseña)

      setUsuario(user)
    }catch(err){
      console.log(err);
    }
  };
  const iniciarCuenta = (form) => {
    signInWithEmailAndPassword(auth, form.email, form.contraseña).then(
      (usuarioFirebase) => {
        setUsuario(usuarioFirebase);
      }
    );
  };
  
  const autenti = () => {
    onAuthStateChanged(auth, (usuariFirebase) => {
      if (usuariFirebase) {
        setUsuario(usuariFirebase);
      } else {
        setUsuario(null);
      }
    });
  };
  const cerrarSesion = () =>{
    signOut(auth).then(() => {
      Swal.fire({
        title:'Cerraste sesion correctamente',
        icon:'error',
        toast:true,
        position:'bottom-end',
        timer:1500,
        timerProgressBar:true,
        showConfirmButton: false,
        showCloseButton: true,
        background:'red'
        })
      }).catch((error) => {
        Error("hubo un error al cerrar sesion",error)
      });
    setUsuario(null)
  }



  const value = { usuario, crearCuenta, iniciarCuenta, autenti,cerrarSesion};
  return (
    <userContext.Provider value={value}>{props.children}</userContext.Provider>
  );
}
