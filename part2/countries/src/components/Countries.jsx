import shortid from 'shortid'


const Countries = ({ filteredCountries }) => {
    return (
        <div>
            {filteredCountries
                .map(country =>
                    <p key={shortid.generate()}> {country} </p>
                )}
        </div>
    )
}

export default Countries


