   
   
  frm=document.querySelector("form");
  btnValider=document.getElementById("btnValider");
  btnEditer=document.getElementById("btnEditer");

  frm.classList.add("hide");
  table=document.querySelector("table");

  const users=[
      {id:0,nom:'Anna',profil:'Admin'},
        
  ];
  

// --------------------------------------------------------------------------
    // Premet d'afficher la Liste des utilisateur dans le tableau
    function getUsers(){
        users.forEach(element=> {
            document.querySelector('tbody').innerHTML +=
            `
            <tr>
            <th scope="row">${element.id}</th>
            <td>${element.nom}</td>
            <td>${element.profil}</td>
            <td>
              <button style="color: rgb(255, 255, 255);border: none;" class="bg-danger" onclick="deleteUser(${element.id})"><i class="fa-solid fa-trash"></i></button>
              <button style="color: rgb(255, 255, 255);border: none;" class="bg-success" onclick="editUser(${element.id})"><i class="fa-solid fa-pen-to-square"></i> </button>
            </td>
          </tr>
         
            `
        })
    }
    getUsers();

    // --------------------------------------------------------------------------


    // Afficher le formulaire existant
    function showFrmAddUser(){
      frm.classList.remove("hide");
      table.classList.add("hide");
      btnValider.classList.remove("hide");
      btnEditer.classList.add("hide");
      viderform();
    }


    function viderform(){
      document.getElementById("nom").value="";
      document.getElementById("profil").value="";
    }

    // --------------------------------------------------------------------------


    // Afficher la Liste (table) existante
    function showList(){
      frm.classList.add("hide");
      table.classList.remove("hide");
    }



    // --------------------------------------------------------------------------



    // Ajouter un nouveau utilisateur
    function addUser(){
      // permet de bloquer la l'actualisation d'une pâge
      event.preventDefault();
      // calcule du nouveau ID

     newUser= {id:0, nom:"", profil:""},
     id=users[users.length-1].id + 1;

      // recuperatio de valeur Saisie
      
      nom=document.getElementById("nom").value;
      profil=document.getElementById("profil").value;

      // mise a Jour des nouveau valeurs Saisies 

      newUser.id=id;
      newUser.nom=nom;
      newUser.profil=profil;
      // pour chaque utilisateur se trouvant dans le tablreau utilisateur
      const indexUser=users.findIndex(user=> user.nom===newUser.nom)

      if (!nom || !profil){
        alert('le nom et le profil son obligatoire')
      } else{

          // Si l'utilisateur existe sur le tabeau 
      if(indexUser != -1){
        console.log(indexUser);
        showMessage(`Erreur: impossible d'ajouter deux utilisateur de meme nom`);
        }
      // si l'utilisateur n'existe pas sur tableau
       else
        {
          // Ajout 
          users.push(newUser);
          // Vider le taleau
          document.querySelector("tbody").innerHTML = "";
          // Permuter Vers La Liste
          getUsers();
          showMessage(`L'utilisateur ${newUser.nom} a ete Ajoute avec succee`, "success");
          viderform();
        }
        // masquer le formulaire
        showList();

      }

      }



      // --------------------------------------------------------------------------

      // Creation de message
      function showMessage(message, type="danger")
      {
          if(!type || type=="danger"){
            document.getElementById("message").innerHTML=message;
            document.getElementById("message").classList.add("alert", "alert-danger");
          }
          if(type =="success")
          {
            document.getElementById("message").innerHTML=message;
            if(document.getElementById("message").classList.contains("alert-danger")){
              document.getElementById("message").classList.remove("alert-danger")
            }
            document.getElementById("message").classList.add("alert", "alert-success");
          }
      }


      // --------------------------------------------------------------------------

      
      // Suprimer un utilisateur
      function deleteUser(idUser)
      {
        userObject={};
        stopBoucle=true;
        // recuperer L'utilisateur dans le tableau
        if (stopBoucle) {
          // pour chaque element se trouvant dans le tableau users
          users.forEach(element=>{
              if (element.id==idUser) {
                userObject=element;
                stopBoucle=false;
              } 
          });
        }
        // recuperer la position de l'utilisateur dans le tableau 
        const positionUsers=users.findIndex(user=> user.id===userObject.id)
        if (positionUsers!=0) {
          users.splice(positionUsers, 1);
          document.querySelector("tbody").innerHTML = "";
          getUsers();
          alert('voulez vous suprimer cette utilisateur !', showMessage(`L'utilisateur ${userObject.nom} a ete Suprimer avec succee `, "danger"));
        }else{
          alert("impossible d'effectuer une suppression")
        }
        
      }


      // --------------------------------------------------------------------------



      // edit User
      useModifier={};
      function editUser(idUser)
      {
        frm.classList.remove("hide");// Afficher le formulaire
        table.classList.add("hide");// Masquer la Liste
        btnValider.classList.add("hide");
        btnEditer.classList.remove("hide");
        
        userObject={};
        stopBoucle=true;
        if (stopBoucle) {
          // pour chaque element se trouvant dans le tableau users
          users.forEach(element=>{
              if (element.id==idUser) {
                userObject=element;
                // A utiliser
                useModifier=element;
                stopBoucle=false;
              } 
          });
        }
        // recuperation des valeur a modifier
        document.getElementById("nom").value=userObject.nom
        document.getElementById("profil").value=userObject.profil
      }




      // --------------------------------------------------------------------------

      
      function updateUser()
      {
        event.preventDefault();
        // Recuperation de l'utilisateur dans le tableau
        const positionUser=users.findIndex(user=> user.id===useModifier.id)
        // changement des valeur se treaouvans dans le tableau 
        users[positionUser].nom=document.getElementById("nom").value;
        users[positionUser].profil=document.getElementById("profil").value;

        // Ajout 
        
          // Vider le taleau
          document.querySelector("tbody").innerHTML = "";
          showList();
          // Permuter Vers La Liste
          getUsers();
          showMessage(`L'utilisateur ${useModifier.nom} a ete Modifier avec succee `, "success");
         
          
         

      }

    
  
