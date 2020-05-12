import { performAction }  from './js/app'
import './styles/main.scss'

export {
    performAction
}

let print = document.getElementById('print');
print.addEventListener('click', function(){
    console.log('getit')
    window.print()
})