import { useRouter } from "next/router";

export function ProfileRelations (props) {
    const router = useRouter();
    return (
        <div>
            <h2 className="smallTitle">
                {props.title} <a className="boxLink" href="/">({props.amount})</a>
            </h2>

            <ul>
                {props.list && props.list.slice(0, 9).map((itemAtual) => {
                    return (
                        <li key={itemAtual.id}>
                            {
                                props.title !== 'Amigos' ? 
                                    <a href={itemAtual.communityUrl ? itemAtual.communityUrl : `https://github.com/${itemAtual.title}`}>
                                    <img src={itemAtual.imageUrl ? itemAtual.imageUrl : `https://github.com/${itemAtual.title}.png`} />
                                    <span>{itemAtual.title}</span>
                                    </a>
                                : 
                                <a onClick = { (e) => {
                                    e.preventDefault();
                                    router.push(`/User/${itemAtual.title}`)
                                }                                   
                                }>
                                <img src={itemAtual.imageUrl ? itemAtual.imageUrl : `https://github.com/${itemAtual.title}.png`} />
                                <span>{itemAtual.title}</span>
                                </a>
                            }
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
