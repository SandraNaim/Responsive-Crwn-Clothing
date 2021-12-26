import React from "react";
import CustomButton from "../custom-button/custom-buttom.component";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { createStructuredSelector } from "reselect";
import CartItem from "../cart-item/cart-item.component";

import './cart-dropdown.styles.scss';
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

const CartDropdown = ({ cartItems, history, dispatch }) => (   //since dispatch is already in the ...otherProps, so no need to create a function for it, call it directly
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {
        cartItems.length ?
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
        :
        <span className="empty-message">You're cart is empty</span>
      }
    </div>
    <CustomButton 
      onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden())
    }}>
        GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));