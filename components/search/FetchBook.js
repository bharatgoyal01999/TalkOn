export default async function FetchBooks (search_key){
const Url='https://www.googleapis.com/books/v1/volumes?q='+search_key

const response=await fetch(Url)
if (response)
{const books_data=await response.json()
    let book_items= books_data.items.map((item)=>{
          
        return {
            imageLink:item.volumeInfo.imageLinks.thumbnail,
            title:item.volumeInfo.title,
            category:'book',
            id:item.id
        };
    })

    return book_items}

   
}

export async function BookData(id){

const url='https://www.googleapis.com/books/v1/volumes/'+id
const response= await fetch(url)
if(response){
const data=await response.json()
const book_obj={
    Publisher:data.volumeInfo.publisher,
    Author:data.volumeInfo.authors,
    Title:data.volumeInfo.title,
    Year:data.volumeInfo.publishedDate,
    Plot:data.volumeInfo.description,
    Subtitle:data.volumeInfo.subtitle,
    Poster:data.volumeInfo.imageLinks.thumbnail,
    Genre:data.volumeInfo.categories,
    Rattings:data.volumeInfo.averageRating,
    PageCount:data.volumeInfo.pageCount,
    Language:data.volumeInfo.language,
    imdbID:data.id,
    Type:'book'


}
Object.keys(book_obj).forEach((item)=>{

    if (!book_obj[item]){
        console.log('hiiiiiiiiiiiiiiiiiii')
        book_obj[item]='N/A'
    }
    console.log(book_obj)
})
console.log(book_obj)

return book_obj
}
}