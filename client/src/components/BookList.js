import React from 'react'
import { gql, useQuery } from "@apollo/client"

const GET_BOOKS = gql`
{
    books{
        name
        genre
      }
}`

function BookList() {
    const { loading, error, data } = useQuery(GET_BOOKS);
    const renderList = () => {
        debugger;
            if (loading) {
                return (<p>loading....</p>)
            }else{
                return  data && data.books ? data.books.map((book) =>{
                    return(
                    <div>
                    <li>{book.name} : {book.genre} </li>
                    </div>)
                }) : ""
            }
        
    }
    
    return (
        <div>
            <ul id="booklist">
                <p>
                    Book list!!!
                </p>
                {renderList()}
                
            </ul>
        </div>
    )
}



export default BookList;
