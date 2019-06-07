import React,{Component} from 'react'
import { Loader } from '../../../../components/loader';

import { compose } from 'redux';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../vmsStyles.css';
import { Link } from 'react-router-dom';
import { ToastMessage } from '../../../ToastMessage/ToastMessage';
import { GwlLogo } from '../../../../components/gwlLogo';
import { TextAreaField } from '../../../../components/textAreaField';
import { sendFeedback } from '../../actions';

class FeedbackForm extends Component{

  state={
    rating:'',
    suggestions:''
  }

  static getDerivedStateFromProps(props){
  
    const {error ,requesting,view} = props.visitor
    if(error && !requesting && view === "feedback"){
      props.history.push(`/`)
    }

    return null
  }

  handleRating(rating){
    this.setState({
      rating:rating
    })
  }

  handleSuggestions(e){
    this.setState({
      suggestions:e.target.value
    })
  }

  handleSubmit(){

    const { token  } = this.props.visitor
    const {rating,suggestions} = this.state
    this.props.sendFeedback(token,rating,suggestions)

  }

  handleError(error,errorType){
    return(
      <ToastMessage error={error}  errorType = {errorType}/>
    )
  }

  render(){

    const {suggestions} = this.state
    const {requesting,error,errorType} = this.props.visitor

    if(requesting){
      return    <div className={"midContentPanel"}><Loader /></div>
    }else{
      return(
        <div className="midContentPanel">
                    <GwlLogo />
                    <section className="formUi">
                        <label>How was your visit? </label>
                        <div>
                            <label className="smiley angry">
                                <div className="imageCheckbox">
                                    <input id="smiley-angry" name="purpose" type="radio" value="smileyAngry" onClick={() => this.handleRating("1")} />
                                    <label htmlFor="smiley-angry"></label>
                                </div>
                            </label>
                            <label className="smiley sad">
                                <div className="imageCheckbox">
                                    <input id="smiley-sad" name="purpose" type="radio" value="smileySad" onClick={() => this.handleRating("2") }/>
                                    <label htmlFor="smiley-sad"></label>
                                </div>
                            </label>
                            <label className="smiley avarage">
                                <div className="imageCheckbox">
                                    <input id="smiley-avarage" name="purpose" type="radio" value="smileyAvarage" onClick={() => this.handleRating("3")} />
                                    <label htmlFor="smiley-avarage"></label>
                                </div>
                            </label>
                            <label className="smiley happy">
                                <div className="imageCheckbox">
                                    <input id="smiley-happy" name="purpose" type="radio" value="smileyHappy" onClick={() => this.handleRating("4")}/>
                                    <label htmlFor="smiley-happy"></label>
                                </div>
                            </label>
                            <label className="smiley very-happy">
                                <div className="imageCheckbox">
                                    <input id="smiley-very-happy" name="purpose" type="radio" value="smileyVeryHappy" onClick={() => this.handleRating("5")} />
                                    <label htmlFor="smiley-very-happy"></label>
                                </div>
                            </label>
                        </div>
                        <TextAreaField 
                        fieldTitle="Any suggestions for us? "
                        value={suggestions}
                        changeHandle={(e) => this.handleSuggestions(e)}
                        />
                        <Link onClick={() => this.handleSubmit()} to="/"><button className="btn-green full">Submit</button></ Link>
                    </section>

              <div style={{ height : "30px", lineHeight : "30px"}}>
                    {/* <span>{message}</span> */}
                    <span>{error ? this.handleError(error,errorType) :null}</span>
                     </div>       
                </div>
      )
    }

    
  }
}

FeedbackForm.propTypes = {
 // sendVisitPurpose: PropTypes.func.isRequired,
};

function mapStateToProps (state)  {

 
   return {
       visitor: state.visitor
   }
 }

 function mapDispatchToProps(dispatch) {
  return {
    sendFeedback : (token,rating,suggestions) => dispatch(sendFeedback(token,rating,suggestions))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FeedbackForm);
