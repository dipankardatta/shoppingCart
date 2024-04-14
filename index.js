import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import {  getDatabase , ref , push , onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://shopping-cart-ad7e0-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListDB = ref( database , "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const ulEl = document.getElementById("shopping-list")


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push( shoppingListDB, inputValue)
    clearValue()
})

onValue(shoppingListDB, function(snapshot){

    if (snapshot.exists()){
        const shoppingItemsArray = Object.entries(snapshot.val())

        clearList()
    
        for ( let i = 0 ; i < shoppingItemsArray.length; i++){
            let currentItem = shoppingItemsArray[i]
    
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
    
            addItem(currentItem)
        }
    } else {
        ulEl.innerHTML = "No Items here.. yet"
    }

})

function clearList(){
    ulEl.innerHTML = ''
}


function clearValue(){
    inputFieldEl.value = ''
}

function addItem(item){

    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement('li')

    newEl.textContent = itemValue

    newEl.addEventListener('dblclick', function(){
        let exactLocation = ref(database, `shoppingList/${itemID}`)
        remove(exactLocation)
    })

    ulEl.append(newEl)
}