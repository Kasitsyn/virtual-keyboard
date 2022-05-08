import keyboardKeys from "./keys/keys.js"
let lang = ''
let caps = false
if (!localStorage.lang) {
    lang = 'ru'
    localStorage.lang = 'ru'
} else {
    lang = localStorage.lang
}

init(lang)
mouseAndKeysEvents()

function init(lang) {

    const textarea = document.createElement("textarea")
    textarea.classList.add('text')
    body.prepend(textarea)

    const wrapper = document.createElement("div")
    wrapper.classList.add('wrapper')
    body.append(wrapper)

    const description = document.createElement("div")
    description.classList.add('description')
    description.innerHTML = "Нажмите левые 'Ctrl + Alt' для смены языка, если ввод осуществляется с помощью физической клавиатуры или клавишу 'Win' с виртуальной."
    body.append(description)


    renderKeyboard(lang)

}

function renderKeyboard(lang) {
    let out = ''

    if (caps === true) {
        for (let i = 0; i < keyboardKeys.ru.nameKeys.length; i++) {
            out += `<div class="k-key" data="${keyboardKeys.codeKeys[i]}">${keyboardKeys[lang].shiftKeys[i]}</div>`
        }
    } else {
        for (let i = 0; i < keyboardKeys.ru.nameKeys.length; i++) {
            out += `<div class="k-key" data="${keyboardKeys.codeKeys[i]}">${keyboardKeys[lang].nameKeys[i]}</div>`
        }
    }



    const keyboard = document.querySelector(".wrapper").innerHTML = out

}

function mouseAndKeysEvents() {
    document.onkeydown = function (event) {
        let textarea = document.querySelector('.text')

        if (event.code == 'AltLeft' && event.ctrlKey) {
            lang === 'ru' ? lang = 'en' : lang = 'ru'
            localStorage.lang = lang
            renderKeyboard(lang)
            mouseAndKeysEvents()
        }

        if (event.code == 'Tab') {
            event.preventDefault()
            textarea.value += '\t'
        }

        if (event.code == 'ShiftLeft' || event.code == 'CapsLock') {
            !caps ? caps = true : caps = false

            renderKeyboard(lang)
            mouseAndKeysEvents()
        }



        event.code == 'AltLeft' ? event.preventDefault() : ''
        event.code == 'AltRight' ? event.preventDefault() : ''

        document.querySelector('.text').focus()

        document.querySelector(`.k-key[data=${event.code}]`).classList.add("active")

    }

    document.onkeyup = function (event) {
        document.querySelectorAll(`.k-key`).forEach(key => key.classList.remove("active"))

    }

    document.onkeyup = function (event) {
        document.querySelectorAll(`.k-key`).forEach(key => key.classList.remove("active"))


    }

    document.querySelectorAll(`.k-key`).forEach(elem => {

        elem.onclick = function (event) {
            const code = this.getAttribute('data')
            document.querySelectorAll(`.k-key`).forEach(key => key.classList.remove("active"))
            this.classList.add("active")
            setTimeout(() => this.classList.remove("active"), 100)

            if (code == 'MetaLeft') {
                lang === 'ru' ? lang = 'en' : lang = 'ru'
                localStorage.lang = lang
                renderKeyboard(lang)
                mouseAndKeysEvents()
            }

            if (code == 'ShiftLeft' || code == 'CapsLock') {
                !caps ? caps = true : caps = false

                renderKeyboard(lang)
                mouseAndKeysEvents()
            }

            let textarea = document.querySelector('.text')
            for (let i = 0; i < keyboardKeys.codeKeys.length; i++) {

                if (code === keyboardKeys.codeKeys[i]) {

                    switch (code) {
                        case 'CapsLock':
                        case 'AltLeft':
                        case 'AltRight':
                        case 'ControlLeft':
                        case 'ControlRight':
                        case 'ShiftLeft':
                        case 'ShiftRight':
                        case 'MetaLeft':
                            textarea.value += '';
                            break;
                        case 'Backspace':
                            textarea.value = textarea.value.slice(0, -1);
                            break;
                        case 'Delete':
                            textarea.value = ''
                            break;
                        case 'Enter':
                            textarea.value += '\n';
                            break;
                        case 'Tab':
                            textarea.value += '\t';
                            break;
                        case 'Space':
                            textarea.value += ' ';
                            break;
                        case 'ArrowLeft':
                            textarea.value += '←'
                            break;
                        case 'ArrowRight':
                            textarea.value += '→';
                            break;
                        case 'ArrowDown':
                            textarea.value += '↑';
                            break;
                        case 'ArrowUp':
                            textarea.value += '↓';
                            break;
                        default:

                            !caps ? textarea.value += keyboardKeys[lang].nameKeys[i] : textarea.value += keyboardKeys[lang].shiftKeys[i]
                    }

                }


            }

        }


    })
}


