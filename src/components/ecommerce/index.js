import React, { Component, PropsTypes } from 'react';
import { products as catalogProducts } from '../../data/catalog';
import Catalog from './catalog';
import Cart from './cart';
import Checkout from './checkout';
import TankYou from './tank_you';

class Ecommerce extends Component {
    constructor(){
        super();
        this.state = {
            page: 'catalog',
            products: catalogProducts,
            cart: [],
            orderdeatils:{
            },
            orderErrors: {
            }
        }

        this.handleNavigator = this.handleNavigator.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
    }
    //Añadir producto al carrito
    handleAddToCart(product){
        let carItems = this.state.cart;
        //Uso la función find para determinar si el producto ya está en el carrito, si no ose encuentra
        //find retorna un "undefined"
        let existingProduct = carItems.find( p => p.id === product.id);
        if(existingProduct){
            //Si existe el producto se realiza un recorrido de todos los items y al producto que coincida
            //Solo se le suma una unidad en Quantity
            carItems = carItems.map(p => {
                if(p.id == product.id){
                    p.qty = p.qty + 1;
                }
                return p;
            });
        }else{
            //Si no existe se crea un nuevo objeto con la estructura básica mas la nueva propiedad qty
            //Para ello usamos la función Object.assign
            const newProduct = Object.assign({}, product, { qty : 1});
            //Concatenamos los dos objetos
            carItems = carItems.concat([newProduct]);
        }

        //Actualizamos el state para forzar un render y además navegamos al carrito
        this.setState({
            cart: carItems,
            page: 'cart'
        });
    }

    handleChangeQuantity(product, qty){
        const cartItems = this.state.cart.map( p => {
            if(p.id === product.id){
                p.qty = qty;
            }
            return p;
        })
            .filter( p => p.qty > 0);

        this.setState({
            cart: cartItems
        })
    }

    handleCheckout(details){
        let errors = {};
        //Verificar
        if(details.firstName === ''){
            errors.firstName = 'El nombre es obligatorio';
        }
        if(details.lastName === ''){
            errors.lastName = 'El apellido es obligatorio';
        }
        if(details.email === ''){
            errors.email = 'El email es obligatorio';
        }
        if(details.address === ''){
            errors.address = 'La dirección es obligatorio';
        }

        if(Object.keys(errors).length > 0){
            //establecer errores
            this.setState({
                orderErrors: errors
            });
        }else{
            //navegar a pagina de agradecimiento
            this.setState({
                orderdeatils: details,
                cart: [],
                page: 'thank-you'
            })
        }
    }

    //cambiar de página
    handleNavigator(newPage){
        this.setState({
            page: newPage
        })
    }
    getComponent(page){
        switch (page){
            case 'catalog':
                return <Catalog
                    onAddToCart={ this.handleAddToCart }
                    products={ this.state.products } />;
            case 'cart':
                return <Cart
                    onNavigate={ this.handleNavigator }
                    onChangeQuantity={ this.handleChangeQuantity }
                    products={ this.state.cart } />;
            case 'checkout' :
                return <Checkout errors={ this.state. orderErrors }
                                 onProcessOrder={ this.handleCheckout }
                                 onBackToCart={ () => this.handleNavigator('cart') }
                />;
            case 'thank-you':
                return <TankYou onBackToShopping={ () => this.handleNavigator('catalog') } orderDetails={ this.state.orderdeatils }/>;
            default:
                return null;
        }
    }
    render(){
        const component = this.getComponent(this.state.page);
        return(
            <div className="shopping-cart">
                { component }
            </div>
        )
    }
}

export  default Ecommerce;