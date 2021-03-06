import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Sides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapped: null,
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'MOUNT_NAV',
      value: 'Sides'
    })
  }
  addToCart(tableName, name, price) {
    this.props.dispatch({
      type:'ADD_TO_CART',
      cartObj: {
        tableName,
        name,
        price
      }
    })
  }
  componentWillReceiveProps() {
    axios.get(process.env.REACT_APP_DEFAULT+'/getSides').then((res)=>{
      let mapped = res.data.map((key)=>{
        return (
          <container className='sides_container'>
            <div 
              className='sides' 
              id={key.table_name + '_' + key.id}>
            </div>
            <div className='info_sides_container'>
              <div>{key.name}</div>
              <div>${key.price}</div>
            </div>
            <div className='add_to_cart'> 
              <div onClick={(e)=>this.addToCart(key.table_name, key.name, key.price)} className='shopping_cart_icon'/>
            </div>
          </container>
        )      
      })
      this.setState({
        mapped: mapped
      })
    })
  }
  render() {
    return (
      <div className='food'>
        {this.state.mapped}
      </div>    
    )
  }
}

export default connect()(Sides)