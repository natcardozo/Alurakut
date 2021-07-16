import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper, ProfileRelations } from '../src/components/ProfileRelations';
import ScrapForm from './ScrapForm';
import DepoimentoForm from './DepoimentoForm';
import DepoimentoBox from '../src/components/Depoimento';
import ScrapBox from '../src/components/Scrap';

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
  const [comunidades, setComunidades] = React.useState([]);
  const [acao, setAcao] = React.useState('Comunidade');

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

    // API GraphQL
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
      setComunidades(comunidadesDato)
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

  const githubUser = props.githubUser;
  const pessoasComunidade = [
    {
      id: '1',
      title: 'juunegreiros',
      image: 'img',
      url: 'url',
    },
    {
      id: '2',
      title: 'omariosouto',
      image: 'img',
      url: 'url',
    },
    {
      id: '3',
      title: 'peas',
      image: 'img',
      url: 'url',
    },
    {
      id: '4',
      title: 'cs50',
      image: 'img',
      url: 'url',
    },
    {
      id: '5',
      title: 'brianyu28',
      image: 'img',
      url: 'url',
    },
    {
      id: '6',
      title: 'dmalan',
      image: 'img',
      url: 'url',
    }
  ]
  
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
            Bem-vindo(a), {githubUser}
            </h1>

            <OrkutNostalgicIconSet confiavel = {3} legal = {3} sexy = {2} />
          </Box>
          
          <Box>
            <h2 className="subTitle"> O que você deseja fazer? </h2>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingBottom: '10'}}>
              <button onClick = {(e) => {
                setAcao('Comunidade')
              }}> 
                Comunidades
              </button>
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

            {acao === 'Comunidade' ? 
            <form onSubmit={function handleCriaComunidade(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);
                var valorImagem = dadosDoForm.get('image');
                const urlComunidade = dadosDoForm.get('url');

                if (dadosDoForm.get('title') === undefined || dadosDoForm.get('title') === '') {
                  alert('O nome da comunidade não pode estar vazio.');
                  return;
                }

                if (valorImagem === undefined || valorImagem === '') {
                  valorImagem = `https://picsum.photos/200/300?${Math.random()}`
                }

                if (dadosDoForm.get('url') === undefined || dadosDoForm.get('url') === '') {
                  alert('A url da comunidade não pode estar vazia.');
                  return;
                }

                const comunidade = {
                  title: dadosDoForm.get('title'),
                  imageUrl: valorImagem,
                  communityUrl: urlComunidade,
                }

                fetch('/api/Communities', {
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)
                })
                .then(async (response) => {
                  const dados = await response.json();
                  const comunidade = dados.register;
                  const comunidadesAtualizadas = [...comunidades, comunidade]
                  setComunidades(comunidadesAtualizadas)
                })
            }}>

              <div className='marginT10'>
                <input 
                  placeholder="Qual o nome da comunidade?" 
                  name="title" 
                  aria-label="Qual o nome da comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="URL da capa (ao deixar em branco, uma imagem aleatória é selecionada)" 
                  name="image" 
                  aria-label="URL da capa (ao deixar em branco, uma imagem aleatória é selecionada)"
                />
              </div>
              <div>
                <input
                  placeholder="URL da comunidade"
                  name="url"
                  aria-label="URL da comunidade"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
            : acao === 'Scrap' ?
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
                  setDepoimentos([...depoimentos, depoimento])
                }
              } />
            </div>
            }
          </Box>
          {acao === 'Depoimento' && <DepoimentoBox list={depoimentos} />}

          {acao === 'Scrap' && <ScrapBox list={scraps} />}

        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <ProfileRelations title='Amigos' amount={numSeguidores} list={seguidores}/>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <ProfileRelations title='Pessoas da Comunidade' amount={pessoasComunidade.length} list={pessoasComunidade}/>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <ProfileRelations title='Comunidades' amount={comunidades.length} list={comunidades}/>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then((resposta) => resposta.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login?error=true',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }
  }
}
