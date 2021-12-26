import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { createStructuredSelector } from 'reselect';

import { GlobalStyle } from './global.styles';

import Spinner from './components/spinner/spinner.component';
import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUp = lazy(() => import('./pages/sign-in-and-sign-out/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

class App extends React.Component {

  unsubscribeFromAuth = null;

  // remove the setState and replace it with the stored value as props
  componentDidMount() {
    const {setCurrentUser} = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth) ;
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <GlobalStyle />
        <Header />
        <Switch>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/signin' render={() => this.props.currentUser ? ( <Redirect to='/' /> ) : ( <SignInAndSignUp /> ) } />
          </Suspense>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user =>dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
