$(document).ready(function () {
    //Khi người dùng cuộn chuột thì gọi hàm scrollFunction
    window.onscroll = function () {
      scrollFunction();
    };
    // khai báo hàm scrollFunction
    function scrollFunction() {
      // Kiểm tra vị trí hiện tại của con trỏ so với nội dung trang
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        //nếu lớn hơn 20px thì hiện button
        document.getElementById("btnRoll").style.display = "flex";
      } else {
        //nếu nhỏ hơn 20px thì ẩn button
        document.getElementById("btnRoll").style.display = "none";
      }
    }
    //gán sự kiện click cho button
    document.getElementById("btnRoll").addEventListener("click", function () {
      //Nếu button được click thì nhảy về đầu trang
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
    
  });

  $('input.input-qty').each(function() 
  {
    var $this = $(this),
      qty = $this.parent().find('.is-form'),
      min = Number($this.attr('min')),
      max = Number($this.attr('max'))
    if (min == 0) {
      var d = 0
    } else d = min
    $(qty).on('click', function() {
      if ($(this).hasClass('minus')) {
        if (d > min) d += -1
      } else if ($(this).hasClass('plus')) {
        var x = Number($this.val()) + 1
        if (x <= max) d += 1
      }
      $this.attr('value', d).val(d)
    })
  })
  
  
  
  function openCity(evt, cityName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("pro_tab");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

 