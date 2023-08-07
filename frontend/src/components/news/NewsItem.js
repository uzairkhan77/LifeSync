import React from 'react'
import { Link } from 'react-router-dom'
const NewsItem = (props) => {

    // const newsCard = document.getElementById('card') 

    return (
        <div>
            <div id='card' className="card my-3" style={{color:props.mode==='dark'?'white':'black',backgroundColor:props.mode==='dark'?'grey':'white'}}><span className='position-absolute top-0 translate-middle badge rounded-pill bg-danger' style={{left:'50%',zIndex:'1'}}>{props.source}</span>
                <img src={props.imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title" >{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <p className="card-text"><small className='text-muted'>
                    {`by ${props.author} on ${new Date(props.date).toGMTString()}`}
                    </small></p>
                    <Link rel="noreferrer" to={props.newsUrl} target='_blank' className={`btn btn-sm btn-${props.mode==='light'?'dark':'success'}`}>Read More</Link>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
