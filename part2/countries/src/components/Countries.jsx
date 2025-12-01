import shortid from 'shortid'


const Countries = ({ filteredCountries, showCountry }) => {
    if (filteredCountries.length == 1) {
        return (
            <div>
                <p key={shortid.generate()}> {filteredCountries[0]} </p>
            </div>
        )
    } else {
        return (
            <div>
                {filteredCountries
                    .map(country =>
                        <p key={shortid.generate()}> {country}
                            <button onClick={() => showCountry(country)}> Show</button>
                        </p>
                    )}
            </div>
        )
    }
}

export default Countries


