import React, { Component, PropTypes } from 'react';
import HeaderTitle from './header_title';
import CatalogItem from './catalog_item';
class Catalog extends Component{

    render(){
        const items = this.props.products.map( p => (
            <CatalogItem onAddToCart={ this.props.onAddToCart } product={ p } key={ p.id }/>
        ));


        return(
            <div className="catalog">
                <HeaderTitle text="Productos" />
                <div className="catalog-list">
                    { items }
                </div>
            </div>
        )
    }
}

Catalog.propTypes = {
    products: PropTypes.array.isRequired,
    onAddToCart: PropTypes.func.isRequired
};
export default Catalog;