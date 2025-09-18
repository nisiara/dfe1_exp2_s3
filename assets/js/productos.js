document.addEventListener('DOMContentLoaded', function(){

  const JSON_URL = './assets/data/products.json';

  let games = [];
  let bestSellerGames = [];
  let featuredGames = [];
  let searchGames = [];

  async function fetchGames(url) {
    try {
      const response = await fetch(url);
      if(!response.ok) throw new Error ('Hubo un error en la carga del catálogo de juegos')
      
      games = await response.json();

      bestSellerGames = games.filter(game => game.tag === 'best seller');
      displayGames(bestSellerGames, $BEST_SELLER_CONTAINER, SECTIONS.bestSeller);

      featuredGames = games.filter(product => product.tag === 'featured');
      displayGames(featuredGames, $FEATURED_CONTAINER, SECTIONS.featured);
     
    } catch (error) {
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

  function displayGames(games, container, section) {
    games.forEach(game => {
      const $GAME_ITEM = document.createElement('article');

      //JUEGO
      if(section === SECTIONS.bestSeller){
        $GAME_ITEM.classList.add('game', 'col-md-6', 'col-lg-4');
      }
      if(section === SECTIONS.search){
        $GAME_ITEM.classList.add('game');
      }
      if(section === SECTIONS.featured){
        $GAME_ITEM.classList.add('game', 'col-sm-6', 'col-md-4', 'col-lg-3');
      }

      //JUEGO IMAGEN
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

      //JUEGO NOMBRE
      const $GAME_NAME = document.createElement('span');
      $GAME_NAME.textContent = game.name;
      $GAME_NAME.classList.add('game__name');
      
      //JUEGO PLATAFORMA
      const $GAME_PLATFORM = document.createElement('span');
      $GAME_PLATFORM.textContent = game.platform;
      $GAME_PLATFORM.classList.add('game__platform');

       // JUEGO PRECIO
      const $GAME_PRICE = document.createElement('span');
      $GAME_PRICE.textContent = '$' + game.price.toLocaleString();
      $GAME_PRICE.classList.add('game__price');
      
      //JUEGO CONTENEDOR DETALLES
      const $GAME_DETAILS_CONTAINER = document.createElement('div');
      $GAME_DETAILS_CONTAINER.classList.add('game__details')

      //JUEGO CONTENDOR LINK
      if(section === SECTIONS.bestSeller || section === SECTIONS.search){
        const $GAME_LINK_CONTAINER = document.createElement('a');
        $GAME_LINK_CONTAINER.classList.add('game__link-container')
        $GAME_LINK_CONTAINER.href = 'game-details.html';

        $GAME_LINK_CONTAINER.appendChild($GAME_IMG);
        $GAME_LINK_CONTAINER.appendChild($GAME_DETAILS_CONTAINER);
      
        $GAME_ITEM.appendChild($GAME_LINK_CONTAINER);

        $GAME_DETAILS_CONTAINER.appendChild($GAME_NAME);
        $GAME_DETAILS_CONTAINER.appendChild($GAME_PLATFORM);
        $GAME_DETAILS_CONTAINER.appendChild($GAME_PRICE);
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
        const $GAME_LINK = document.createElement('a');
        $GAME_LINK.href = 'game-details.html';
        $GAME_LINK.classList.add('btn', 'btn-outline-secondary', 'd-block')
        $GAME_LINK.textContent = 'Ver detalle';
        
        $GAME_ITEM.appendChild($GAME_IMG);
        $GAME_DETAILS_CONTAINER.appendChild($GAME_NAME);
        $GAME_DETAILS_CONTAINER.appendChild($GAME_DESCRIPTION);
        $GAME_DETAILS_CONTAINER.appendChild($GAME_DESCRIPTION_BUTTON);
        $GAME_DETAILS_CONTAINER.appendChild($GAME_PLATFORM);
        $GAME_DETAILS_CONTAINER.appendChild($GAME_PRICE);
        $GAME_DETAILS_CONTAINER.appendChild($GAME_LINK);

        $GAME_ITEM.appendChild($GAME_DETAILS_CONTAINER);
      }

      container.appendChild($GAME_ITEM);

    });
  }

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
  
  function searhGames(gamesArray, gameToSearch){
    searchGames = gamesArray.filter(game => game.name.includes(gameToSearch)) ;
    if(searchGames.length === 0) {
      const $MESSAGE_CONTAINER = document.createElement('div');
      $MESSAGE_CONTAINER.classList.add('message')
      const $MESSAGE = document.createElement('p')
      $MESSAGE.textContent = 'No hemos encontrado el juego que estás buscando 😞'
      $MESSAGE_CONTAINER.appendChild($MESSAGE)
      $SEARCH_CONTAINER.appendChild($MESSAGE_CONTAINER)

      
    } else{
       displayGames(searchGames, $SEARCH_CONTAINER, SECTIONS.search);

    }
  }

  




});