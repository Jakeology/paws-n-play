console.clear()

const users = [{
  name: 'Dog',
  url: 'https://source.unsplash.com/random',
  text:'let\'s be friends',
  isBoss: true
}, {
  name: 'Dog',
  url: 'https://source.unsplash.com/random',
  text:'Hello',
  isBoss: false
}
]

users.forEach(user => addCard(user.name, user.url, user.text, user.isBoss))


function addCard (name, url, text, isBoss) {
  
  // name = isBoss ? name + '😎' : name + '🤓'
  
  if(isBoss) {
     name = name +'😎'
     } else {
       name = name +'🤓'
     } 
  const cardString = createCardString(name, url, text)
  const placeholder = get('.placeholder')
  placeholder.insertAdjacentHTML('beforeend', cardString)

  
}

function get (selector) {
  return document.querySelector(selector)
}

function createCardString (name, url, text) {
  const templateEl = get('#user-card-template')
  const templateString = templateEl.innerHTML
  const cardString = templateString
    .replace('#name#', name)
    .replace('#url#', url)
    .replace('#text#', text)
  return cardString
}