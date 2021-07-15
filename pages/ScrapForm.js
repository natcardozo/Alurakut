export default function ScrapForm(props) {
    return(
    <form onSubmit={function handleCriaScrap(e) {
        const { setScraps } = props;
        e.preventDefault();
        const dadosDoForm = new FormData(e.target);

        if (dadosDoForm.get('scrap') === undefined || dadosDoForm.get('scrap') === '') {
            alert('O recado não pode estar vazio.');
            return;
        }

        const scrap = {
            user: dadosDoForm.get('user'),
            message: dadosDoForm.get('scrap')
        }

        fetch('/api/Scraps', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(scrap)
          })
          .then(async (response) => {
            const dados = await response.json();
            const newScrap = dados.register;
            setScraps(newScrap)
          })

    }}>

        <div>
        <input 
            placeholder="Username" 
            name="user" 
            aria-label="Username"
            type="text"
        />
        <input
            placeholder="Deixe seu recado."
            name="scrap"
            aria-label="Deixe seu recado."
            type="text"     
        />
        </div>
        
        <button>
        Enviar
        </button>
    </form>)
}    