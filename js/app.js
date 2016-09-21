var app = angular.module("miAplicacion", ["ngRoute", "ui.bootstrap", "ngAnimate", "ngTouch"]); /* Se inyecta ng-route, ui-bootstrap y ng-animate y ng-touch que son necesarios para UIB */
	
	/*Rutas */
	app.config(["$routeProvider",function($routes) {
		$routes.
		when("/cartelera", {
			templateUrl: "vistas/cartelera.html",
			controller: "carteleraController"
		}).
		when("/cartelera/titulo", {
			templateUrl: "vistas/inicio.html" ,
			controller: "mainController"
		}).
			when("/cartelera/genero", {
			templateUrl: "vistas/genero.html",
			controller: "generoController"
		}).
		otherwise({redirectTo: "/cartelera"});

	}]);


app.controller("mainController", function($scope, $http){

//  Hace una llamada TMDB por el titulo de pelicula que el usuario haya ingresado 
$scope.buscarPeliculas = function (){
	$http({
			method: "GET",
		  	url: "http://api.themoviedb.org/3/search/movie?api_key=4584ae721cb020ce65a4bd25368ec31e&query=" + $scope.buscar
		}).then(function successCallback(response) {
			//En caso de exito
			return $scope.peliculas = response.data;

		}, function errorCallback(response) {
			//En caso de error
			alert("Se ha producido un error");
		});

}
$scope.ampliarFicha = function() {
	$scope.peliculaConcreta = this.y
	}

	$scope.propertyName = "title";
	$scope.reverse = true;

	$scope.sortBy = function(propertyName) {
    	$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    	$scope.propertyName = propertyName;
    	//Alterna el ordenador, copiado de la documentación de Angular JS
  	};
});

app.controller("carteleraController", function($scope, $http){
	$scope.alCargar = function (){
		//La función se ejecuta al cargar la pagina
		$http({
			method: "GET",
			url: "http://api.themoviedb.org/3/discover/movie?api_key=4584ae721cb020ce65a4bd25368ec31e"
		}).then(function successCallback(response){
			return $scope.todasPeliculas = response.data;
		}, function errorCallback(response){
			alert("Se ha producido un error");
		});


	}
	$scope.cambiarPagina = function (){
		// Maneja la paginación, de forma que la pagina en laque se está es la que llama.
		$http({
			method: "GET",
			url: "http://api.themoviedb.org/3/discover/movie?api_key=4584ae721cb020ce65a4bd25368ec31e&page="+ $scope.bigCurrentPage
		}).then(function successCallback(response){
			return $scope.todasPeliculas = response.data;
		}, function errorCallback(response){
			alert("Se ha producido un error");
		});


	}

	
	//LImita el numero de paginas vistas a la vez a 5, el numero total a 1000 y la pagina inicial en 1.
	$scope.maxSize = 5;
	$scope.bigTotalItems = 10000;
  	$scope.bigCurrentPage = 1;

});

app.controller("generoController", function ($scope, $rootScope, $http){
	$scope.buscarPorGenero = function(){
		$http({
			method: "GET",
			url: "http://api.themoviedb.org/3/discover/movie?api_key=4584ae721cb020ce65a4bd25368ec31e&with_genres=" + $scope.generosSeleccionados
		}).then(function successCallback(response){
			return $scope.peliculasPorGenero = response.data;
		}, function errorCallback(response){
			alert("Se ha producido un error");
		});

	}

	$scope.propertyName = "title";
	$scope.reverse = true;
	
	$scope.sortBy = function(propertyName) {
    	$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    	$scope.propertyName = propertyName;
  	};


//Array de todos los generos con sus respectivas IDs
	$scope.generos = [ 
		{"id":28,"name":"Acción", checked: false},
		{"id":12,"name":"Adventura", checked: false},
		{"id":16,"name":"Animacion", checked: false},
		{"id":35,"name":"Comedia", checked: false},
		{"id":80,"name":"Crimen", checked: false},
		{"id":99,"name":"Documental", checked: false},
		{"id":18,"name":"Drama", checked: false},
		{"id":10751,"name":"Familia", checked: false},
		{"id":14,"name":"Fantasia", checked: false},
		{"id":10769,"name":"Extranjera", checked: false},
		{"id":36,"name":"Historia", checked: false},
		{"id":27,"name":"Terror", checked: false},
		{"id":10402,"name":"Musica", checked: false},
		{"id":9648,"name":"Misterio", checked: false},
		{"id":10749,"name":"Romance", checked: false},
		{"id":878,"name":"Ciencia Ficción", checked: false},
		{"id":10770,"name":"Pelicula de TV", checked: false},
		{"id":53,"name":"Suspense", checked: false},
		{"id":10752,"name":"Guerra", checked: false},
		{"id":37,"name":"Oeste", checked: false}
	]
/* Sacado de http://plnkr.co/edit/lEvZ2U2HNROYu8Nrk9EE?p=preview */
/* Va sumando a generosSeleccionados las opciones del usuario*/
	$scope.genSelec = function () {
		$scope.generosSeleccionados = "";
		for (i = 0; i < $scope.generos.length; i++) {
			if ($scope.generos[i].checked === true) {
				if ($scope.generosSeleccionados=== "") {
					$scope.generosSeleccionados = $scope.generos[i].id;
				} else {
					$scope.generosSeleccionados = $scope.generosSeleccionados + ", " + $scope.generos[i].id;
				}
			}
		}
	}





}); 
//Directiva para la barra de navegación
app.directive('barraNavegacion', function() {
    return {
        restrict : 'E',
        templateUrl : "barraNavegacion.html",
        controller: "directiveController"
    }
});
//Cambia la opacidad del jumbotron cuando se pasa el raton por encima
app.controller("directiveController", function () {
	angular.element("#myNavbar > ul > li").on("mouseover", function () {
		angular.element(this).addClass("resaltado");
	});
	angular.element("#myNavbar > ul > li").on("mouseleave", function () {
		angular.element(this).removeClass("resaltado");
	});  
})
//Aumenta el tamaño de la letra y la pone en negrita al poner el raton por encima
angular.element(".jumbotron").on("mouseover", function (){
	angular.element(this).addClass("opaco");
	});

angular.element(".jumbotron").on("mouseleave", function(){
	angular.element(this).removeClass("opaco");
});

