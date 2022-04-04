import Data from "./data.js"

import Create from "./viewNew.js"

import Update from "./vieUpdate.js"

export default class ViewHome{

    constructor(){

        this.home()
        
        this.populateBooks()


       this.add = document.querySelector(".add")

      

      //  this.delete.addEventListener("click", this.deleteBook )

       
        

        this.add.addEventListener("click", this.createBook)

           
        this.box=document.querySelector(".container-books")

        this.box.addEventListener("click", this.updatePage)



      this.box.addEventListener("click", this.deleteBook)

      
      

        

      
        
    }


    home=()=>{

        let container=document.querySelector(".container")

        container.innerHTML=`
        
        
        <h1>Masini</h1>


         <table>
            <tr>
                <th>Id</th>
                <th>Author</th>
                <th>Gendre</th>
                <th>Title</th>
                <th>Year</th>
                <th>Del</th>
               
            </tr>
    
            <tbody class="container-books">
    
               
            </tbody>
    
            <tfoot>
                <tr>
                     
             </tr>
            </tfoot>
        </table>

         <button class="add">Adauga Masini</button>
        
        
        
        `
    }

    populateBooks= async()=>{

          let bookContainer= document.querySelector(".container-books")


        

          let text="";
           
         try{
            
           let data= new Data();

            let books =await data.books();





          books.forEach(book => {

            // console.log(book.Autor)

           

            text+=`
            <tr>  <td>${book.id}</td>
                  <td class="autor">${book.Autor}</td>
                  <td>${book.Gendre}</td>
                  <td>${book.Title}</td>
                  <td>${book.Year}</td>
                  <td>
                  <button class="del">Delete</button>
                  </td>
            </tr>
             
            `
              
          })
            bookContainer.innerHTML=text;



         }catch(e){


         }

         
    }


    createBook = () =>{

      new Create()
    }


    updatePage= async(e) => {

      let obj=e.target

      if(obj.classList.contains("autor")){



             let id= obj.parentNode.children[0].textContent


             let api = new Data();
             let book = await api.getBookById(id);



             new Update(book);
            

        
      }
    
    }



    deleteBook= async(e)=>{


       let obj= e.target

       if(obj.classList.contains("del")){

           let id=obj.parentNode.parentNode.children[0].textContent

           let data= new Data()

           let book= await data.getBookById(id)

           

           let delBook= await data.deleteBook(book)

           location.reload()
       }
    }

}