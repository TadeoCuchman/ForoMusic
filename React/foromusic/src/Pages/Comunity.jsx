import React from 'react';
import ListOfUsers from '../Components/ListOfUsers'

const Comunity = () => {
    return (
           <main>
               lista de usuarios, solo vista por usuarios.
               <div>
                   <ListOfUsers />
               </div>

               vista de nuevos comentarios, solo vista por usuarios.
           </main>
        );
}

export default Comunity;