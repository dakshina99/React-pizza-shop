import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = (state) => {
  return ({
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
  });
};

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (firstName, lastName, telNum, email, contact, sel, feedback) => dispatch(postFeedback(firstName, lastName, telNum, email, contact, sel, feedback))
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

  }

  render() {

    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]} 
          leadersLoading={this.props.leaders.isLoading} 
          leadersErrMess={this.props.leaders.errMess} 
        />
      );
    }

    const MenuPage = () => {
      return (
        <Menu dishes={this.props.dishes} />
      );
    }

    const AboutPage = () => {
      return (
        <About leaders={this.props.leaders} />
      );

    }

    const DishWithId = ({ match }) => {
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishID, 10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishID, 10))}
          CommentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      );
    }

    const ContactPage = () =>{
      return(
        <Contact
          resetFeedbackForm={this.props.resetFeedbackForm} 
          postFeedback={this.props.postFeedback}
        />
      );
    }

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch location={this.props.location}>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={MenuPage} />
              <Route path='/menu/:dishID' component={DishWithId} />
              <Route exact path='/contactus' component={ContactPage} />
              <Route exact path='/aboutus' component={AboutPage} />
              <Redirect to='/home' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>

        {/* <Menu dishes={this.props.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}/> */}
        {/* <Dishdetail selectedDish={this.props.dishes.filter((dish)=> dish.id === this.props.selectedDish)[0]}/> */}
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));