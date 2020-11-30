import React from "react";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchState: "idle",
      msg: [],
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:5000/index")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            fetchState: 'success',
            msg: result.msg,
          });
        },
        (error) => {
          this.setState({
            fetchState: 'error'
          });
          console.log(error);
        }
      );
  }

  render() {
    console.log("hiiiiii");
    console.log(this.state.msg);

    return (
      <div className="container mt-4 w-75">
        <header className="app-header">
          {/* <img src={narmadaLogo} className="app-logo h-50 w-50 mb-1" alt="logo" /> */}

          <div className="jumbotron">
            <h3 className="display-4">Price Tracker</h3>
            <p className="lead">
              Start the workflow by clicking a link up top or selecting a
              product.
            </p>
            <hr className="my-4" />
            <p>Track Products, compare prices and more! </p>
          </div>
        </header>
      </div>
    );
  }
}
export default LandingPage;
