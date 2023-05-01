import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  let navigateTo = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigateTo(-1);
    }, 3000);
  }, [navigateTo]);

  return (
    <div class="container_404">
      <h1 class="titulo">Error 404 - Página no encontrada</h1>
      <p class="text">Lo siento, la página que estás buscando no existe o ha sido eliminada.</p>
      <small class="text">Serás redirigido a la homepage en breve.</small>
    </div>
   
  );
}

export default NotFoundPage;
