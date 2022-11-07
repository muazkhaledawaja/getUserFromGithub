import React, { useState, useEffect } from "react";
import "./App.css";
import { List,Card, Icon, Image } from "semantic-ui-react";
const UserDetails = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [reposUrl, setReposUrl] = useState("");
  const [avatar, setAvatar] = useState("");
 
  const [error, setError] = useState(null);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  useEffect(() => {
    fetch(reposUrl)
      .then((res) => res.json())
      .then((repoData) => {
        console.log(repoData);
        setRepoData(repoData);
      });
  }, [modal]);


  const fetchRepoData = () => {
    fetch(reposUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setRepoData(data);
        }
      });
  };

  const setData = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url,
    repos_url,
  }) => {
    setName(name);
    setUserName(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setReposUrl(repos_url);
  };
  const [repoData, setRepoData] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
    fetchRepoData();
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="card">
      <Card>
        <Image src={avatar} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Header>{userName}</Card.Header>
        </Card.Content>
        <Card.Content>
          <a>
            <Icon name="user" />
            {followers} Followers
          </a>
        </Card.Content>

        <Card.Content>
          <a>
            <Icon name="user" />
            {reposUrl}
          </a>
        </Card.Content>

        <Card.Content>
          <a>
            <Icon name="user" />
            {following} Following
          </a>
        </Card.Content>

        <Card.Content id="test">
          <button onClick={toggleModal} className="btn-modal">
            <a>
              <Icon name="code" />
              {repos} Repos
            </a>
          </button>

          {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <h2>{repos} Repos</h2>

                <List divided className="Details" relaxed>
                  {repoData &&
                    repoData.map((el) => {
                      console.log(el.name);
                    })}
                  <List.Item>
                    <List.Icon
                      name="github"
                      size="large"
                      verticalAlign="middle"
                    />
                    <List.Content>
                      <List.Header as="a">repositorie name: {}</List.Header>
                      <List.Description as="a">
                        Updated 1 mins ago
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </List>
                <button className="close-modal" onClick={toggleModal}>
                  CLOSE
                </button>
              </div>
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default UserDetails;
