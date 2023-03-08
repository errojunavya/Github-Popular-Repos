// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isActive, eachLanguageDetails, setNewLanguage} = props
  const {id, language} = eachLanguageDetails
  const buttonClassName = isActive ? 'active-button' : 'button'

  const onClickLanguage = () => {
    setNewLanguage(id)
  }

  return (
    <li className="list-item-container">
      <div className={buttonClassName}>
        <button className="button" onClick={onClickLanguage} type="button">
          {language}
        </button>
      </div>
    </li>
  )
}
export default LanguageFilterItem
