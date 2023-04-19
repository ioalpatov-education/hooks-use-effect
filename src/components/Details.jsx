import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, ListGroup, ListGroupItem, Spinner } from "react-bootstrap";

const Details = ({ info }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/${info.id}.json`
      );

      setUser(data);
      setLoading(false);
    })();
  }, [info]);

  const userInfo = !!user ? (
    <Card>
      <Card.Img variant="top" src={user.avatar} />
      <ListGroup>
        <ListGroupItem>
          <Card.Title>{user.name}</Card.Title>
        </ListGroupItem>
        <ListGroupItem>City: {user.details.city}</ListGroupItem>
        <ListGroupItem>Company: {user.details.company}</ListGroupItem>
        <ListGroupItem>Position: {user.details.position}</ListGroupItem>
      </ListGroup>
    </Card>
  ) : null;

  const infoWithLoading = !loading ? userInfo : <Spinner />;

  return <>{infoWithLoading}</>;
};

Details.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default Details;
