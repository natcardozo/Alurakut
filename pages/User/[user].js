import React from 'react';
import MainGrid from '../../src/components/MainGrid';
import Box from '../../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper, ProfileRelations } from '../../src/components/ProfileRelations';
import ScrapForm from '../ScrapForm';
import DepoimentoForm from '../DepoimentoForm';
import DepoimentoBox from '../../src/components/Depoimento';
import ScrapBox from '../../src/components/Scrap';
import { useRouter } from 'next/router';

function ProfileSidebar(propriedades) {
  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px'}} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
            @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home(props) {
  const [seguidores, setSeguidores] = React.useState([]);
  const [depoimentos, setDepoimentos] = React.useState([]);
  const [scraps, setScraps] = React.useState([]);
  const [numSeguidores, setNumSeguidores] = React.useState(0);
  const [acao, setAcao] = React.useState('Comunidade');
  const router = useRouter();
  const githubUser = router.query.user;

  React.useEffect (async() => {
    const url = `https://api.github.com/users/${githubUser}/followers`;
    const resultado = await fetch(url);
    const resultadoJson = await resultado.json();
    const resultadoAmigos = resultadoJson.slice(0, 9).map((item) => {
      return {
        id: item.login,
        title: item.login
      }
    });
    setSeguidores(resultadoAmigos);

    const urlUser = `https://api.github.com/users/${githubUser}`;
    const countSeguidores = await fetch(urlUser).then ((response) => {
      return response.json();
    })
    .then ((response) => {
      return response.followers;
    })

    setNumSeguidores(countSeguidores);

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'f20095d0ec6c4c9bc4f93c9f0f4911',
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          imageUrl
          communityUrl
        }
      }` })
    })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesDato = respostaCompleta.data.allCommunities;
    })

    fetch('api/ListScraps', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((response) => setScraps(response))

  },[])

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              <a className="boxLink" style={{fontSize: 30, fontFamily: 'cursive'}} href={`https://github.com/${githubUser}`}>
                @{githubUser}
              </a>
            </h1>

            <OrkutNostalgicIconSet confiavel = {3} legal = {3} sexy = {2} />
          </Box>
          
          <Box>
            <h2 className="subTitle"> O que você deseja fazer? </h2>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingBottom: '10'}}>
              <button onClick = {(e) => {
                setAcao('Depoimento')
              }}>
                Depoimentos
              </button>
              <button onClick = {(e) => {
                setAcao('Scrap')
              }}>
                Recados
              </button>
            </div>

            {acao === 'Scrap' ?
            <div className='marginT10'>
              <ScrapForm setScraps = {
                (scrap) => {
                  setScraps([scrap, ...scraps])
                }
              } />
            </div>
            : 
            <div className='marginT10'>
              <DepoimentoForm setDepoimentos = {
                (depoimento) => {
                  setDepoimentos([depoimento, ...depoimentos])
                }
              } />
            </div>
            }
          </Box>

          {acao === 'Scrap' && <ScrapBox list={scraps} />}

          {acao === 'Depoimento' && <DepoimentoBox list={depoimentos} />}

        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <ProfileRelations title='Amigos' amount={numSeguidores} list={seguidores}/>
          </ProfileRelationsBoxWrapper>
          {/* <ProfileRelationsBoxWrapper>
            <ProfileRelations title='Pessoas da Comunidade' amount={pessoasComunidade.length} list={pessoasComunidade}/>
          </ProfileRelationsBoxWrapper> */}
          {/* <ProfileRelationsBoxWrapper>
            <ProfileRelations title='Comunidades' amount={comunidades.length} list={comunidades}/>
          </ProfileRelationsBoxWrapper> */}
        </div>
      </MainGrid>
    </>
  )
}
