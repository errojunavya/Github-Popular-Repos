import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    repositoriesData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeTabId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`

    const response = await fetch(apiUrl)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        imageUrl: eachRepo.avatar_url,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
        forksCount: eachRepo.forks_count,
        issuesCount: eachRepo.issues_count,
      }))
      this.setState({
        repositoriesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  repositoriesInProgressView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" height={80} width={80} color="#0284c7" />
    </div>
  )

  repositoriesFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="error-img"
      />
      <h1 className="error-text">Something Went Wrong</h1>
    </div>
  )

  repositoriesSuccessView = () => {
    const {repositoriesData} = this.state

    return (
      <ul className="repo-card-list-container">
        {repositoriesData.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.repositoriesSuccessView()
      case apiStatusConstants.failure:
        return this.repositoriesFailureView()
      case apiStatusConstants.inProgress:
        return this.repositoriesInProgressView()
      default:
        return null
    }
  }

  setNewLanguage = newId => {
    this.setState({activeTabId: newId}, this.getRepositories)
  }

  renderLanguageFilterList = () => {
    const {activeTabId} = this.state

    return (
      <ul className="language-list-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            isActive={eachLanguage.id === activeTabId}
            eachLanguageDetails={eachLanguage}
            setNewLanguage={this.setNewLanguage}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="bg-container">
        <div className="github-container">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageFilterList()}
          {this.renderApiStatusView()}
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos
