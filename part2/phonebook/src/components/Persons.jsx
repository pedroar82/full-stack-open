const Persons = (props) => {
    return (
        <div>
            {props.persons.filter(name =>
                (props.newSearch) === '' ? true : name.name.toLowerCase().indexOf(props.newSearch.toLowerCase()) >= 0)
                .map(name =>
                    <p key={name.id} style={{ margin: 0 }}>{name.name} {name.number}</p>
                )}
        </div>
    )
}

export default Persons