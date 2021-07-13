import { useEffect, useState } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px'}} />
    </Box>
  )
}

export default function Home() {
  const [seguidores, setSeguidores] = useState([]);
  const [numSeguidores, setNumSeguidores] = useState(0);

  useEffect (async() => {
    const url = `https://api.github.com/users/${githubUser}/followers`;
    const resultado = await fetch(url);
    const resultadoJson = await resultado.json();

    setNumSeguidores(resultadoJson.length);

    const resultadoSlice = resultadoJson.slice(0, 9);
    setSeguidores(resultadoSlice);
  },[])

  const githubUser = 'natcardozo';
  const pessoasFavoritas = [
    'vihh25',
    'juunegreiros',
    'omariosouto',
    'peas',
    'cs50',
    'brianyu28',
    'dmalan'
  ]
  
  return (
    <>
      <AlurakutMenu githubUser='githubUser' />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
            Bem-vindo(a)
            </h1>

            <OrkutNostalgicIconSet confiavel = {3} legal = {3} sexy = {2} />
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Amigos ({numSeguidores})
            </h2>

            <ul>
              {seguidores && seguidores.map((itemAtual) => {
                return (
                  <li key={itemAtual.login}>
                    <a href={`/users/${itemAtual.login}`} key={itemAtual.login}>
                      <img src={`https://github.com/${itemAtual.login}.png`} />
                      <span>{itemAtual.login}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            <h2 className="smallTitle">
            Comunidades
            </h2>
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
