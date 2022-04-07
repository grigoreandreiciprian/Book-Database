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

        this.filter=document.querySelector(".filter")

        this.filter.addEventListener("change",this.filterBooks)

        this.filter.addEventListener("change", this.filterYear)


        this.search=document.querySelector(".search")

        this.search.addEventListener("input", this.searchFunction)


        this.inputVal= document.querySelector(".by")

        this.inputVal.addEventListener("input", this.selectVal)

        this.optionVal='Title';


      

      
      

        

      
        
    }


    home=()=>{

        let container=document.querySelector(".container")

        container.innerHTML=`
        
        
        <h1>Masini</h1>


        <div class="searchBox">
            <div class="labels">
                <label for="search">Search By</label>
                <select class="by">
                    <option class="Title">Title</option>
                    <option class="Autor">Author</option>
                    <option class="Year">Year</option>
                    <option class="Gendre">Gendre</option>
                </select>
            </div>
            
            <input type="text" class="search">
        </div>
    
    
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
          
    
       <div class="buttons">
    
        <button class="add">Add Books</button>
    
        <label for="filter">Sort</label>
         
        <select class="filter">
    
            <option class="alpha">Sort Alphabeticly</option>
        </select>
        
       </div>
    
        
        
       
       
       
        
        

        
        
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


    filterBooks= async(e)=>{

      console.log(this.filter.value)


      if(this.filter.value == "Alphabeticly"){



        let data=new Data;
  
         let filterData= await data.filterBook()

         this.createPage(filterData)

        
      }
      
    }

    filterYear= async(e)=>{

      if(this.filter.value == "Year"){



        let data=new Data;

        
  
         let filterData = await data.filterYear()

         this.createPage(filterData)


        
      }
      

    }


    
    searchFunction= async (e) =>{
           
         let searchString= this.search.value;

         let val= this.optionVal;

         console.log(val)

         searchString= searchString.toLowerCase();

         let data=new Data();

         let books= await data.books();

         let newData=[]

         if(searchString){


            for(e of books){
              
              if(val == "Title"){

                let title= e.Title.toLowerCase()
              
                if(title.includes(searchString)){
  
                  newData.push(e)
                }
                
              }else if( val == "Author"){



                let title= e.Autor.toLowerCase()
              
                if(title.includes(searchString)){
  
                  newData.push(e)
                }

              }else if( val == "Gendre"){
                    

                let title= e.Gendre.toLowerCase()
              
                if(title.includes(searchString)){
  
                  newData.push(e)
                }


              }else if( val == "Year"){

                let title= `${e.Year}`

                console.log(title)
              
                if(title.includes(searchString)){
  
                  newData.push(e)
                }
               
              }
            }

            this.createPage(newData)
         }else{

          this.populateBooks()
         }
         
    }




    createPage= (obj) =>{

      let bookContainer= document.querySelector(".container-books")

      bookContainer.innerHTML=``

         let text="";


         obj.forEach(book => {      

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

           bookContainer.innerHTML=text;
             
         })

    }


    selectVal= (e) =>{

       this.optionVal=this.inputVal.value

       
    }


    





}