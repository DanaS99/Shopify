import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
    const [searchParam, setSearchParam] = useState("");
    const [loading, setLoading] = useState(false);
    const [recipeList, setrecipeList] = useState([]);
    const [recipeDetailsData, setrecipeDetailsData] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true); 
        try {
            const res = await fetch(`https://dummyjson.com/products/search?q=${searchParam}`);
            const data = await res.json();

            if (data?.products?.length) {
                setrecipeList(data.products);
                setNotFound(false); 
                setSearchParam('');
                navigate('/'); 
            } else {
                setrecipeList([]); 
                setNotFound(true);
                setSearchParam('');
                setTimeout(() => setNotFound(false), 3000); 
            }

            setLoading(false); 
        } catch (e) {
            console.log(e);
            setLoading(false);
            setSearchParam('');
            setNotFound(true); 
            setTimeout(() => setNotFound(false), 3000); 
        }
    }

    return (
        <GlobalContext.Provider value={{ searchParam, loading, recipeList, setSearchParam, handleSubmit, recipeDetailsData, setrecipeDetailsData, notFound }}>
            {children}
        </GlobalContext.Provider>
    );
}

// import { createContext, useState } from 'react'
// import { useNavigate } from 'react-router-dom';

// export const GlobalContext = createContext(null)

// export default function GlobalState({ children }){
//     const [searchParam, setSearchParam] = useState("")
//     const [loading, setLoading] = useState(false);
//     const [recipeList, setrecipeList] = useState([]);
//     const [recipeDetailsData, setrecipeDetailsData] = useState(null)
//     const navigate = useNavigate()

//     async function handleSubmit(event) {
//         event.preventDefault()
//         try {
//             const res = await fetch(`https://dummyjson.com/products/search?q=${searchParam}`)
//             const data = await res.json()

//             if (data?.products) {
//                 setrecipeList(data?.products)
//                 setLoading(false)
//                 setSearchParam('')
//                 navigate('/')
//             }

//         } catch (e) {
//             console.log(e);
//             setLoading(false)
//                 setSearchParam('')
//         }
//     }

//    // console.log(loading, recipeList);

//     return (
//         <GlobalContext.Provider value={{ searchParam, loading, recipeList, setSearchParam, handleSubmit, recipeDetailsData, setrecipeDetailsData}}>
//             {children}
//         </GlobalContext.Provider>
//     )
// }