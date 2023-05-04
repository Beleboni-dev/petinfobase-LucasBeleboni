export function showToast(type) {
    var toast = document.getElementById(type + "-toast");
    toast.classList.remove("hide");
    setTimeout(function() {
      toast.classList.add("hide");
    }, 1500);
  }