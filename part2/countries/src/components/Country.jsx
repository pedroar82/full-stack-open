import shortid from 'shortid'

const Country = ({ info }) => {
    if (info === null) {
        return null
    }
    return (
        <div >
            <h1>{info.name.common}</h1>
            <p>Capital {info.capital}</p>
            <p>Area {info.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(info.languages).map(lang => {
                    return <li key={shortid.generate()}>{lang}</li>
                })}
            </ul>
            <img src={info.flags.png} alt={info.flags.alt} />
        </div>
    )
}

export default Country