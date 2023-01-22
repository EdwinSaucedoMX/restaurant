
const Card = (params) =>{
    return(
        
        <div className="App-card">
            <picture>
                <h3>{params.title}</h3>
                <img src={params.img} alt={params.title}/>
                <p>{params.text}</p>
            </picture>
        </div>
    );
}

export default Card;