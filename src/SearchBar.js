import React, { useState, useEffect } from "react";
import "./App.css";
import {  Form} from "semantic-ui-react";
const SearchForm = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [reposUrl, setReposUrl] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userInput, setUserInput] = useState("");
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



  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="search">
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <input placeholder="GitHub Name" onChange={handleSearch} />
        </Form.Field>
        <Form.Button content="Search" />
      </Form>
    </div>
  );
};

export default SearchForm;
