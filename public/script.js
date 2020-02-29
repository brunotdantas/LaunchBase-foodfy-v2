const modalOverlay = document.querySelector(".modal-overlay");
const cards = document.querySelectorAll(".mais-acessadas__card");
const hide_receipts = document.querySelectorAll("#receita-esconder")

for (let card of cards) {
  card.addEventListener("click", function() {
    const receitaID = card.getAttribute("id");
    window.location.href = `/receita?id=${receitaID}`;   
  });
}

$(document).ready(function(){
  $("#hide-Ingredientes").click(function(){
    $("#receita-ingred").toggle(1000);
  });

  $("#hide-preparo").click(function(){
    $("#receita-prep").toggle(1000);
  });

  $("#hide-addInfo").click(function(){
    $("#receita-info").toggle(1000);
  });
});
