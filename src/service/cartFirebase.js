
import {getFirestore, doc, getDocs, collection, where, query, getDoc, addDoc,} from "firebase/firestore"
//import data from "../assets/productos.json"
// import {writeBatch} from "firebase/firestore"
import Swal from "sweetalert2";
import firebaseApp from "./firebase"



const db = getFirestore(firebaseApp)


// 1. obtener un producto
export async function getSingleItem(itemid)
{
    const docRef = doc(db,"products",itemid)
    let snapshot = await getDoc(docRef)  
    if(!snapshot.exists()){
      throw new Error( Swal.fire(
        'error',
        `este producto no existe`,
        'error'
      ).then(Response=>{
        setTimeout(() => {
        window.location = "/";
      }, 500);
      })
      )
    }
    return {...snapshot.data(),id: snapshot.id};
}


// 2 obtener todos los productos
export async function getItem(){
  const productCollection = collection(db, "products")
  const querySnapshot = await getDocs(productCollection)
  const dataDoc = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
    return dataDoc
}


export async function getItemsByCategory(idCategory)
{
  if(idCategory===undefined){
    return 
  }
  const productsCollectionRef = collection(db,"products")
  const q = query(productsCollectionRef, where("category","==", idCategory))
  const querySnapshot = await getDocs(q)
  const dataDoc = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
    return dataDoc
    
}

export async function existencia(clase)
{
  const productsCollectionRef = collection(db,"products")
  const q = query(productsCollectionRef, where(clase, "!=", false))
  const querySnapshot = await getDocs(q)
  const dataDoc = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
    return dataDoc
    
}

export async function createBuyOrder(order) {
  const collectionOrder = collection(db,"orders")
  const orderDoc = await addDoc(collectionOrder,order)
  return orderDoc.id

}

// export async function exportDatawithBatch(){
//   const productCollection = collection(db, "products")
//   const batch = writeBatch(db)

//   for(let item of data.items){
//     delete(item.id)
//     const newDoc = doc(productCollection)
//     batch.set(newDoc,item)
//   }
//   const commit = await batch.commit()
// }

export async function getCompra(idCompra){
  const docRef = doc(db,"orders",idCompra)
  let snapshot = await getDoc(docRef)  
  if(!snapshot.exists()){
    throw new Error( Swal.fire(
      'error',
      `esta orden de compra no existe`,
      'error'
    )
    )
  }

  return {...snapshot.data(),id: snapshot.id};
}

