document.addEventListener('DOMContentLoaded', function(){

  const JSON_URL = './assets/data/products.json';

  let games = [];
  let favoriteGames = [];
  let bestSellerGames = [];
  let featuredGames = [];

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

      // featuredGames = games.filter(product => product.tag === 'featured');
      // displayFeaturedGames(featuredGames, $FEATURED_CONTAINER);
     
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

      const $PRODUCT_PRICE = document.createElement('span');
      $PRODUCT_PRICE.textContent = '$' + game.price.toLocaleString();
      $PRODUCT_PRICE.classList.add('best-seller__price');
      
      $GAME_DETAILS_CONTAINER.appendChild($GAME_NAME);
      $GAME_DETAILS_CONTAINER.appendChild($GAME_PLATFORM);
      $GAME_DETAILS_CONTAINER.appendChild($PRODUCT_PRICE);

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







});