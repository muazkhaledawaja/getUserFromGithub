import React, { useState, useEffect } from "react";
import "./App.css";
import { List, Form, Card, Icon, Image } from "semantic-ui-react";

function App() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [reposUrl, setReposUrl] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  const [repoName, setRepoName] = useState("");
  const [repoHttpUrl, setRepoHttpUrl] = useState("");
  const [repoPullUrl, setRepoPullUrl] = useState("");
  const [repoDescription, setRepoDescription] = useState("");
  const [repoLanguages, setRepoLanguages] = useState("");
  const [repoVisibility, setRepoVisibility] = useState("");
  const [repoDefaultBranch, setRepoDefaultBranch] = useState("");
  const [repoCloneUrl, setRepoCloneUrl] = useState("");
  const [repoOwner, setRepoOwner] = useState("");



  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then((res) => res.json())      
      .then((data) => {
        setData(data);
      });
  }, []);
  //repo effect
  useEffect(() => {
    fetch(reposUrl)
      .then((res) => res.json())
      .then((repoData) => {
        console.log(repoData);
        setRepoData(repoData);
      });
  }, [modal]);

  const handleSearch = (e) => {
    setUserInput(e.target.value || "example");
  };

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setData(data);
        }
      });
  };

  const fetchRepoData =  () => {
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
const [repoData,setRepoData] = useState([])
//  setRepoData = ({
//     full_name,
//     html_url,
//     pulls_url,
//     description,
//     language,
//     visibility,
//     default_branch,
//     clone_url,
//   }) => {
//     setRepoName(full_name);
//     setRepoHttpUrl(html_url);
//     setRepoPullUrl(pulls_url);
//     setRepoDescription(description);
//     setRepoLanguages(language);
//     setRepoVisibility(visibility);
//     setRepoDefaultBranch(default_branch);
// //     setRepoCloneUrl(clone_url);
//   };

  const toggleModal = () => {
    setModal(!modal);
    fetchRepoData()
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <div>
      <div className="navbar">GitHub Search</div>

      <div className="search">
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <input placeholder="GitHub Name" onChange={handleSearch} />
          </Form.Field>
          <Form.Button content="Search" />
        </Form>
      </div>
      {error ? (
        <h1>{error}</h1>
      ) : (
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
      {repoData && repoData.map((el)=>{
console.log(el.name)
      })}
                 <List.Item>
                 <List.Icon
                   name="github"
                   size="large"
                   verticalAlign="middle"
                 />
                 <List.Content>
                   <List.Header as="a">
                     repositorie name: {}
                   </List.Header>
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
      )}
    </div>
  );
}
//href=https://api.github.com/users/${userInput}/repos'
export default App;
