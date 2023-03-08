// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, imageUrl, starsCount, forksCount, issuesCount} = repoDetails

  return (
    <div>
      <li className="repo-card-item-container">
        <img src={imageUrl} alt={name} className="repo-image" />
        <h1 className="name">{name}</h1>
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon"
          />
          <p className="text">{starsCount} stars</p>
        </div>
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p className="text">{forksCount} forks</p>
        </div>
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p className="text">{issuesCount} open issues</p>
        </div>
      </li>
    </div>
  )
}
export default RepositoryItem
