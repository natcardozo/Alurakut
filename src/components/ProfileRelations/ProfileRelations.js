export function ProfileRelations (props) {
    return (
        <div>
            <h2 className="smallTitle">
                {props.title} <a className="boxLink" href="/">({props.amount})</a>
            </h2>

            <ul>
                {props.list && props.list.slice(0, 9).map((itemAtual) => {
                    return (
                        <li key={itemAtual.id}>
                            <a href={itemAtual.communityUrl ? itemAtual.communityUrl : `https://github.com/${itemAtual.title}`}>
                            <img src={itemAtual.imageUrl ? itemAtual.imageUrl : `https://github.com/${itemAtual.title}.png`} />
                            <span>{itemAtual.title}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
