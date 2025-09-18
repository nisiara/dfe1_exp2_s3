document.addEventListener('DOMContentLoaded', function(){

  const JSON_URL = './assets/data/products.json';

  let games = [];
  let favoriteGames = [];
  let bestSellerGames = [];
  let featuredGames = [];
  let searchGames = [];

  async function fetchGames(url) {
    try {
      const response = await fetch(url);
      if(!response.ok) throw new Error ('Hubo un error en la carga del catálogo de juegos')
      
      games = await response.json();
      console.log('games', games)
        
      // favoriteGames = games.filter(product => product.tag === 'favorito');
      // displayFavoriteGames(favoriteGames, $FAVORITE_CONTAINER);

      bestSellerGames = games.filter(game => game.tag === 'best seller');
      displayBestSellerGames(bestSellerGames, $BEST_SELLER_CONTAINER);

      featuredGames = games.filter(product => product.tag === 'featured');
      displayFeaturedGames(featuredGames, $FEATURED_CONTAINER);
     
    } catch (error) {
      console.error(error.message);
    }
  }

  fetchGames(JSON_URL);


  const $FAVORITE_CONTAINER = document.getElementById('favoriteGamesContainer');
  
  
  
  const $BEST_SELLER_CONTAINER = document.getElementById('bestSellerGamesContainer');
  
  function displayBestSellerGames(games, container) {
    games.forEach(game => {
      const $GAME_ITEM = document.createElement('li');
      $GAME_ITEM.classList.add('best-seller__game', 'col-md-6', 'col-lg-4');
      
      const $GAME_LINK_CONTAINER = document.createElement('a');
      $GAME_LINK_CONTAINER.href = 'game-details.html';

      const $GAME_DETAILS_CONTAINER = document.createElement('div');
      $GAME_DETAILS_CONTAINER.classList.add('best-seller__details')
      
      const $GAME_NAME = document.createElement('span');
      $GAME_NAME.textContent = game.name;
      $GAME_NAME.classList.add('best-seller__name');
      
      const $GAME_PLATFORM = document.createElement('span');
      $GAME_PLATFORM.textContent = game.platform;
      $GAME_PLATFORM.classList.add('best-seller__platform');

      const $GAME_PRICE = document.createElement('span');
      $GAME_PRICE.textContent = '$' + game.price.toLocaleString();
      $GAME_PRICE.classList.add('best-seller__price');
      
      $GAME_DETAILS_CONTAINER.appendChild($GAME_NAME);
      $GAME_DETAILS_CONTAINER.appendChild($GAME_PLATFORM);
      $GAME_DETAILS_CONTAINER.appendChild($GAME_PRICE);

      const $GAME_IMG = document.createElement('img');
      $GAME_IMG.src = game.image;
      $GAME_IMG.alt = game.name;
      $GAME_IMG.classList.add('best-seller__image');
      $GAME_IMG.width = 100;
      $GAME_IMG.height = 100;

      $GAME_LINK_CONTAINER.appendChild($GAME_IMG);
      $GAME_LINK_CONTAINER.appendChild($GAME_DETAILS_CONTAINER);
      
      $GAME_ITEM.appendChild($GAME_LINK_CONTAINER);
     
      container.appendChild($GAME_ITEM);

    });
  }
  
  
  const $FEATURED_CONTAINER = document.getElementById('featuredGamesContainer');

  function displayFeaturedGames(featuredGames, container){
    featuredGames.forEach( featuredGame => {

      const $GAME_ITEM__COLUMN = document.createElement('div');
      $GAME_ITEM__COLUMN.classList.add('col-sm-6', 'col-md-4', 'col-lg-3');

      const $GAME_CARD = document.createElement('article');
      $GAME_CARD.classList.add('card', 'featured__game');

      const $GAME_IMG = document.createElement('img');
      $GAME_IMG.src = featuredGame.image;
      $GAME_IMG.alt = featuredGame.title;
      $GAME_IMG.classList.add('card-img-top');
      $GAME_IMG.width = 280;
      $GAME_IMG.height = 280;

      $GAME_CARD.appendChild($GAME_IMG);

      const $GAME_DETAILS_CONTAINER = document.createElement('div');
      $GAME_DETAILS_CONTAINER.classList.add('card-body')

      const $GAME_NAME = document.createElement('h5');
      $GAME_NAME.classList.add('featured__name');
      $GAME_NAME.textContent = featuredGame.name;

      const $GAME_DESCRIPTION_BUTTON = document.createElement('button');
      $GAME_DESCRIPTION_BUTTON.type = 'button'
      $GAME_DESCRIPTION_BUTTON.classList.add('featured__description-button')
      $GAME_DESCRIPTION_BUTTON.textContent = 'Ver descripción'
      $GAME_DESCRIPTION_BUTTON.addEventListener('click', function(){
       
        if( $GAME_DETAILS_CONTAINER.classList.contains('card-body--open-description')){
          $GAME_DETAILS_CONTAINER.classList.remove('card-body--open-description')
          $GAME_DESCRIPTION_BUTTON.textContent = 'Ver descripción'
        } else {
          $GAME_DETAILS_CONTAINER.classList.add('card-body--open-description')
          $GAME_DESCRIPTION_BUTTON.textContent = 'Ocultar descripción'
        }

      })

      const $GAME_PLATFORM = document.createElement('span');
      $GAME_PLATFORM.textContent = featuredGame.platform;
      $GAME_PLATFORM.classList.add('featured__platform');

      const $GAME_PRICE = document.createElement('span');
      $GAME_PRICE.textContent = '$' + featuredGame.price.toLocaleString();
      $GAME_PRICE.classList.add('featured__price');

      const $GAME_DESCRIPTION = document.createElement('p');
      $GAME_DESCRIPTION.classList.add('featured__description');
      $GAME_DESCRIPTION.textContent = featuredGame.description;

      const $GAME_LINK = document.createElement('a');
      $GAME_LINK.href = 'game-details.html';
      $GAME_LINK.classList.add('btn', 'btn-outline-secondary', 'd-block')
      $GAME_LINK.textContent = 'Ver detalle';

      $GAME_DETAILS_CONTAINER.appendChild($GAME_NAME);
      $GAME_DETAILS_CONTAINER.appendChild($GAME_DESCRIPTION);
      $GAME_DETAILS_CONTAINER.appendChild($GAME_DESCRIPTION_BUTTON);
      $GAME_DETAILS_CONTAINER.appendChild($GAME_PLATFORM);
      $GAME_DETAILS_CONTAINER.appendChild($GAME_PRICE);
      $GAME_DETAILS_CONTAINER.appendChild($GAME_LINK);

      $GAME_CARD.appendChild($GAME_DETAILS_CONTAINER);
      $GAME_ITEM__COLUMN.appendChild($GAME_CARD);
      container.appendChild($GAME_ITEM__COLUMN);
    })
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
  

  const $SEARCH_CONTAINER = document.getElementById('searchGamesContainer');

  function searhGames(gamesArray, gameToSearch){
    searchGames = gamesArray.filter(game => game.name.includes(gameToSearch)) ;
    if(searchGames.length === 0) {
      
    } else{
       displayBestSellerGames(searchGames, $SEARCH_CONTAINER);

    }
  }

  




});