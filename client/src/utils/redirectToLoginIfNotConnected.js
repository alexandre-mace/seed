import {authentication} from "../services/authentication";

export default function redirectToLoginIfNotConnected(props) {
  if (!authentication.currentUserValue) {
    // not logged in so redirect to login page with the return url
    props.history.push(`/se-connecter`);
  }
}
