import Data from "./data.js"

export default class update{

    constructor(obj){
        
        this.newObj= obj
        console.log(this.newObj)

        this.vieUpdate()


        this.box=document.querySelector(".box")

        this.box.addEventListener("input", this.handleChange )

        this.send= document.querySelector(".send")

        this.send.addEventListener("click", this.updateBook)


        

    }


    vieUpdate= ()=>{

      let container=document.querySelector(".container")


      container.innerHTML=`
      
      <h1>Update</h1>

   

    <div class="box">

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

      
      
      
      `

    }

    
    handleChange = (e) =>{
          
        let obj= e.target
 
 
 
        if(obj.classList.contains("title")){
           this.newObj.Title= obj.value;

        }else if(obj.classList.contains("autor")){

           
            this.newObj.Autor=obj.value
            
        }else if(obj.classList.contains("gendre")){
            console.log("aici")
            this.newObj.Gendre=obj.value;
        }else if(obj.classList.contains("year")){
            this.newObj.Year=obj.value;    
        
        }   
         
 
     }



    updateBook = async () =>{
        
        let data= new Data();

        let updatedBook= await data.updateBook(this.newObj)

        console.log(updatedBook)


        location.reload();

    }
}