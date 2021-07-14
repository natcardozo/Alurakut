export function ProfileRelations (props) {
    return (
        <div>
            <h2 className="smallTitle">
                {props.title} <a className="boxLink" href="/">({props.amount})</a>
            </h2>

            <ul>
                {props.list && props.list.map((itemAtual) => {
                    return (
                        <li key={itemAtual.title}>
                            <a href={itemAtual.extLink ? itemAtual.extLink : `https://github.com/${itemAtual.title}`}>
                            <img src={itemAtual.imgLink ? itemAtual.imgLink : `https://github.com/${itemAtual.title}.png`} />
                            <span>{itemAtual.title}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
