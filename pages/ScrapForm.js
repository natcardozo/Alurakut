export default function ScrapForm(props) {
    return(
    <form onSubmit={function handleCriaScrap(e) {
        e.preventDefault();
        const dadosDoForm = new FormData(e.target);

        if (dadosDoForm.get('scrap') === undefined || dadosDoForm.get('scrap') === '') {
            alert('O recado não pode estar vazio.');
            return;
        }
        alert(dadosDoForm.get('scrap'));

    }}>

        <div>
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