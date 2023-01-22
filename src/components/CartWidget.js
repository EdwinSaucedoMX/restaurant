import {useState} from 'react';

import {BsFillBagFill} from 'react-icons/bs';
import {BsBag} from 'react-icons/bs';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

const CartWidget = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        
            <Button variant='transparent' className='cart-widget' onClick={handleShow}>
                <BsFillBagFill role="button" className="nav-icon cart-icon"/>
                <h4 className="counter">0</h4>
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title as="h1">Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='cart empty'>
                        <BsBag className='cart-icon'/>
                        <h3>Cart is empty</h3>
                    </div>
                </Offcanvas.Body>
                
            </Offcanvas>
        </>
    );
}

export default CartWidget;