export default async function FetchMS(searchkey){
url="http://www.omdbapi.com/?apikey=4ac1a9b8&s="+searchkey;

const response=await fetch(url)
        if (response)
{ 
    const data=await response.json()
        
        let items= data.Search.map((item)=>{
            
            return {
                imageLink:item.Poster,
                title:item.Title,
                category:item.Type,
                id:item.imdbID
            };
        })
        return items}
        else{
            console.log('no data')
        }

}

export const MSdata= async (imbdID)=>{
   

   let url= "http://www.omdbapi.com/?apikey=4ac1a9b8&i="+imbdID
  
  try{ const response=await fetch(url)
    const data=await response.json()
  
    return data}
    catch{(error)=>{
        console.log(error)
    }}

}