import React, { Component, PropTypes } from 'react';
import HeaderTitle from './header_title';
import CatalogItem from './catalog_item';
import { products as catalogProducts } from '../../data/catalog';
import { connect } from 'react-redux';
import { saveProducts } from '../../modules/catalog';
import { addToCart } from '../../modules/cart';
import { goToCart } from '../../modules/route';

class Catalog extends Component{
    constructor(props){
        super(props);
        this.handleAddToCar = this.handleAddToCar.bind(this);
    }
    componentDidMount(){
        setTimeout(() => {
            this.props.saveProducts(catalogProducts)
        }, 500);
    }
    handleAddToCar(product){
        this.props.addToCart(product);
        this.props.goToCart();
    }
    render(){
        const items = this.props.products.map( p => (
            <CatalogItem onAddToCart={ this.handleAddToCar } product={ p } key={ p.id }/>
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
    saveProducts: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    goToCart: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    products : state.catalog
})

const mapDispatchToProps = {
    saveProducts,
    addToCart,
    goToCart
}
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);