export default function DepoimentoForm(props) {
    return(
    <form onSubmit={function handleCriaDepoimento(e) {
        e.preventDefault();
        const dadosDoForm = new FormData(e.target);

        if (dadosDoForm.get('depoimento') === undefined || dadosDoForm.get('depoimento') === '') {
            alert('O depoimento não pode estar vazio.');
            return;
        }
        alert(dadosDoForm.get('depoimento'));

    }}>

        <div>
        <input 
            placeholder="Escreva aqui seu depoimento." 
            name="depoimento" 
            aria-label="Escreva aqui seu depoimento."
            type="text"
        />
        </div>
        
        <button>
        Enviar
        </button>
    </form>)
}    