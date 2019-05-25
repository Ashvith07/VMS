import React, { PureComponent } from 'react';
import './toastMessage.css'

export class ToastMessage extends PureComponent {
 // message = 'Hee'

  state = {
    isActive: false,
  }

  // openSnackBar = (message = 'Something went wrong...') => {
  //   this.message = message;
  //   this.setState({ isActive: true }, () => {
  //     setTimeout(() => {
  //       this.setState({ isActive: false });
  //     }, 3000);
  //   });
  // }

  componentDidMount(){
    if(this.props.error){ 
      this.setState({ 
        isActive: true 
      }, () => {
        setTimeout(() => {
         this.setState({ isActive: false });
        }, 3000);
      });
    }
  }

  render() {
    const {errorType} = this.props
  //  const errorMessage = "Opps..!!! Something went Wrong..!!"
    
    
    const { isActive } = this.state;
    return (
      <div>
         <div className = {isActive ? ["snackbar", "show"].join(" ") : "snackbar"}>
        {/* <h1 style={{ color :"#fff"}}>Pranav</h1> */}
        {errorType}
      </div>
      </div>
     
    )
  }
}

export default ToastMessage