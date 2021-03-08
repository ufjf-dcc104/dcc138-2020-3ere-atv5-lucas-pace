export default class AssetManager {
    constructor() {
        this.aCarregar = 0;
        this.carregadas = 0;
    }
    progresso() {
        if (this.aCarregar > 0)
            return this.carregadas / this.aCarregar.toFixed(2) + '%';
        else return "Nada a carregar"
    }
}