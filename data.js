
export default class Data{


    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = "http://localhost:3000"+path;


        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode:"cors"

        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
            const encodedCredentials = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options);
    }



async books(){
    
   const response= await this.api('/books','GET');
   
    const data = await response.json();

    return data;
    
}


async createBook(book){
    const create= await this.api('/books/add','POST',book);

    

    return create.json();
}

async updateBook(book){
    
    const update=await this.api(`/books/uptate/${book.id}`, 'PUT',book)

    return update.json();
}



async getBookById(id){

    const book= await this.api(`/books/${id}`, 'GET');

    
    return book.json();
}

async deleteBook(book){

    const del= await this.api(`/books/delete/${book.id}`, 'DELETE',book)

    return del.json();
}


async filterBook(){

    const filter= await this.api(`/books/filter`, 'PUT')

    return filter.json();
}

async filterYear(){

    const filter= await this.api(`/books/year`, 'PUT')

    return filter.json()
}
}







