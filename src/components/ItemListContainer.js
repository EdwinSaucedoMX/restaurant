import Card from './Card';

const imgDefault = "https://via.placeholder.com/150";

const ItemListContainer = ({title}) =>{
    return(
        <div className="App-container">
            <h1>{title}</h1>
            <div className="item-list-container">
            <Card title="Card 1" img={imgDefault} text="This is card 1"/>
            <Card title="Card 2" img={imgDefault} text="This is card 2"/>
            <Card title="Card 3" img={imgDefault} text="This is card 3"/>
            <Card title="Card 4" img={imgDefault} text="This is card 4"/>
            <Card title="Card 5" img={imgDefault} text="This is card 5"/>
            <Card title="Card 6" img={imgDefault} text="This is card 6"/>
            <Card title="Card 7" img={imgDefault} text="This is card 7"/>
            <Card title="Card 8" img={imgDefault} text="This is card 8"/>
            <Card title="Card 9" img={imgDefault} text="This is card 9"/>
            <Card title="Card 10" img={imgDefault} text="This is card 10"/>
            
            </div>
        </div>
    );
}

export default ItemListContainer;