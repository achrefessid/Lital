import React, { Component } from "react";
import { Container } from "reactstrap";
import BackComponent from "../components/BackComponent";
import { connect } from "react-redux";
import FormComponent from "../components/FormComponent";
import swal from "sweetalert";
import {
  deleteUser,
  postUserCreate,
  getUserDetail,
  putUserUpdate,
} from "../actions/productAction";

class EditUserContainer extends Component {
  componentDidMount() {
    this.props.getUserDetail(this.props.match.params.id);
  }

  handleSubmit(data) {
    this.props.putUserUpdate(
      data,
      this.props.match.params.id,
      this.props.currentUser
    );
    console.log("data", data, "id", this.props.match.params.id);
    console.log("currentUser", this.props.currentUser);
  }

  render() {
    if (this.props.getResponDataUser || this.props.errorResponDataUser) {
      if (this.props.errorResponDataUser) {
        swal("Echec!", this.props.errorResponDataUser, "error");
      } else {
        swal(
          "Produit à jour!","",
          // "Année : " +
          //   this.props.getResponDataUser.annee +
          //   " , Saisson : " +
          //   this.props.getResponDataUser.saison,
          "success"
        );
      }
    }
    return (
      <Container>
        <BackComponent />
        <h1>Modifier le produit</h1>
        <FormComponent
          className="styleb"
          onSubmit={(data) => this.handleSubmit(data)}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    getResponDataUser: state.users.getResponDataUser,
    errorResponDataUser: state.users.errorResponDataUser,
  };
};

export default connect(mapStateToProps, {
  postUserCreate,
  putUserUpdate,
  deleteUser,
  getUserDetail,
})(EditUserContainer);
