export default class AssetManager {
    constructor() {
        this.aCarregar = 0;
        this.carregadas = 0;
        this.imagens = new Map();
    }

    carregarImagem(chave, url) {
        const img = new Image();
        img.src = url
        this.imagens.set(chave, img)
    }

    img(chave) {
        return this.imagens.get(chave)
    }

    progresso() {
        if (this.aCarregar > 0)
            return this.carregadas / this.aCarregar.toFixed(2) + '%';
        else return "Nada a carregar"
    }
}