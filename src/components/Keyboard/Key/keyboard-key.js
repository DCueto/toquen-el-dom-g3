import styles from './keyboard-key.css' assert { type: 'css' };

  export class KeyboardKey extends HTMLElement {

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.shortcut;
      this.note;
      this.soundSrc;
      this.keyType;
    }

    static get observedAttributes(){
      return ['shortcut', 'note', 'sound-src', 'key-type'];
    }

    playSound( e ){
      if( e.type == 'keypress' && e.key.toUpperCase() == this.shortcut.toUpperCase() ){
        const sound = new Audio( this.soundSrc );
        sound.play();
        return;

      } else if( e.type == 'click' ){
        const sound = new Audio( this.soundSrc );
        sound.play();
        return;
      }
    }

    connectedCallback() {
      this.shadow.adoptedStyleSheets.push( styles );
      this.render();

      let key = this.shadow.querySelector('.key');
      key.addEventListener('click', this.playSound.bind( this ));
      document.addEventListener('keypress', this.playSound.bind( this ));

    }

    disconnectedCallback() {
      // console.log('Custom element removed from page.');
    }

    adoptedCallback() {
      // console.log('Custom element moved to new page.')
    }

    render() {
      this.shadow.innerHTML = /* html */`
        ${ this.keyType == 'whiteKey' && this.keyWhite() }
        ${ this.keyType == 'blackKey' && this.keyBlack() }
      `;
    }

    keyWhite(){
      return /* html */`
        <li data-note=${this.note} class="key-white key">
          <span class='key__shortcut'>${this.shortcut}</span>
          <span class='key__note'>${this.note}</span>
        </li>
      `;
    }

    keyBlack(){
      return /* html */`
        <li data-note=${this.note} class="key-black key">
          <span class='key__shortcut'>${this.shortcut}</span>
          <span class='key__note'>${this.note}</span>
        </li>
      `;
    }

    attributeChangedCallback(name, oldValue, newValue) {

      switch(name){
        case 'shortcut':
          this.shortcut = newValue;
          break;
        case 'note':
          this.note = newValue;
          break;
        case 'sound-src':
          this.soundSrc = newValue;
          break;
        case 'key-type':
          this.keyType = newValue;
      }

    }

  }

  window.customElements.define('keyboard-key', KeyboardKey);