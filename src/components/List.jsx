import Details from "./Details";
import axios from "axios";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useEffect, useState } from "react";

const List = () => {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/users.json`
      );

      setUsers(data);
    })();
  }, []);

  const openDetails = (e, user) => {
    setActiveUser(user);
  };

  const usersList = users.map((user) => {
    const { id, name } = user;

    let isActive = false;

    if (!!activeUser) {
      isActive = activeUser.id === id ? true : false;
    }

    return (
      <ListGroupItem
        key={id}
        active={isActive}
        onClick={(e) => openDetails(e, user)}
      >
        {name}
      </ListGroupItem>
    );
  });

  const detailedInformation = !!activeUser ? (
    <Details info={activeUser} />
  ) : null;

  return (
    <div className="list-wrapper">
      <ListGroup>{usersList}</ListGroup>
      {detailedInformation}
    </div>
  );
};

export default List;
