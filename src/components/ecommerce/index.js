import React, { Component, PropsTypes } from 'react';
import { products as catalogProducts } from '../../data/catalog';
import Catalog from './catalog';

class Ecommerce extends Component {
    constructor(){
        super();
        this.state = {
            page: 'catalog',
            products: catalogProducts
        }

        this.handleNavigator = this.handleNavigator.bind(this);
    }
    handleNavigator(newPage){
        this.setSatet({
            page: newPage
        })
    }
    getComponent(page){
        switch (page){
            case 'catalog':
                return <Catalog products={ this.state.products }/>
            case 'cart':
                break;
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