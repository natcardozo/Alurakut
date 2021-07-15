import Box from "../Box"
import styled from "styled-components"

const ScrBox = styled.div`
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 80px 1fr; 
    max-height: 340px;
    list-style: none;
    margin-bottom: 10px;
    img {
        object-fit: cover;
        background-position: center center;
        width: 80px;
        height: 80px;
        position: relative;
        border-radius: 8px;
    }
`

const styleMsg = {
    fontSize: 13,
    backgroundColor: '#fcffa4',
    borderRadius: 8,
    padding: 10,
    textAlign: 'center',
    fontStyle: 'italic',
}

export default function ScrapBox (props) {
    return (
        <Box>
            <h2 className="subTitle"> Recados </h2>

            <ul>
                {(props.list && props.list.length > 0) ? props.list.map((itemAtual) => {
                    return (
                        <ScrBox key={itemAtual.id}>
                                <img src={`https://github.com/${itemAtual.user}.png`} />
                                {itemAtual.user}
                                {itemAtual.message}
                        </ScrBox>
                    )
                }) 
                : 
                <div style={styleMsg}>
                    Não há recados para serem mostrados.
                </div> 
                }
            </ul>
        </Box>
    )
}