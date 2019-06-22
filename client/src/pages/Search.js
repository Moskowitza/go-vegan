import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import UserSearchResults from '../components/UserSearchResults';

// import sanctuaries from "../sanctuaries.json";
import API from '../utils/API';

class Search extends Component {
  state = {
    search: '',
    // searchState: '',
    sanctuaries: [],
    // results: [],
    // error: '',
    // add state user to save searches
    user: [],
  };

  // getSanctuaries and getUser, if logged in
  componentDidMount() {
    this.getUser();
    this.getSanctuaries();
  }

  getUser = () => {
    API.getUser().then(res => {
      this.setState({
        user: res.data,
      });
    });
  };

  getSanctuaries = () => {
    console.log('getting sanctuaries');
    API.getSanctuaries().then(res => {
      this.setState({
        sanctuaries: res.data,
      });
    });
  };

  // handle any changes to the input Fields: Search
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // If user is true we pass this to our onClick
  // API will send data to the backend
  saveSearch = data => {
    API.saveSearch({
      sanId: data.sanId,
      userId: data.userId,
    }).then(res => {
      console.log(res);
    });
  };

  render() {
    const { sanctuaries, search, user } = this.state;
    const filteredSanctuaries = sanctuaries.filter(
      sanctuary =>
        sanctuary.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );

    return (
      <div>
        <Container fluid={false} style={{ minHeight: '80%' }}>
          {user ? (
            <Row fluid>
              <div className="card m-4">
                <p className="card-body text-center">
                  You are currently logged in as {user.email}
                </p>
              </div>
            </Row>
          ) : (
            <Row fluid>
              <div className="card" style={{ margin: '10px' }}>
                <p className="card-body text-center">
                  Log in to save sanctuaries to your dashboard
                </p>
              </div>
            </Row>
          )}
          <Row>
            <div className="card w-100 h-50">
              <div className="card-body">
                <p className="text-center">
                  Search for a Sanctuary by NAME or STATE below
                </p>

                <SearchForm
                  className="form-control"
                  handleInputChange={this.handleInputChange}
                  search={search}
                />
              </div>
            </div>
          </Row>
          {/* <SearchState             
            handleInputChange={this.handleInputChange}
            searchState={this.state.searchState}
          /> */}
          <Row>
            <div className="card w-100 h-100">
              <div className="card-body">
                {user ? ( // if LOGGED IN
                  <div>
                    {filteredSanctuaries.map(sanctuary => (
                      <UserSearchResults
                        sanId={sanctuary.sanId}
                        key={sanctuary.sanId}
                        name={sanctuary.name}
                        website={sanctuary.animalWebsite}
                        logo={sanctuary.image}
                        // userId comes from state, not our filteredSanctuaries array
                        userId={user.userId}
                        save={() =>
                          this.saveSearch({
                            sanId: sanctuary.sanId,
                            userId: user.userId,
                          })
                        }
                      />
                    ))}
                  </div> // if not logged in serve up the page without button link
                ) : (
                  <div>
                    {filteredSanctuaries.map(sanctuary => (
                      <SearchResults
                        sanId={sanctuary.sanId}
                        key={sanctuary.sanId}
                        name={sanctuary.name}
                        website={sanctuary.animalWebsite}
                        logo={sanctuary.image}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Search;
