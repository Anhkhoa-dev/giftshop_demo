// code angular js
var app = angular.module("myApp", ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when("/",{
        templateUrl:"home.html"
    })
    .when("/Products",{
        templateUrl:"product_category.html"
    })
    .when("/Products/ProductDetail",{
        templateUrl:"product_detail.html"
    })
    .when("/Products/Checkout",{
      templateUrl:"checkout.html"
  })
    .when("/Sales",{
        templateUrl:"sale.html"
    })
    .when("/News",{
        templateUrl:"page.html"
    })
    .when("/Abouts",{
        templateUrl:"abouts.html"
    })
    .when("/Contact",{
        templateUrl:"about.html"
    });
});
//Businessgifts
//Personalitems
//Homedecor
//Accessory
//Stuffet
//Wasrose
app.run(function($rootScope, $http){
    $http.get("data.json").then(function(rsp){
        $rootScope.listProduct = rsp.data.products; // lấy danh sách product
        $rootScope.listCategory = rsp.data.ListCategorys;
        $rootScope.images = rsp.data.banner;
        $rootScope.max = $rootScope.listProduct.length;
    })
        $rootScope.ListPro_20 = [];
        $rootScope.listPro = []
        $rootScope.stemp = [];
        $rootScope.listCate_Wasrose = [];
        $rootScope.listCate_Stuffet = [];
        $rootScope.listCate_Accessory = [];
        $rootScope.listCate_Homedecor = [];
        $rootScope.listCate_Personalitems = [];
        $rootScope.listCate_Businessgifts = [];
        
        //sắp xếp danh sách theo số lượt mua cao nhất đến thấp nhất
        for(var i=0; i< $rootScope.max; i++){
          for(var j =i+1; j<$rootScope.listProduct.length; j++){
              if($rootScope.listProduct[i].q_pur < $rootScope.listProduct[j].q_pur){
                 $rootScope.stemp = $rootScope.listProduct[i];
                 $rootScope.listProduct[i] = $rootScope.listProduct[j];
                 $rootScope.listProduct[j] = $rootScope.stemp;
              }
          }
          $rootScope.listPro.push($rootScope.listProduct[i]);
        }
        // lấy danh sách top 20 sản phầm có lượt mua cao nhất
        for(var i=0; i<20; i++){
          $rootScope.ListPro_20.push($rootScope.listPro[i]);
        }
        
        // Hàm lấy danh sánh hoa hồng sáp
        $rootScope.count_waxrose = 0;
        for(var i=0; i< $rootScope.max; i++){
          if($rootScope.listProduct[i].category == "Wasrose"){
            $rootScope.listCate_Wasrose.push($rootScope.listProduct[i]);
            $rootScope.count_waxrose++;
          }
        }
        // Hàm lấy danh sánh gấu bông (Stuffet)
        $rootScope.count_Stuffet = 0;
        for(var i=0; i< $rootScope.max; i++){
          if($rootScope.listProduct[i].category == "Stuffet"){
            $rootScope.listCate_Stuffet.push($rootScope.listProduct[i]);
            $rootScope.count_Stuffet++;
          }
        }
        // Hàm lấy danh sánh Accessory
        $rootScope.count_Accessory = 0;
        for(var i=0; i< $rootScope.max; i++){
          if($rootScope.listProduct[i].category == "Accessory"){
            $rootScope.listCate_Accessory.push($rootScope.listProduct[i]);
            $rootScope.count_Accessory++;
          }
        }
        // Hàm lấy danh sánh Homedecor
        $rootScope.count_Homedecor = 0;
        for(var i=0; i< $rootScope.max; i++){
          if($rootScope.listProduct[i].category == "Homedecor"){
            $rootScope.listCate_Homedecor.push($rootScope.listProduct[i]);
            $rootScope.count_Homedecor++;
          }
        }
        // Hàm lấy danh sánh Personalitems
        $rootScope.count_Personal = 0;
        for(var i=0; i< $rootScope.max; i++){
          if($rootScope.listProduct[i].category == "Personalitems"){
            $rootScope.listCate_Personalitems.push($rootScope.listProduct[i]);
            $rootScope.count_Personal++;
          }
        }
        // Hàm lấy danh sánh Personalitems
        $rootScope.count_Business = 0;
        for(var i=0; i< $rootScope.max; i++){
          if($rootScope.listProduct[i].category == "Businessgifts"){
            $rootScope.listCate_Businessgifts.push($rootScope.listProduct[i]);
            $rootScope.count_Business++;
          }
        }
    $rootScope.myCart = [];
    $rootScope.Subtotal = 0;
    $rootScope.countCart = 0;
    $rootScope.addtoCartBtn = function(){
      if($rootScope.myCart.length > 0 && $rootScope.myCart.length < 2){
        $(".modal-footer").append("<a href='#!Products/Checkout' class='btn btn-primary'>Check out</a>")
      }
    }
    $rootScope.AddCart = function(product){
      if($rootScope.myCart.length === 0 ){
         product.countItems = 1;  
         $rootScope.myCart.push(product);
         $rootScope.addtoCartBtn();
         $rootScope.countCart ++;
      }else{
        var repeat = false;
         for(var i=0; i < $rootScope.myCart.length; i++){
           if($rootScope.myCart[i].id == product.id)
           {
             repeat = true;
             $rootScope.myCart[i].countItems+=1;
             $rootScope.countCart ++;
           }
         }
         if(!repeat){
           product.countItems = 1;
           $rootScope.myCart.push(product);
           $rootScope.countCart ++;
         }  
      }  
      $rootScope.Subtotal += parseFloat(product.price_new);                
   }
   $rootScope.removeItemCart = function(product){
    if(product.countItems > 1){
      product.countItems -=1;
      $rootScope.countCart -=1;
    }else if(product.countItems === 1){
      var index = $rootScope.myCart.indexOf(product);
      $rootScope.myCart.splice(index, 1);
      $rootScope.countCart -=1;
    }
    $rootScope.Subtotal -= parseFloat(product.price_new);  
  }
  // addt compairision
  $rootScope.compareProduct = [];
  $rootScope.countItems1 = 0;
  $rootScope.addToCompare = function (product, index) {
    console.log(product.id)
    // var check = $rootScope.compareProduct.some(obj => {
    //     return obj.id === product.id
    // });
    if($rootScope.compareProduct.length < 3 )
    {
        for(var i in $rootScope.listProduct){
            if($rootScope.listProduct[i].id === product.id){
              $rootScope.compareProduct.push($rootScope.listProduct[i]);
              $rootScope.countItems1++
            }
        }
    }else{
      console.log('Sản phẩm  cần so sánh lớn hơn 3')
    }
    console.log($rootScope.compareProduct);
    $(".compare-modal").addClass("d-block")
    $rootScope.ableToCompare = $rootScope.countItems1 > 1 ? false : true
}
$rootScope.removeFromCompare = function(index) {
  $rootScope.compareProduct.splice(index, 1)
  if($rootScope.compareProduct.length == 0)
  {
      $(".compare-modal").removeClass("d-block")
  }
  $rootScope.countItems--
  $rootScope.ableToCompare = $rootScope.countItems > 1 ? false : true
}

$rootScope.compare = function() {
  $(".detail-compare-modal").addClass("d-block")
}

$rootScope.closeCompare = function() {
  $(".detail-compare-modal").removeClass("d-block")
  $(".compare-modal").removeClass("d-block")
  $rootScope.compareProduct = [];
  $rootScope.countItems = 0;
}
});

app.controller("best__seller", function($scope){
  $('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1200:{
            items:5
        }
    }
})
});
app.controller("product_list", function($scope){

});
app.controller("checkout", function($scope){

});

app.directive('convertToNumber', function(){
  return{
    require: 'ngModel',
    link: function(scope, element, atrs, ngModel){
      ngModel.$parsers.push(function(val){
        return parseInt(val, 10);
      });
      ngModel.$formatters.push(function(val){
        return '' + val;
      });
    }
  }
})
app.controller("product_category", function($scope){
  $scope.begin = 1;
	$scope.pageSize = 12; // items per page
	$scope.pageCount = Math.ceil($scope.max / $scope.pageSize);
  $scope.view = $scope.pageSize;
  $scope.repaginate = function(){
      $scope.pageCount = Math.ceil($scope.max / $scope.pageSize);
      $scope.view = $scope.pageSize;
  }
  $scope.first_pro = function(){
    $scope.begin = 1;
    $scope.view = $scope.pageSize;
  }
  $scope.prev_pro = function(){
      if($scope.begin > 1){
        $scope.begin -= $scope.pageSize;
        if((($scope.begin) + $scope.pageSize-1) > $scope.max+1 ){
          $scope.view = $scope.max+1;
         }else{
          $scope.view = ($scope.begin-1) + $scope.pageSize;
         }
      }
  }
  $scope.next_pro = function(){
      if($scope.begin < $scope.max+1){
         $scope.begin += $scope.pageSize;
         if((($scope.begin) + $scope.pageSize-1) > $scope.max+1 ){
          $scope.view = $scope.max+1;
         }else{
          $scope.view = ($scope.begin) + $scope.pageSize-1;
         }  
      }
 
  }
  $scope.last_pro = function(){
    $scope.begin = ($scope.pageCount -1) * $scope.pageSize;
    $scope.view = $scope.max+1;
  }
})
app.controller("myCart", function($scope){
});
app.controller("myHeader", function($scope){
  
});

app.controller("product__detail", function($scope){
  $scope.res = '';
  $scope.urlID = window.location.href;
  $scope.res = $scope.urlID.slice(-6);
  $scope.pro_detail = [];
  for(var i in $scope.listProduct){ //tìm kiếm so sánh mã sản phẩm 
    if($scope.listProduct[i].id.toLocaleLowerCase().search($scope.res.toLocaleLowerCase())!=-1){
        $scope.pro_detail.push($scope.listProduct[i]);
    }                      
}

});

