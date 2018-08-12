import React from 'react';
import PropTypes from 'prop-types';
import Table from '@components/Table';
import { api } from '@helpers/ApiLibrary';
import constants from '@constants';
import './Products.css';

// import data from '@src/data/products';

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  componentDidMount() {
    const request = {
      url: '/products',
      method: 'get'
    };
    api
      .request(request)
      .then(response => {
        const { data } = response;
        if (data) {
          const { products } = data;
          this.setState({
            products
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    let { products } = this.state;
    return (
      <div className='product-wrapper'>
        <Table data={products} columnNames={constants.PRODUCT_TABLE_COLUMNS} rowKey={constants.PRODUCT_TABLE_ROW_ID} />
      </div>
    );
  }
}

Products.propTypes = {
  toggleModal: PropTypes.func
};
