document.addEventListener('DOMContentLoaded', function(){

  const JSON_URL = './assets/data/products.json';

  let games = [];
  let bestSellerGames = [];
  let featuredGames = [];
  let searchGames = [];
  let cartGames = [];

  const $CART_LENGHT = document.getElementById('totalCartProducts');
  $CART_LENGHT.textContent = cartGames.length;

  async function fetchGames(url) {
    try {
      const response = await fetch(url);
      if(!response.ok) throw new Error ('Hubo un error en la carga del catálogo de juegos')
      
      games = await response.json();

      bestSellerGames = games.filter(game => game.tag === 'best seller');
      displayGames(bestSellerGames, $BEST_SELLER_CONTAINER, SECTIONS.bestSeller);

      featuredGames = games.filter(product => product.tag === 'featured');
      displayGames(featuredGames, $FEATURED_CONTAINER, SECTIONS.featured);
    } 
    catch (error) {
      const $SECTIONS = document.getElementsByClassName('section')
      $SECTIONS[0].innerHTML = ''
      $SECTIONS[1].innerHTML = ''

      const $MESSAGE_FETCH_ERROR = document.createElement('div');
      $MESSAGE_FETCH_ERROR.classList.add('message')
      const $MESSAGE = document.createElement('p')
      $MESSAGE.textContent = error.message
      $MESSAGE_FETCH_ERROR.appendChild($MESSAGE)
      $SECTIONS[0].appendChild($MESSAGE_FETCH_ERROR)

      console.error(error.message);
    }
  }

  fetchGames(JSON_URL);

  const SECTIONS = {
    bestSeller: 'bestSeller',
    featured: 'featured',
    search: 'search',
    cart: 'cart'
  }

  const $BEST_SELLER_CONTAINER = document.getElementById('bestSellerGamesContainer');
  const $FEATURED_CONTAINER = document.getElementById('featuredGamesContainer');
  const $SEARCH_CONTAINER = document.getElementById('searchGamesContainer');
  const $CART_CONTAINER = document.getElementById('cartGamesContainer');


  function displayGames(games, container, section) {
    games.forEach(game => {
      
      //CANTIDAD CARRO
      if (!game.quantity) {
        game.quantity = 1;
      }

      //JUEGO
      const $GAME = document.createElement('article');

      if(section === SECTIONS.bestSeller){
        $GAME.classList.add('game', 'col-md-6', 'col-lg-4');
      }
      if(section === SECTIONS.search || section === SECTIONS.cart){
        $GAME.classList.add('game');
      }
      if(section === SECTIONS.featured){
        $GAME.classList.add('game', 'col-sm-6', 'col-md-4', 'col-lg-3');
      }

      //IMAGEN
      const $GAME_IMG = document.createElement('img');
      $GAME_IMG.src = game.image;
      $GAME_IMG.alt = game.name;
      $GAME_IMG.classList.add('game__image');
      if(section === SECTIONS.bestSeller || section === SECTIONS.search){
        $GAME_IMG.width = 100;
        $GAME_IMG.height = 100;
      }
      if(section === SECTIONS.featured ){
        $GAME_IMG.width = 400;
        $GAME_IMG.height = 400;
      }
      if(section === SECTIONS.cart ){
        $GAME_IMG.width = 64;
        $GAME_IMG.height = 64;
      }

      //NOMBRE
      const $GAME_NAME = document.createElement('span');
      $GAME_NAME.textContent = game.name;
      $GAME_NAME.classList.add('game__name');
      
      //PLATAFORMA
      const $GAME_PLATFORM = document.createElement('span');
      $GAME_PLATFORM.textContent = game.platform;
      $GAME_PLATFORM.classList.add('game__platform');

      //PRECIO
      const $GAME_PRICE = document.createElement('span');
      $GAME_PRICE.textContent = '$' + game.price.toLocaleString('es-CL');
      $GAME_PRICE.classList.add('game__price');
      
      //CONTENEDOR DETALLES
      const $GAME_DETAILS_CONTAINER = document.createElement('div');
      $GAME_DETAILS_CONTAINER.classList.add('game__details')

      //CONTENDOR LINK
      const $GAME_LINK_CONTAINER = document.createElement('a');
      if(section === SECTIONS.bestSeller || section === SECTIONS.search || section === SECTIONS.cart){
        $GAME_LINK_CONTAINER.classList.add('game__link-container')
        // $GAME_LINK_CONTAINER.href = 'game-details.html';

        $GAME_LINK_CONTAINER.appendChild($GAME_IMG);
        $GAME_LINK_CONTAINER.appendChild($GAME_DETAILS_CONTAINER);
      
        $GAME.appendChild($GAME_LINK_CONTAINER);

        $GAME_DETAILS_CONTAINER.appendChild($GAME_NAME);
        $GAME_DETAILS_CONTAINER.appendChild($GAME_PLATFORM);
        $GAME_DETAILS_CONTAINER.appendChild($GAME_PRICE);
      }

      //CANTIDAD CARRO Y ELIMINAR DEL CARRO
      if(section === SECTIONS.cart){

        const $GAME_CART_QUANTITY = document.createElement('span')
        $GAME_CART_QUANTITY.classList.add('game__quantity-cart')
        $GAME_CART_QUANTITY.textContent = `Cantidad: ${game.quantity}`;

        $GAME_DETAILS_CONTAINER.appendChild($GAME_CART_QUANTITY);
        
        const $GAME_CART_DELETE = document.createElement('button')
        $GAME_CART_DELETE.type = 'button'
        $GAME_CART_DELETE.classList.add('game__delete')
        $GAME_CART_DELETE.textContent = `Eliminar`;
        $GAME_CART_DELETE.addEventListener('click', () => deleteProduct(game.id))

        $GAME_DETAILS_CONTAINER.appendChild($GAME_CART_DELETE);
      }

      if(section === SECTIONS.featured){
        //JUEGO DESCRIPCION
        const $GAME_DESCRIPTION = document.createElement('p');
        $GAME_DESCRIPTION.classList.add('game__description');
        $GAME_DESCRIPTION.textContent = game.description;

        //JUEGO DESCRIPCION BOTON
        const $GAME_DESCRIPTION_BUTTON = document.createElement('button');
        $GAME_DESCRIPTION_BUTTON.type = 'button'
        $GAME_DESCRIPTION_BUTTON.classList.add('game__description-button')
        $GAME_DESCRIPTION_BUTTON.textContent = 'Ver descripción'
        
        $GAME_DESCRIPTION_BUTTON.addEventListener('click', function(){
          if( $GAME_DETAILS_CONTAINER.classList.contains('game__description--open-description')){
            $GAME_DETAILS_CONTAINER.classList.remove('game__description--open-description')
            $GAME_DESCRIPTION_BUTTON.textContent = 'Ver descripción'
          } else {
            $GAME_DETAILS_CONTAINER.classList.add('game__description--open-description')
            $GAME_DESCRIPTION_BUTTON.textContent = 'Ocultar descripción'
          }
        })

        //JUEGO LINK BOTON
        /* 
        const $GAME_LINK = document.createElement('a');
        $GAME_LINK.href = 'game-details.html';
        $GAME_LINK.classList.add('game__link-details')
        $GAME_LINK.textContent = 'Ver detalle'; 
        */

        //JUEGO BOTON AGREGAR AL CARRO
        const $GAME_ADD_TO_CART = document.createElement('button');
        $GAME_ADD_TO_CART.type = 'button'
        $GAME_ADD_TO_CART.addEventListener('click', () => addToCart(game))
        $GAME_ADD_TO_CART.classList.add('btn', 'btn-outline-secondary', 'd-block')
        $GAME_ADD_TO_CART.textContent = 'Agregar al carrito';
        
        $GAME.appendChild($GAME_IMG);
        $GAME_DETAILS_CONTAINER.appendChild($GAME_NAME);
        $GAME_DETAILS_CONTAINER.appendChild($GAME_DESCRIPTION);
        $GAME_DETAILS_CONTAINER.appendChild($GAME_DESCRIPTION_BUTTON);
        $GAME_DETAILS_CONTAINER.appendChild($GAME_PLATFORM);
        $GAME_DETAILS_CONTAINER.appendChild($GAME_PRICE);
        // $GAME_DETAILS_CONTAINER.appendChild($GAME_LINK);
        $GAME_DETAILS_CONTAINER.appendChild($GAME_ADD_TO_CART);

        $GAME.appendChild($GAME_DETAILS_CONTAINER);
      }

      container.appendChild($GAME);

    });
  }

  
  /* ----------- CARRO ----------- */
  const $CART_NOTIFICATION = document.getElementById('cartNotification')
  const toastInstance = bootstrap.Toast.getOrCreateInstance($CART_NOTIFICATION)
  

  if(cartGames.length === 0){
    const $MESSAGE_CONTAINER = document.createElement('div');
    $MESSAGE_CONTAINER.classList.add('message')
    const $MESSAGE = document.createElement('p')
    $MESSAGE.textContent = 'No hay productos en el carro 😞'
    $MESSAGE_CONTAINER.appendChild($MESSAGE)
    $CART_CONTAINER.appendChild($MESSAGE_CONTAINER)
  }
  
  function deleteProduct(gameId){
    cartGames = cartGames.filter( game => game.id !== gameId)
    
    $CART_CONTAINER.innerHTML = '';
    displayGames(cartGames, $CART_CONTAINER, SECTIONS.cart)
    $CART_LENGHT.textContent = cartGames.length;
    
    if(cartGames.length > 0){
      const total = calculateTotal(cartGames);
      $CART_TOTAL.textContent = `💰 Subtotal compra $${total.toLocaleString('es-CL')}`
      $CART_CONTAINER.appendChild($CART_TOTAL)
    } else {
      const $MESSAGE_CONTAINER = document.createElement('div');
      $MESSAGE_CONTAINER.classList.add('message')
      const $MESSAGE = document.createElement('p')
      $MESSAGE.textContent = 'Has eliminado todos los productos del carro 😱'
      $MESSAGE_CONTAINER.appendChild($MESSAGE)
      $CART_CONTAINER.appendChild($MESSAGE_CONTAINER)
    }
    
  }
  function calculateTotal(games){
    return games.reduce( (accu, item) => accu + (item.price * item.quantity), 0)
  }

  const $CART_TOTAL = document.createElement('div')
  $CART_TOTAL.classList.add('cart__total')

  function addToCart(product){
    const checkGame = cartGames.some( game => game.id === product.id)
    if(checkGame) {
      const cartProduct = cartGames.find(game => game.id === product.id);
      cartProduct.quantity += 1;
    } else {
      cartGames.push(product)

      const $NOTIFICATION_TEXT = document.getElementById('textNotification');
      $NOTIFICATION_TEXT.textContent = `${product.name.toUpperCase()} se ha agregado al carro 🤩`;
      toastInstance.show()
    }

    const total = calculateTotal(cartGames);
    
    $CART_CONTAINER.innerHTML = '';
    displayGames(cartGames, $CART_CONTAINER, SECTIONS.cart)
    $CART_LENGHT.textContent = cartGames.length;

    $CART_TOTAL.textContent = `💰 Subtotal compra $${total.toLocaleString('es-CL')}`
    $CART_CONTAINER.appendChild($CART_TOTAL)

  }

  /* ----------- BUSCADOR ----------- */
  
  const $SEARCH_MODAL = new bootstrap.Modal(document.getElementById('searchModal'), {
    keyboard: false,
    backdrop: 'static'
  }) 
  document.getElementById('searchModal').addEventListener('hidden.bs.modal', () => {
    searchGames = [];
    $SEARCH_INPUT.value = '';
    $SEARCH_CONTAINER.innerHTML = '';
  })
  
  const $SEARCH_INPUT = document.getElementById('searchInput')

  const $SEARCH_FORM = document.forms.searchForm;
  $SEARCH_FORM.addEventListener('submit', function(event){
    event.preventDefault();
    searhGames(games, $SEARCH_INPUT.value )

    $SEARCH_MODAL.show();
  })

  function searhGames(seearchArray, gameToSearch){
    searchGames = seearchArray.filter(game => game.name.includes(gameToSearch)) ;
    if(searchGames.length === 0) {
      const $MESSAGE_CONTAINER = document.createElement('div');
      $MESSAGE_CONTAINER.classList.add('message')
      const $MESSAGE = document.createElement('p')
      $MESSAGE.textContent = `No hemos encontrado el juego ${gameToSearch} que estás buscando 😞`
      $MESSAGE_CONTAINER.appendChild($MESSAGE)
      $SEARCH_CONTAINER.appendChild($MESSAGE_CONTAINER)
    } else{
       displayGames(searchGames, $SEARCH_CONTAINER, SECTIONS.search);
    }
  }

});