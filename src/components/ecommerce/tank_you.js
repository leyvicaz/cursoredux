import React, { PropTypes } from 'react';
import HeaderTitle from './header_title';

const TankYou = ({ orderDetails, onBackToShopping  }) => (
    <div className="thank-you">
        <HeaderTitle text="¡Gracias por tu compra XX " />
        <p>Te llegará en breve a tu dirección { orderDetails.address }</p>
        <p><button className="button" onClick={ onBackToShopping } >Volver a la tienda</button></p>
    </div>
);

TankYou.propTypes = {
    orderDetails: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired
    }),
    onBackToShopping: PropTypes.func.isRequired
};

export default TankYou;