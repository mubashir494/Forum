import React from "react";
const Pagination = ({ totalDocument, postperPage, increase }) => {
    let page = []
    for (let i = 1; i <= Math.ceil(totalDocument / postperPage); i++) {
        page.push(i)
    }



    return (
        <nav style={{marginTop : "20px",cursor : "pointer", display : "flow-root"}}>
            <ul className='pagination pagination-lg justify-content-center' >
                {page.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => increase(number)} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Pagination;