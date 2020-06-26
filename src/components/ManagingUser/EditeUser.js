import { connect } from "react-redux";
import { editeUserFromApi } from "../../actions/userActions";
import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ModalEdite = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [passWord, setUserPass] = useState();
  const [userName, setUserName] = useState();
  const [userMail, setUserMail] = useState();
  const [userPhone, setUserPhone] = useState();
  const [userPost, setUserPost] = useState();

  const send = () => {
    let obj = {
      id: props.el.id,
      firstName: firstName,
      lastName: lastName,
      passWord: passWord,
      userName: userName,
      userMail: userMail,
      userPhone: userPhone,
      userPost: userPost,
    };

    props.edite(obj);
    console.log(obj);
    // toggle();
  };

  const externalCloseBtn = (
    <button
      className="close"
      style={{ position: "absolute", top: "15px", right: "15px" }}
      onClick={toggle}
    >
      &times;
    </button>
  );
  return (
    <div>
      <Button onClick={toggle}>
        {buttonLabel} Editer
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        external={externalCloseBtn}
      >
        <ModalHeader>Modifier l'utilisateur</ModalHeader>
        <ModalBody>
          <form className="modaledit">
            <div>
              <span>Prénom : </span>
            </div>
            <div>
              <input
                type="text"
                placeholder="Entrer le prénom d'utilisateur"
                required
                defaultValue={props.el.firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <span>Nom</span>
            </div>
            <div>
              <input
                type="text"
                placeholder="Entrer le prénom d'utilisateur"
                required
                defaultValue={props.el.lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <span>Mot de passe</span>
            </div>
            <div>
              <input
                type="password"
                placeholder="Entrer le mot de passe"
                minLength="8"
                required
                defaultValue={props.el.passWord}
                onChange={(e) => setUserPass(e.target.value)}
              />
            </div>
            <div>
              <span>Pseudo</span>
            </div>
            <div>
              <input
                type="text"
                placeholder="Entrer le pseudo d'utilisateur"
                required
                defaultValue={props.el.userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <span>Mail</span>
            </div>
            <div>
              <input
                type="text"
                placeholder="Entrer le mail "
                required
                defaultValue={props.el.userMail}
                onChange={(e) => setUserMail(e.target.value)}
              />
            </div>
            <div>
              <span>Numéro de téléphone</span>
            </div>
            <div>
              <input
                type="phone"
                placeholder="Entrer le numero de téléphone"
                minLength="8"
                required
                defaultValue={props.el.userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
              />
            </div>
            <div>
              <span>Type d'utilisateur</span>
            </div>
            <div>
              <input
                type="text"
                placeholder="Role d'utilisateur"
                required
                defaultValue={props.el.userPost}
                onChange={(e) => setUserPost(e.target.value)}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Annuler
          </Button>
          <Button color="primary" onClick={() => send()}>
            Envoyer
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  edite: (el) => dispatch(editeUserFromApi(el)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdite);
