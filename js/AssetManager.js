export default class AssetManager {
    constructor(mixer) {
        this.aCarregar = 0;
        this.carregadas = 0;
        this.imagens = new Map();
        this.audios = new Map();
        this.mixer = mixer

    }

    carregarImagem(chave, url) {
        const img = new Image();
        img.addEventListener("load", () => {
            
            console.log('Imagem ' + this.carregadas + '/' + this.aCarregar + ' carregada')
            this.carregadas++
        })
        img.src = url
        this.imagens.set(chave, img)
        this.aCarregar++;
    }

    carregarAudio(chave, url) {
        const audio = new Audio();
        audio.addEventListener("loadeddata", () => {
            
            console.log('Audio ' + this.carregadas + '/' + this.aCarregar + ' carregado')
            this.carregadas++
        })
        audio.src = url
        this.audios.set(chave, audio)
        this.aCarregar++;
    }

    img(chave) {
        return this.imagens.get(chave)
    }
    audio(chave) {
        return this.audios.get(chave)
    }

    progresso() {
        if (this.aCarregar > 0)
            return (this.carregadas / this.aCarregar * 100).toFixed(2) + '%';
        else return "Nada a carregar"
    }

    acabou(){
        return this.carregadas === this.aCarregar
    }

    play(chave){
        this.mixer?.play(this.audio(chave))
    }
}