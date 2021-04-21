/* creates a constant variable addBtn to reference the id of new-toy-btn,
also what references this constant variable is the event listener 'click'
so that an action takes place (below) when this button is clicked */
const addBtn = document.querySelector('#new-toy-btn')
/*declaring the constant toyForm, assigns to the .css of .container
this will be referenced below when the addToy is !addToy makes the display
for the form to "none" */
const toyForm = document.querySelector('.container')

/* sets addToy to be false, thus making the default of the popup to not
happen until it is clicked in the addEventListener. Makes the event of 
the add toy button to change the addToy to true, envoking the action
of displaying the form. */ 
let addToy = false

/** sets the variable of divCollect to the id: of toy-collection in the 
 * index.html file. This variable is referenced later in the code for the
 * collection of the card elements into one spot. i.e. storage of the
 * images and the information for the toys */
let divCollect = document.querySelector('#toy-collection')

/** function getToys is a fetch to go to the URL to retrieve the promise
 * of the API list of toys. This is a json file that needs to be converted
 * to javascript, thus the .json call on the response from the promise.
 fetch by default is a GET request, thus this is a request for data */
 function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(function(res) {
      return res.json()
    })
    // .then(res => res.json())
}

/** function postToys with the arg of toy_data, is sending the users input
 * to the API located at the declared URL. Telling the API that what is 
 * being sent is in json format, and that we accept the results in json
 * as well. This also states to the API that it can expect the body
 * to have in it the name, image and likes attributes. At the end of the
 * function, we are calling on renderToys function which will display the image 
 * and the details of the toys requested.
*/
function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0

      })
    })
    .then(function(res) {
      return res.json()
    })
    .then(function(obj_toy) {
      renderToys(obj_toy)
    })

    // .then(res => res.json())
    // .then((obj_toy) => {
    //   renderToys(obj_toy)
    // })
}

/** function likes(e) sets the variable more to increase the likes by 1
 * when clicked, also sends a 'PATCH' request to update the server. 
 * indicates the like_obj function to display the likes on the website i.e.
 * Buzz has 12 likes. Also prevents the default action from submitting
 * the form to regenerate the page. 
 */
function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"  
      },
      body: JSON.stringify({
        "likes": more
      })
  })
    .then(function(res) {
      return res.json
    })
    .then(function(like_obj) {
      e.target.previousElementSibling.innerText = `${more} likes`;
    })

    // .then(res => res.json())
    // .then((like_obj => {
    //   e.target.previousElementSibling.innerText = `${more} likes`;
    // }))
}

/** function(renderToys(toy) creates h2 element with the toys name, sets
 * the attribute for the toy image and class 'toy-avatar'. creates p element
 * for likes. sets the button element, class and id. Also sets the 
 * EventListener to click. creates the div element, attributes and also
 * appends the new toy to the js database.
*/
function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  -----this is where youre at-----
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  /** variable divCard creates the element div, attribute and appends to the
   * new item. append the h2, img, p, btn and appends the new toy
   * to the database.
   */
  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
}

// sets that the const addBtn and toyFormContainer be set after all the html
// has run. In Addition, adds the addBtn addEventListener to click. Sets 
// that the addToy to equal NOT addToy and if addToy display in block
// otherwise no display. A basic toggling between two things with one button

// hide & seek with the form. addToy is at !addToy until the click event happens
// which at that point it becomes !addToy and displays the form. adds eventListener
// for the click Action
addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

/** gets all the toys */
getToys().then(toys => {
  toys.forEach(toy => {
    //function to render toys goes here or something
    renderToys(toy)
  })
})