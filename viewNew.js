import Data from "./data.js"

import ViewHome from "./viewHome.js"

export default class Create{

    constructor(){
          

        this.view()

      
        this.book=

            {    
                id: this.randomId(),
                Autor: "",
                Title: "",
                Gendre: "",
                Year:"",
            }
        

        this.send=document.querySelector(".send")

        this.send.addEventListener("click", this.createBook)

        this.box=document.querySelector(".box")

        this.box.addEventListener("input", this.handleChange )

       

    }


    view= () =>{

        let container= document.querySelector(".container")

        container.innerHTML=`
        
        
        <h1>New car</h1>

        <div class="box" >

           

             <div class="input">
             <label for="marca">Author</label>
             <input type="text" class="autor">
         </div>
 
            <div class="input">
                <label for="marca">Title</label>
                <input type="text" class="title">
            </div>
    
    
            <div class="input">
                <label for="marca">Gendre</label>
                <input type="text" class="gendre">
            </div>
    
            <div class="input">
                <label for="marca">Year</label>
                <input type="text" class="year">
            </div>


            <button class="send">Send</button>
        </div>
        
        `
    }


     handleChange = (e) =>{
          
       let obj= e.target



       if(obj.classList.contains("title")){

          this.book.Title= obj.value;
       }else if(obj.classList.contains("autor")){
           this.book.Autor=obj.value
           
       }else if(obj.classList.contains("gendre")){
           this.book.Gendre=obj.value;
       }else if(obj.classList.contains("year")){
           this.book.Year=obj.value;
       }else if(obj.classList.contains("id")){
           this.book.id=obj.value
       }
        
        

    }

    createBook= async ()=>{

        try{

            let data= new Data;

            let Nbook= await data.createBook(this.book)

         
          
        location.reload();

            

        }catch{

        }
    }


    randomId=()=>{

       
       
        let id=Math.floor(Math.random()*100)+1;
        return id;
    }


   
}