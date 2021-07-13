import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import ScrapForm from './ScrapForm';
import DepoimentoForm from './DepoimentoForm';
import comunidadesDefault from '../src/objects/defaultValues';

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

export default function Home() {
  const [seguidores, setSeguidores] = React.useState([]);
  const [numSeguidores, setNumSeguidores] = React.useState(0);
  const [comunidades, setComunidades] = React.useState(comunidadesDefault);
  const [acao, setAcao] = React.useState('Comunidade');

  React.useEffect (async() => {
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
      <AlurakutMenu githubUser={githubUser} />
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
                  id: new Date().toISOString(),
                  title: dadosDoForm.get('title'),
                  image: valorImagem,
                  url: urlComunidade,
                }
                const comunidadesAtualizadas = [...comunidades, comunidade]
                setComunidades(comunidadesAtualizadas)
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
              <ScrapForm />
            </div>
            : 
            <div className='marginT10'>
              <DepoimentoForm />
            </div>
            }
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
                    <a href={`https://github.com/${itemAtual.login}`}>
                      <img src={`https://github.com/${itemAtual.login}.png`} />
                      <span>{itemAtual.login}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades && comunidades.length})
            </h2>

            <ul>
              {comunidades && comunidades.slice(0, 9).map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`${itemAtual.url}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
